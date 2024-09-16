package senac.pi.ecommerce.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import senac.pi.ecommerce.backend.models.Categoria;
import senac.pi.ecommerce.backend.models.CategoriaDto;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Categoria findById(long id);

    @Query("SELECT c FROM Categoria c JOIN FETCH c.produtos p WHERE p.status <> false ORDER BY p.createdDate DESC")
    List<Categoria> findAllCategoriasWithFilteredProducts();

    @Query("SELECT new senac.pi.ecommerce.backend.models.CategoriaDto(c.id, c.nome) FROM Categoria c")
    List<CategoriaDto> findAllCategoriesWithoutProducts();
}