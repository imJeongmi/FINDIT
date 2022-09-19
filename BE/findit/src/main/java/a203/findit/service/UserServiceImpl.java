package a203.findit.service;

import a203.findit.model.dto.res.Code;
import a203.findit.model.entity.User;
import a203.findit.security.JwtProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import a203.findit.exception.CustomException;
import a203.findit.model.dto.req.User.CreateUserDTO;
import a203.findit.model.dto.req.User.LoginUserDTO;
import a203.findit.model.dto.req.User.UpdateFormDTO;
import a203.findit.model.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepos;

    @Override
    public ResponseEntity createUser(CreateUserDTO createUserDTO) throws CustomException {
        String encPw = bCryptPasswordEncoder.encode(createUserDTO.getPw());

        if (userRepos.existsByUsername(createUserDTO.getId())) {
            throw new CustomException(Code.C402);
        }

        userRepos.save(User.builder()
                .username(createUserDTO.getId())
                .password(encPw)
                .nickname(createUserDTO.getId())
                .build());

        return ResponseEntity.status(200).build();
    }

    @Override
    public ResponseEntity login(LoginUserDTO loginUserDTO) throws CustomException{

        ResponseEntity response = new ResponseEntity();

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginUserDTO.getId(),loginUserDTO.getPw());

        Authentication authentication = authenticationManager.authenticate(token);

        User user = userRepos.findByUsername(authentication.getName()).orElseThrow(
                ()-> new CustomException(Code.C403)
        );

        Map<String, String> tokens = createToken(authentication.getName());




        return null;
    }

    @Override
    public ResponseEntity logout() {
        return null;
    }

    @Override
    public ResponseEntity userDetails(String userId) {
        return null;
    }

    @Override
    public ResponseEntity updateForm(UpdateFormDTO updateFormDTO) {
        return null;
    }

    @Override
    public ResponseEntity getImgList(MultipartFile img) {
        return null;
    }

    @Override
    public ResponseEntity updateUser() {
        return null;
    }

    @Override
    public ResponseEntity deleteUser() {
        return null;
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

