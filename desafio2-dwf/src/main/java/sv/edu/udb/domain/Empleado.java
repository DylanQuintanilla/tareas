package sv.edu.udb.domain;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sv.edu.udb.controller.validation.Dui;
import sv.edu.udb.controller.validation.PhoneNumber;

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

    @JsonIgnore // Ignora relaciones perezosas si existen
    @OneToMany(mappedBy = "empleado", fetch = FetchType.LAZY)
    private List<Contratacion> contrataciones;
}