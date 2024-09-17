package senac.pi.ecommerce.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import senac.pi.ecommerce.backend.models.Usuario;
import senac.pi.ecommerce.backend.repository.UsuarioRepository;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UsuarioRepository usuarioRepository) {
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
        };
    }
}
