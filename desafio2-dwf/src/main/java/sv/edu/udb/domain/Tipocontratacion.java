package sv.edu.udb.domain;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
@Table(name = "tipocontratacion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tipocontratacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idTipoContratacion", nullable = false)
    private Long id;

    @Column(name = "tipoContratacion", length = 100)
    private String tipoContratacion;

    @JsonIgnore
    @OneToMany(mappedBy = "tipoContratacion", fetch = FetchType.LAZY)
    private List<Contratacion> contrataciones;

}
