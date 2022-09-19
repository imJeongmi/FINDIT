package a203.findit.service;


import a203.findit.model.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Set;

import a203.findit.exception.CustomException;

import a203.findit.model.dto.req.CreateUserDTO;
import a203.findit.model.dto.res.Code;
import a203.findit.model.entity.User;
import lombok.RequiredArgsConstructor;

import a203.findit.model.dto.req.User.CreateUserDTO;
import a203.findit.model.dto.req.User.LoginUserDTO;
import a203.findit.model.dto.req.User.UpdateFormDTO;
import a203.findit.model.dto.res.Code;
import a203.findit.model.entity.User;



import a203.findit.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepos;

    @Override
    public void setValue(String key, String data) {

    }

    @Override
    public String getStringValue(String key) {
        return null;
    }

    @Override
    public void setValue(String key, String[] data) {

    }

    @Override
    public Set<String> getSetValue(String key) {
        return null;
    }

    @Override
    public void setValue(String key, Object obj1, Object obj2) {

    }

    @Override
    public Object getHashValue(String key, String hash) {
        return null;
    }

    @Override
    public void setStringValueAndExpire(String key, String token, long expireDate) {

    }

    @Override
    public void deleteKey(String key) {

    }

    @Override
    public void deleteKey(String hashKey, String key) {

    }

    @Override
    public void setTokenBlackList(String token, String value, long expireTime) {

    }



    @Override
    public ResponseEntity createUser(CreateUserDTO createUserDTO) throws CustomException {
//        String encPw = bCryptPasswordEncoder.encode(createUserDTO.getPw());
//
//        if (userRepos.existsByUsername(createUserDTO.getId())) {
//            throw new CustomException(Code.C402);
//        }
//
//        userRepos.save(User.builder()
//                .username(createUserDTO.getId())
//                .password(encPw)
//                .nickname(createUserDTO.getId())
//                .build());
//
        return ResponseEntity.status(200).build();
    }

    @Override
    public ResponseEntity login(LoginUserDTO loginUserDTO) {
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

    ;


}

