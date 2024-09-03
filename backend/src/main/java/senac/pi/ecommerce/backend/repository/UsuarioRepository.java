package senac.pi.ecommerce.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import senac.pi.ecommerce.backend.models.Usuario;
import senac.pi.ecommerce.backend.models.UsuarioPayloadDto;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
    @Query("SELECT new senac.pi.ecommerce.backend.models.UsuarioPayloadDto(u.id, u.nome, u.email, u.ativo, u.cpf) FROM Usuario u" +
       " WHERE (:nomeFiltro IS NULL OR LOWER(u.nome) LIKE LOWER(concat('%', :nomeFiltro, '%')))")
    List<UsuarioPayloadDto> findAllUsuariosFilteredByName(@Param("nomeFiltro") String nomeFiltro);

    @Query("SELECT new senac.pi.ecommerce.backend.models.UsuarioPayloadDto(u.id, u.nome, u.email, u.ativo, u.cpf) FROM Usuario u" +
           " WHERE (u.id = :id)")
    UsuarioPayloadDto findById(long id);
}