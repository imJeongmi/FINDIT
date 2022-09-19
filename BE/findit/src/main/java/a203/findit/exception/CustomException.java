package a203.findit.exception;

import a203.findit.model.dto.res.Code;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomException extends RuntimeException{
    private final Code code;

    public CustomException(Code code){
        this.code = code;
    }
}
