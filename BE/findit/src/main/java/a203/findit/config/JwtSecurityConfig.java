package a203.findit.config;

import a203.findit.filter.JwtAuthFilter;
import a203.findit.security.JwtProvider;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * JwtSecurityConfig
 */
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private final JwtProvider jwtProvider;

    public JwtSecurityConfig(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    /**
     * Add JWTAuthFilter Before
     * @param builder
     * @throws Exception
     */
    @Override
    public void configure(HttpSecurity builder) throws Exception {
        JwtAuthFilter jwtFilter = new JwtAuthFilter(jwtProvider);
        builder.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
