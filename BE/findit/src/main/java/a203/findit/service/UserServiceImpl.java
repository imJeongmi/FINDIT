package a203.findit.service;

import a203.findit.model.dto.req.User.UpdateFormDTO;
import a203.findit.model.dto.res.Code;
import a203.findit.model.entity.*;
import a203.findit.model.repository.*;
import a203.findit.security.JwtProvider;
import a203.findit.util.AwsService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import a203.findit.exception.CustomException;
import a203.findit.model.dto.req.User.CreateUserDTO;
import a203.findit.model.dto.req.User.LoginUserDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AwsService awsService;

    private final UserRepository userRepos;
    private final RefreshTokenRepository refreshTokenRepos;
    private final IconRepository iconRepos;
    private final TreasureRepository treasureRepos;
    private final GameRepository gameRepos;
    private final IGTRepository igtRepos;


    public Optional<User> findByUsername(String username){
        return userRepos.findByUsername(username);
    }

    public Optional<User> findByUserId(Long userId){
        return userRepos.findById(userId);
    }

    @Override
    public boolean createUser(CreateUserDTO createUserDTO) throws CustomException {
        String encPw = bCryptPasswordEncoder.encode(createUserDTO.getPw());

        if (userRepos.existsByUsername(createUserDTO.getId())) {
            throw new CustomException(Code.C402);
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
    public boolean updatePw(Long userId, String pw, String username) {
        User user = userRepos.findByUsername(username).orElseThrow(
                ()->new CustomException(Code.C403)
        );

        if(user.getId()!=userId){
            throw new CustomException(Code.C404);
        }

        user.setPassword(bCryptPasswordEncoder.encode(pw));
        userRepos.save(user);
        return true;
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
    @Transactional(rollbackOn = {Exception.class})
    public boolean createTreasure(String username, String treasureName, Long gameId, MultipartFile img) {
        User currUser = userRepos.findByUsername(username).orElseThrow(
                ()->new CustomException(Code.C403)
        );

        Game game = gameRepos.findById(gameId).orElseThrow(
                ()->new CustomException(Code.C402)
        );

        Treasure newTreasure = Treasure.builder().treasureName(treasureName).user(currUser).imageUrl(awsService.imageUpload(img)).isDefault(false).build();
        IGT igt = IGT.builder().game(game).treasure(newTreasure).build();

        treasureRepos.save(newTreasure);
        igtRepos.save(igt);

        return true;
    }

    @Override
    public List<String> getTreasure() {
        List<Treasure> treasureList = treasureRepos.findAll();
        List<String> treasures = treasureList.stream().map(x->x.getImageUrl()).collect(Collectors.toList());
        return treasures;
    }

    @Override
    public boolean selectTreasure(Long tid, String entercode) {
        Treasure treasure = treasureRepos.findById(tid).orElseThrow(
                ()->new CustomException(Code.C401)
        );

        Game game = gameRepos.findByEnterCode(entercode).orElseThrow(
                ()-> new CustomException(Code.C401)
        );


        igtRepos.save(IGT.builder().game(game).treasure(treasure).build());

        return true;
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

