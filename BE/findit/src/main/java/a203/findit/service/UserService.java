package a203.findit.service;
import a203.findit.model.repository.UserRepository;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.ValueOperations;

import java.util.Set;
import java.util.concurrent.TimeUnit;

public interface UserService {

    void setValue(String key, String data);
    String getStringValue(String key);
    void setValue(String key, String[] data);
    Set<String> getSetValue(String key);
    void setValue(String key, Object obj1, Object obj2);
    Object getHashValue(String key, String hash);
    void setStringValueAndExpire(String key, String token, long expireDate);
    void deleteKey(String key);
    void deleteKey(String hashKey, String key);
    void setTokenBlackList(String token, String value, long expireTime);
    
    ApiResponse createUser(CreateUserDTO createUserDTO);


}
