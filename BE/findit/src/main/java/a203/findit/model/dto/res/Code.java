package a203.findit.model.dto.res;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Code {
    C200 (200, "SUCCESS"),
    C401 (300, "INVALID"),
    C500 (500, "INTERNAL SERVER ERROR"),
    C402 (402, "INVALID ID"),
    C403(403, "NO SUCH USER"),
    C404(404, "UNAUTHORIZED"),
    C405(405, "INVALID FILE TYPE"),
    C406(406, "NOT FOUND");

    private int errCode;

    private final String message;


}