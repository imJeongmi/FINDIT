package a203.findit.model.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

public class UserPrincipal implements UserDetails {

    private final String userId;
    private final String password;
    private final UserRole role;
    private final Collection<GrantedAuthority> authorities;


    public UserPrincipal(String userId, String password, UserRole role, Collection<GrantedAuthority> authorities){
        this.userId = userId;
        this.password = password;
        this.role = role;
        this.authorities = authorities;
    }




    public static UserPrincipal create(User user){
        return new UserPrincipal(
                user.getUsername(),
                user.getPassword(),
                UserRole.ROLE_USER,
                Collections.singletonList(new SimpleGrantedAuthority(UserRole.ROLE_USER.getValue()))
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
