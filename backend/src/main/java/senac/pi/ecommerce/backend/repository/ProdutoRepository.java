package senac.pi.ecommerce.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import senac.pi.ecommerce.backend.models.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    @Query("SELECT p FROM Produto p WHERE " +
    "(:nomeFiltro IS NULL OR LOWER(p.nome) LIKE LOWER(concat('%', :nomeFiltro, '%'))) " +
    "ORDER BY p.createdDate DESC")
    Page<Produto> buscarProdutos(@Param("nomeFiltro") String nomeFiltro, Pageable pageable);

    @Query("SELECT COUNT(p) FROM Produto p WHERE LOWER(p.nome) LIKE LOWER(concat('%', :nomeFiltro, '%'))")
    long contarProdutos(@Param("nomeFiltro") String nomeFiltro);

    @Query(value = "SELECT p.id, p.nome, p.avaliacao, p.descricao, p.preco, p.qtd_estoque, p.status " +
       "FROM produto p " +
       "WHERE p.id = :id", nativeQuery = true)
    Produto findById(long id);
}