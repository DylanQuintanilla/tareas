package sv.edu.udb.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "contrataciones")
public class Contratacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idContratacion", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idDepartamento")
    private Departamento idDepartamento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idEmpleado")
    private Empleado idEmpleado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idCargo")
    private Cargo idCargo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idTipoContratacion")
    private Tipocontratacion idTipoContratacion;

    @Column(name = "fechaContratacion")
    private LocalDate fechaContratacion;

    @Column(name = "salario", precision = 10, scale = 2)
    private BigDecimal salario;

    @Column(name = "estado")
    private Boolean estado;

}