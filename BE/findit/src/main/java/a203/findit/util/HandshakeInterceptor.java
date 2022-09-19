package a203.findit.util;

import a203.findit.model.entity.User;
import a203.findit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import java.util.Map;

public class HandshakeInterceptor extends HttpSessionHandshakeInterceptor {
    @Autowired
    private UserService userService;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //attributes.put(UserConstant.HEADER_USER_KEY, userService.findBy(user.getId()));
        return super.beforeHandshake(request, response, wsHandler, attributes);
    }
}