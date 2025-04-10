package sv.edu.udb.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "empleados")
public class Empleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEmpleado", nullable = false)
    private Integer id;

    @Column(name = "numeroDUI", length = 9)
    private String numeroDUI;

    @Column(name = "nombrePersona", length = 50)
    private String nombrePersona;

    @Column(name = "usuario", length = 50)
    private String usuario;

    @Column(name = "numeroTelefono", length = 9)
    private String numeroTelefono;

    @Column(name = "correoInstitucional", length = 50)
    private String correoInstitucional;

    @Column(name = "fechaNacimiento")
    private LocalDate fechaNacimiento;

}