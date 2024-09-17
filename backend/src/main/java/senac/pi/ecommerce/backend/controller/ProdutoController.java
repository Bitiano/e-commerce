package senac.pi.ecommerce.backend.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;



import lombok.AllArgsConstructor;
import senac.pi.ecommerce.backend.models.Produto;
import senac.pi.ecommerce.backend.models.ProdutoDto;
import senac.pi.ecommerce.backend.models.ProdutoPayloadDto;
import senac.pi.ecommerce.backend.models.UsuarioPayloadDto;
import senac.pi.ecommerce.backend.repository.ProdutoRepository;
import senac.pi.ecommerce.backend.services.ProdutoService;
import senac.pi.ecommerce.backend.services.UsuarioService;

@AllArgsConstructor
@RestController
@RequestMapping("/")
public class ProdutoController {
    private final ProdutoRepository produtoRepository;
    private final ProdutoService produtoCategoriaService;
    private final UsuarioService usuarioService;


    @PostMapping("produto/incluiProduto")
    public ResponseEntity<String> incluiProduto(@RequestParam String token, @RequestBody ProdutoPayloadDto produto) {
        UsuarioPayloadDto u = usuarioService.verificarUsuarioPorToken(token);
        if(u.getGrupo().equals("ADMIN")) {
            Produto p = produtoCategoriaService.saveProduto(produto);
            produtoRepository.save(p);
            return new ResponseEntity<>("Created", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Apenas administradores podem criar produtos", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("produto/listaProduto/{idProduto}")
    public Produto listaProduto(@PathVariable Long idProduto) {
        Optional<Produto> produto = produtoRepository.findById(idProduto);

        if(!produto.isEmpty()) {
            return produto.get();
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nao existe este produto");
        }
    }

    @PutMapping("produto/atualizaStatusProduto/{idProduto}")
    public ResponseEntity<String> atualizaStatusProduto(@RequestParam String token, @PathVariable Long idProduto) {
        Produto p = produtoCategoriaService.atualizaAcesso(token, idProduto);

        if(p != null) {
            produtoRepository.save(p);
            return ResponseEntity.ok("Status atualizado");
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nao foi possivel atualizar o status");
    }

    @PutMapping("produto/atualizaProduto/{idProduto}")
    public ResponseEntity<String> atualizaProduto(@RequestParam String token, @PathVariable Long idProduto, @RequestBody ProdutoPayloadDto produto) {
        Produto p = produtoCategoriaService.atualizaProduto(token, idProduto, produto);

        if(p != null) {
            produtoRepository.save(p);
            return ResponseEntity.ok("Produto atualizado");
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nao foi possivel atualizar o produto");
    }

    @GetMapping("produto/buscaProdutos/")
    public ProdutoDto buscaProdutos(@RequestParam(required = false) String nomeFiltro) {
        ProdutoDto u = produtoCategoriaService.buscaProdutos(nomeFiltro);

        if(u != null) {
            return u;
        }else{
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Problema ao listar produtos");
        }
    }
}