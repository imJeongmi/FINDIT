package a203.findit.service;

import java.util.Set;

public class AuthServiceImpl implements AuthService{
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
}
