package sv.edu.udb.controller.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DuiValidator implements ConstraintValidator<Dui, String> {
    private static final String DUI_PATTERN = "^\\d{8}-\\d$"; // 8 dígitos + guion + 1 dígito

    @Override
    public boolean isValid(String dui, ConstraintValidatorContext context) {
        if (dui == null) {
            return true; // Si el campo es opcional, ajusta esto a @NotNull si es requerido
        }
        return dui.matches(DUI_PATTERN);
    }
}
