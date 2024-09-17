package senac.pi.ecommerce.backend.models;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "produto")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String code;

    @Column
    private String nome;

    @Column
    private double avaliacao;

    @Column
    private String descricao;

    @Column
    private double preco;

    @Column
    private int qtdEstoque;

    @Column
    private List<String> imagesPath;


    @Column
    private boolean status;

    @Column
    private String createdDate = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
}