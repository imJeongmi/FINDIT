package a203.findit.service;

import java.util.Set;

public interface AuthService {
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
}
