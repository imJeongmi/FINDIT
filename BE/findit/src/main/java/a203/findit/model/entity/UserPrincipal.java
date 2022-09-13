package a203.findit.model.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

public class UserPrincipal implements UserDetails {

    private final String username;
    private final String password;
    private final UserRole role;
    private final Collection<GrantedAuthority> authorities;


    public UserPrincipal(String username, String password, UserRole role, Collection<GrantedAuthority> authorities){
        this.username = username;
        this.password = password;
        this.role = role;
        this.authorities = authorities;
    }




    public static UserPrincipal create(User user){
        return new UserPrincipal(
                user.getUsername(),
                user.getPassword(),
                user.getRole(),
                Collections.singletonList(new SimpleGrantedAuthority(UserRole.ROLE_USER.getValue()))
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
