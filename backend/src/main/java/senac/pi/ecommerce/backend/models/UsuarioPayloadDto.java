package senac.pi.ecommerce.backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioPayloadDto {
    private long id;
    private String nome;
    private String email;
    private String grupo;
    private boolean ativo;
    private String cpf;

    public UsuarioPayloadDto(long id, String nome, String email, String grupo, boolean ativo) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.grupo = grupo;
        this.ativo = ativo;
    }
}