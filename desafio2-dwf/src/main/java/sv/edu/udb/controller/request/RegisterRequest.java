package sv.edu.udb.controller.request;

import lombok.Data;
import sv.edu.udb.controller.validation.PhoneNumber;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    private Integer age;

    @PhoneNumber
    private String phone;
}