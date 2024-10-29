package senac.pi.ecommerce.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import senac.pi.ecommerce.backend.models.Usuario;
import senac.pi.ecommerce.backend.repository.UsuarioRepository;
import senac.pi.ecommerce.backend.models.Cliente;
import senac.pi.ecommerce.backend.repository.ClienteRepository;

import java.time.LocalDate;
import java.util.Collections;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UsuarioRepository usuarioRepository, ClienteRepository clienteRepository) {
        return args -> {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String encodedPassword = encoder.encode("123");

            Usuario usuario = new Usuario();
            usuario.setNome("João da Silva");
            usuario.setEmail("joao.silva@example.com");
            usuario.setGrupo("ADMIN");
            usuario.setSenha(encodedPassword);
            usuario.setAtivo(true);
            usuario.setCpf("12345678900");

            usuarioRepository.save(usuario);

            Cliente cliente = new Cliente();
            cliente.setEmail("cliente@example.com");
            cliente.setCpf("98765432100");  
            cliente.setNomeCompleto("Maria da Silva");
            cliente.setDataNascimento(LocalDate.of(1990, 1, 1));
            cliente.setGenero("Feminino");
            cliente.setEnderecos(Collections.emptyList());
            cliente.setSenha(encodedPassword);
            cliente.setPedidos(Collections.emptyList());

            clienteRepository.save(cliente);
        };
    }

}
