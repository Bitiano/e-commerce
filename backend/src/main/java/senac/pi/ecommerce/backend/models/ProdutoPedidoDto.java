package senac.pi.ecommerce.backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoPedidoDto {
    private String nome;
    private double preco;
    private String img;
}