package sv.edu.udb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sv.edu.udb.domain.Contratacion;

@Repository
public interface ContratacionRepository extends JpaRepository<Contratacion, Integer> {
}
