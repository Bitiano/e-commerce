package senac.pi.ecommerce.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.AllArgsConstructor;

import senac.pi.ecommerce.backend.models.Produto;
import senac.pi.ecommerce.backend.models.ProdutoDto;
import senac.pi.ecommerce.backend.models.ProdutoPayloadDto;
import senac.pi.ecommerce.backend.models.UsuarioPayloadDto;
import senac.pi.ecommerce.backend.repository.ProdutoRepository;

@AllArgsConstructor
@Service
public class ProdutoService {
   
    private final UsuarioService usuarioService;
    private final ProdutoRepository produtoRepository;

    public Produto saveProduto (ProdutoPayloadDto produtoPayloadDto) {
        Produto produto = new Produto();
        produto.setNome(produtoPayloadDto.getNome());
        produto.setAvaliacao(produtoPayloadDto.getAvaliacao());
        produto.setDescricao(produtoPayloadDto.getDescricao());
        produto.setPreco(produtoPayloadDto.getPreco());
        produto.setQtdEstoque(produtoPayloadDto.getQtdEstoque());
        produto.setImagesPath(produtoPayloadDto.getImagesPath());
        produto.setStatus(produtoPayloadDto.isStatus());

        String name =  produtoPayloadDto.getNome().replaceAll("[^a-zA-Z0-9]", "").toUpperCase();

        String code = "CP" + name;

        produto.setCode(code);

        return produto;
    }

    public Produto atualizaAcesso(String token, Long id) {
        UsuarioPayloadDto usuarioPayloadDto = usuarioService.verificarUsuarioPorToken(token);

        if(usuarioPayloadDto.getGrupo().equals("ADMIN")) {
            Optional<Produto> produto = produtoRepository.findById(id);
            Produto p = produto.get();
            if(p.isStatus() == true) {
                p.setStatus(false);
            } else {
                p.setStatus(true);
            }
            return p;
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Somente admnistradores podem mudar o status");
        }
    } 

    public Produto atualizaProduto(String token, Long id, ProdutoPayloadDto produtoPayloadDto) {
        UsuarioPayloadDto usuarioPayloadDto = usuarioService.verificarUsuarioPorToken(token);
        Optional<Produto> produto = produtoRepository.findById(id);
        Produto p = produto.get();

        if(usuarioPayloadDto.getGrupo().equals("ADMIN")) {
            p.setAvaliacao(produtoPayloadDto.getAvaliacao());
            p.setDescricao(produtoPayloadDto.getDescricao());
            p.setImagesPath(produtoPayloadDto.getImagesPath());
            p.setNome(produtoPayloadDto.getNome());
            p.setPreco(produtoPayloadDto.getPreco());
            p.setQtdEstoque(produtoPayloadDto.getQtdEstoque());
            p.setStatus(produtoPayloadDto.isStatus());

            String name = p.getNome().replaceAll("[^a-zA-Z0-9]", "").toUpperCase();

            String code = "CP" + name;

            p.setCode(code);

        } else if (usuarioPayloadDto.getGrupo().equals("ESTOQUISTA")) {
            p.setQtdEstoque(produtoPayloadDto.getQtdEstoque());
        }

        return p;
    }

    public ProdutoDto buscaProdutos(String nomeFiltro, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Produto> produtoPage;
    
        if (nomeFiltro != null && !nomeFiltro.isEmpty()) {
            produtoPage = produtoRepository.buscarProdutos(nomeFiltro, pageable);
        } else {
            produtoPage = produtoRepository.findAll(pageable);
        }
    
        long qtdTotal = produtoPage.getTotalElements();
        int totalPages = produtoPage.getTotalPages();
        List<Produto> produtos = produtoPage.getContent();
    
        return new ProdutoDto(produtos, qtdTotal, totalPages, page);
    }

    public Produto buscaProduto(String token, long id) {
        UsuarioPayloadDto usuarioPayloadDto = usuarioService.verificarUsuarioPorToken(token);

        if(usuarioPayloadDto.getGrupo().equals("ADMIN")) {
            return produtoRepository.findById(id);
        }

        return null;
    }
}