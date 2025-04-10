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
@Table(name = "cargos")
public class Cargo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Probar con SEQUENCY
    @Column(name = "idCargo", nullable = false)
    private Long id;

    @Column(name = "cargo", length = 50)
    private String cargo;

    @Lob
    @Column(name = "descripcionCargo")
    private String descripcionCargo;

    @Column(name = "jefatura")
    private Boolean jefatura;

    @JsonIgnore // Ignora relaciones perezosas
    @OneToMany(mappedBy = "idCargo", fetch = FetchType.LAZY)
    private List<Contratacion> contrataciones;

}