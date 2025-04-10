package sv.edu.udb.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "departamento")
public class Departamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idDepartamento", nullable = false)
    private Long id;

    @Column(name = "nombreDepartamento", length = 50)
    private String nombreDepartamento;

    @Lob
    @Column(name = "descripcionDepartamento")
    private String descripcionDepartamento;

    @JsonIgnore // Ignora relaciones perezosas
    @OneToMany(mappedBy = "idDepartamento", fetch = FetchType.LAZY)
    private List<Contratacion> contrataciones;
}