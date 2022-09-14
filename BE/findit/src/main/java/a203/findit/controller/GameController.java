package a203.findit.controller;

import a203.findit.model.dto.res.ApiResponse;
import a203.findit.model.dto.res.Code;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/games")
public class GameController {

    @GetMapping("/test")
    public ApiResponse test(){
        ApiResponse result = new ApiResponse();
        result.setCode(200);
        result.setCodeMsg(Code.C200);
        result.setMessage("Success");
        return result;
    }
}
