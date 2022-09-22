package a203.findit.service;

import a203.findit.model.dto.req.User.UpdateFormDTO;
import a203.findit.model.dto.res.Code;
import a203.findit.model.entity.Icon;
import a203.findit.model.entity.User;
import a203.findit.model.repository.IconRepository;
import a203.findit.model.repository.RefreshTokenRepository;
import a203.findit.security.JwtProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import a203.findit.exception.CustomException;
import a203.findit.model.dto.req.User.CreateUserDTO;
import a203.findit.model.dto.req.User.LoginUserDTO;
import a203.findit.model.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepos;
    private final RefreshTokenRepository refreshTokenRepos;
    private final IconRepository iconRepos;

    public Optional<User> findByUsername(String username){
        return userRepos.findByUsername(username);
    }

    public Optional<User> findByUserId(Long userId){
        return userRepos.findById(userId);
    }

    @Override
    public boolean createUser(CreateUserDTO createUserDTO) {
        String encPw = bCryptPasswordEncoder.encode(createUserDTO.getPw());

        if (userRepos.existsByUsername(createUserDTO.getId())) {
            return false;
        }

        userRepos.save(User.builder()
                .username(createUserDTO.getId())
                .password(encPw)
                .nickname(createUserDTO.getNickname())
                .build());

        return true;
    }


    @Override
    public Map<String, String> login(LoginUserDTO loginUserDTO) throws CustomException{
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginUserDTO.getId(),loginUserDTO.getPw());

        Authentication authentication = authenticationManager.authenticate(token);
        System.out.println(authentication.getName());
        Map<String, String> result = createToken(authentication.getName());

        return result;
    }

    @Override
    public boolean logout(HttpServletRequest req, String refreshToken) {

        refreshTokenRepos.deleteByValue(refreshToken);

        return true;
    }

    @Override
    public Map<String, String> userDetails(String userId) {
        Map<String, String> result = new HashMap<>();

        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User currUser = userRepos.findByUsername(principal.getUsername()).orElseThrow(
                ()->new CustomException(Code.C403)
        );

        result.put("nickname", currUser.getNickname());
        result.put("img", currUser.getIcon().getImageUrl());

        return result;
    }

    @Override
    public Map<String, Object> updateForm(UpdateFormDTO nickname) {
        Map<String, Object> result = new HashMap<>();

        List<Icon> icons = iconRepos.findAll();

        result.put("imgList", icons);

        return result;
    }

    @Override
    public boolean updateImg(Long userId, String img) {
        User user = userRepos.findById(userId).orElseThrow(
                () -> new CustomException(Code.C403)
        );

        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(!user.getUsername().equals(principal.getUsername())){
            throw new CustomException(Code.C404);
        }

        Icon icon = iconRepos.findByImageUrl(img).orElseThrow(
                ()->new CustomException(Code.C401)
        );

        user.setIcon(icon);
        userRepos.save(user);

        return true;
    }

    @Override
    public ResponseEntity updatePw(String username) {

        User user = userRepos.findByUsername(username).orElseThrow(
                ()->new CustomException(Code.C403)
        );



        return null;
    }

    @Override
    public boolean deleteUser(Long userId) {
        User user = userRepos.findById(userId).orElseThrow(
                () -> new CustomException(Code.C403)
        );

        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(!user.getUsername().equals(principal.getUsername())){
            throw new CustomException(Code.C404);
        }

        userRepos.deleteById(userId);
        return true;
    }

    @Override
    public ResponseEntity createTreasure() {
        return null;
    }

    @Override
    public ResponseEntity getTreasure() {
        return null;
    }

    private Map<String, String> createToken(String name) {
        Map<String, String> result = new HashMap<>();

        String accessToken = jwtProvider.generateAccessToken(name);
        String refreshToken = jwtProvider.generateRefreshToken(name);

        result.put("accessToken", accessToken);
        result.put("refreshToken", refreshToken);

        return result;
    }

}

