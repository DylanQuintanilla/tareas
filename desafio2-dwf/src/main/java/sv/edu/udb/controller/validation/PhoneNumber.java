package sv.edu.udb.controller.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PhoneNumberValidator.class)
@Documented
public @interface PhoneNumber {
    String message() default "Número de teléfono inválido. Debe tener el formato ####-####";
    String pattern() default "^\\d{4}-\\d{4}$";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
