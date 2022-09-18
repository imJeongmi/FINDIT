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
import a203.findit.model.dto.res.ApiResponse;
import a203.findit.model.dto.res.Code;
import a203.findit.model.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{


    private final UserRepository userRepository;


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
    public ApiResponse createUser(CreateUserDTO createUserDTO){
        ApiResponse result = new ApiResponse();

        Optional<User> tempUser = userRepository.findByUsername(createUserDTO.getId());

        if(tempUser.isPresent()){
            throw new CustomException(Code.C500);
        }

        userRepository.save(User.builder()
                .username(createUserDTO.getId())
                .password(createUserDTO.getPw())
                .nickname(createUserDTO.getId())
                .build());

        return result;
    }

    @Override
    public ApiResponse login(LoginUserDTO loginUserDTO) {
        return null;
    }

    @Override
    public ApiResponse logout() {
        return null;
    }

    @Override
    public ApiResponse userDetails(String userId) {
        return null;
    }

    @Override
    public ApiResponse updateForm(UpdateFormDTO updateFormDTO) {
        return null;
    }

    @Override
    public ApiResponse getImgList(MultipartFile img) {
        return null;
    }

    @Override
    public ApiResponse updateUser() {
        return null;
    }

    @Override
    public ApiResponse deleteUser() {
        return null;
    }

    @Override
    public ApiResponse createTreasure() {
        return null;
    }

    @Override
    public ApiResponse getTreasure() {
        return null;
    }

    ;


}

