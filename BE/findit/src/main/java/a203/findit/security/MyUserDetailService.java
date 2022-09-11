package a203.findit.security;

import a203.findit.model.entity.User;
import a203.findit.model.entity.UserPrincipal;
import a203.findit.model.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailService implements UserDetailsService {
    private static Logger LOGGER = LoggerFactory.getLogger(MyUserDetailService.class);

    private final UserRepository userRepository;

    public MyUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserPrincipal loadUserByUsername(String username) throws UsernameNotFoundException {
        final User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("User ID : " + username + " Not Found")
        );
        return UserPrincipal.create(user);
        /*
          Security Context 에 저장될 Authentication 객체를 설정해준다.
         */
//        return org.springframework.security.core.userdetails.User.builder()
//                .username(user.getId())
//                .password(user.getPassword())
////                    .roles(user.getRole().getValue())  // .role() 하면 ROLE_USER cannot start with ROLE_ (it is automatically added) 에러가 났었음
//                .authorities(user.getRole().getValue())
//                .accountExpired(false)
//                .accountLocked(false)
//                .disabled(false)
//                .credentialsExpired(false)
//                .build();
    }
}
