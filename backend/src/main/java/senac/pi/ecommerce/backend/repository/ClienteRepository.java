package senac.pi.ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import senac.pi.ecommerce.backend.models.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>{
    Cliente findByEmail(String email);
    Cliente findByCpf(String cpf);
}