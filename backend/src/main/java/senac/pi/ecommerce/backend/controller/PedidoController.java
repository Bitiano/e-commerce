package senac.pi.ecommerce.backend.controller;

import java.util.List;

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

import senac.pi.ecommerce.backend.models.PedidoDetalhe;
import senac.pi.ecommerce.backend.models.PedidoDto;
import senac.pi.ecommerce.backend.models.PedidoRetorno;
import senac.pi.ecommerce.backend.services.PedidoService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/")
public class PedidoController {
    private final PedidoService pedidoService;

    @PostMapping("pedido/criaPedido/token/{token}")
    public ResponseEntity<String> incluiPedido(@PathVariable String token, @RequestBody PedidoDto pedidoDto){
        String code = pedidoService.incluiPedido(token, pedidoDto);
        if(code != null) {
            return new ResponseEntity<>(code, HttpStatus.CREATED);
        }
        return new ResponseEntity<String>("Nâo foi possível criar o pedido", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("pedido/retornaPedidos/token/{token}")
    public List<PedidoRetorno> retornaPedidos(@PathVariable String token) {
        return pedidoService.getPedidosByClienteId(token);
    }

    @GetMapping("pedido/retornaPedidos")
    public List<PedidoRetorno> retornaPedidos() {
        return pedidoService.getPedidos();
    }

    @PutMapping("pedido/atualizaStatusPedido/id/{id}")
    public ResponseEntity<String> atualizaPedido(@PathVariable Long id, @RequestParam int status) {
        try {
            pedidoService.atualizaStatus(id, status);
            return new ResponseEntity<>("Atualizado com sucesso", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Nâo foi possível atualizar", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("pedido/retornaPedido/id/{id}")
    public PedidoDetalhe retornaPedidoDetalhe(@PathVariable Long id) {
        return pedidoService.retornaDetalhePedido(id);
    }
}