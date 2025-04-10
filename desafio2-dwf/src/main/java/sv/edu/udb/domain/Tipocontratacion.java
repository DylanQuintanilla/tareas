package sv.edu.udb.domain;

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
@Table(name = "tipocontratacion")
public class Tipocontratacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idTipoContratacion", nullable = false)
    private Long id;

    @Column(name = "tipoContratacion", length = 100)
    private String tipoContratacion;

    @JsonIgnore // Ignora relaciones perezosas
    @OneToMany(mappedBy = "idTipoContratacion", fetch = FetchType.LAZY)
    private List<Contratacion> contrataciones;
}