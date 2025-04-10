package sv.edu.udb.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import sv.edu.udb.controller.validation.Dui;
import sv.edu.udb.controller.validation.PhoneNumber;

import java.time.LocalDate;

@Entity
@Table(name = "empleados")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Empleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEmpleado", nullable = false)
    private Long id;

    @Column(name = "nombrePersona", length = 50, nullable = false)
    private String nombrePersona;

    @Column(name = "usuario", length = 50, nullable = false)
    private String usuario;

    @Column(name = "numeroDUI", length = 11)
    @Dui(message = "Formato de DUI inválido. Ejemplo: 06371984-6")
    private String numeroDUI;

    @Column(name = "numeroTelefono", length = 15)
    @PhoneNumber(message = "Formato de teléfono inválido")
    private String numeroTelefono;

    @Column(name = "correoInstitucional", length = 50)
    @Email(message = "Formato de correo electrónico inválido")
    private String correoInstitucional;

    @Column(name = "fechaNacimiento")
    private LocalDate fechaNacimiento;

}