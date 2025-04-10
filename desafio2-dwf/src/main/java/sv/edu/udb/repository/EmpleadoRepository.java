package sv.edu.udb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sv.edu.udb.domain.Empleado;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Integer> {
}
