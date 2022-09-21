package a203.findit.config;

import a203.findit.security.JwtProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtProvider jwtProvider;
    private final AuthenticationEntryPoint authenticationEntryPointHandler;
    private final AccessDeniedHandler webAccessDeniedHandler;


    private final String frontUrl;
    private static final String[] GET_PUBLIC_URI = {};
    private static final String[] POST_PUBLIC_URI = {
            "/users",
            "/users/login",
    };
    private static final String[] DELETE_PUBLIC_URI = {};


    public SecurityConfig(AuthenticationEntryPoint authenticationEntryPointHandler, AccessDeniedHandler webAccessDeniedHandler, JwtProvider jwtProvider, @Value("${frontEnd}") String frontUrl) {
        this.jwtProvider = jwtProvider;
        this.authenticationEntryPointHandler = authenticationEntryPointHandler;
        this.webAccessDeniedHandler = webAccessDeniedHandler;
        this.frontUrl = frontUrl;
    }


    /**
     * Spring 인증 과정 무시 URI
     *
     * @return Web Ignoring
     */
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                .antMatchers(HttpMethod.GET, GET_PUBLIC_URI)
                .antMatchers(HttpMethod.POST, POST_PUBLIC_URI)
                .antMatchers(HttpMethod.DELETE, DELETE_PUBLIC_URI)
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()  // Http basic Auth 기반으로 로그인 인증창이 뜸. disable 시에 인증창 뜨지 않음.
//                .cors().configurationSource(corsConfigurationSource())
                .cors().disable()
                .csrf().disable()
                .headers()
                .frameOptions().sameOrigin()
                .and()
                .authorizeRequests();  // rest api이므로 csrf 보안이 필요없으므로 disable처리.


        http
                .authorizeRequests()
                .antMatchers("/public/**").permitAll()
                .antMatchers("/games").hasAnyRole("GUEST","USER","ADMIN")
                .antMatchers("/users/**").permitAll()
                .antMatchers("/**").permitAll()
                .anyRequest().hasRole("GUEST");

        http
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);  // jwt token으로 인증하므로 stateless 하도록 처리.

        http
                .apply(new JwtSecurityConfig(jwtProvider));

        http
                .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPointHandler)
                .accessDeniedHandler(webAccessDeniedHandler);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("*");
//        configuration.addAllowedOrigin(frontUrl);
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}