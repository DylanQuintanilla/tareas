package sv.edu.udb.controller.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DuiValidator.class)
@Documented
public @interface Dui {
    String message() default "Formato de DUI inválido. Ejemplo: 01234567-8";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
