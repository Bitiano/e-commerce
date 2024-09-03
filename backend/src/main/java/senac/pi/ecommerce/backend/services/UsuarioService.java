package senac.pi.ecommerce.backend.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import senac.pi.ecommerce.backend.models.Usuario;
import senac.pi.ecommerce.backend.models.UsuarioLoginDto;
import senac.pi.ecommerce.backend.models.UsuarioPayloadDto;
import senac.pi.ecommerce.backend.repository.UsuarioRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private static final String CHAVE_SECRETA = "jwt-yks-validation";

    public Usuario encriptSenha(Usuario usuario) {
        String encryptedPassword = bCryptPasswordEncoder.encode(usuario.getSenha());
        usuario.setSenha(encryptedPassword);

        return usuario;
    }

    public boolean validaEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        return usuario != null;
    }

    public boolean validaSenha(UsuarioLoginDto usuarioLoginDto) {
        Usuario usuario = usuarioRepository.findByEmail(usuarioLoginDto.getEmail());

        if (usuario != null) {
            return bCryptPasswordEncoder.matches(usuarioLoginDto.getSenha(), usuario.getSenha());
        } else {
            return false;
        }
    }

    public String gerarToken(UsuarioLoginDto usuarioLoginDto) {
        long agora = System.currentTimeMillis();
        long expiracao = agora + TimeUnit.DAYS.toMillis(10);

        Usuario usuario = usuarioRepository.findByEmail(usuarioLoginDto.getEmail());

        return Jwts.builder()
                .setSubject(usuario.getEmail())
                .setIssuedAt(new Date(agora))
                .setExpiration(new Date(expiracao))
                .signWith(SignatureAlgorithm.HS256, CHAVE_SECRETA)
                .compact();
    }

    public Usuario atualizar(Long id, Usuario usuario, String token) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        Usuario u = optionalUsuario.get();
        UsuarioPayloadDto usuarioLogado = verificarUsuarioPorToken(token);

        if(usuarioLogado.getGrupo().equals("ADMIN")) {
            if (optionalUsuario.isEmpty() || usuarioLogado.getEmail().equals(u.getEmail())) {
                return null;
            }

            if(usuario.getNome() != null) {
                u.setNome(usuario.getNome());;
            }

            if (usuario.getSenha() != null) {
                String encryptedPassword = bCryptPasswordEncoder.encode(usuario.getSenha());
                u.setSenha(encryptedPassword);
            }

            if (usuario.getCpf() != null) {
                u.setCpf(usuario.getCpf());
            }

            return u;
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "É necessário ser um admin para atualizar usuário");
        }
    }

    public Usuario atualizaAcesso(Long id, String token) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        Usuario u = optionalUsuario.get();
        UsuarioPayloadDto usuarioPayloadDto = verificarUsuarioPorToken(token);

        if (optionalUsuario.isEmpty() || !usuarioPayloadDto.getGrupo().equals("ADMIN")) {
            return null;
        }

        if (u.isAtivo() == true) {
            u.setAtivo(false);
        } else {
            u.setAtivo(true);
        }

        return u;
    }

    public UsuarioPayloadDto verificarUsuarioPorToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser()
                    .setSigningKey(CHAVE_SECRETA)
                    .parseClaimsJws(token);

            String userEmail = claimsJws.getBody().getSubject();
            Usuario usuario = usuarioRepository.findByEmail(userEmail);

            if (usuario == null) {
                throw new RuntimeException("Token válido, mas usuário não encontrado.");
            }

            UsuarioPayloadDto usuarioPayloadDto = new UsuarioPayloadDto();

            usuarioPayloadDto.setAtivo(usuario.isAtivo());
            usuarioPayloadDto.setCpf(usuario.getCpf());
            usuarioPayloadDto.setEmail(usuario.getEmail()); 
            usuarioPayloadDto.setId(usuario.getId());
            usuarioPayloadDto.setNome(usuario.getNome());
            
            return usuarioPayloadDto;
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token expirado.");
        } catch (MalformedJwtException | SignatureException e) {
            throw new RuntimeException("Token inválido.");
        } catch (Exception e) {
            throw new RuntimeException("Erro ao verificar o token.");
        }
    }

    public List<UsuarioPayloadDto> buscaUsuarios(String nomeFiltro, String token) {
        UsuarioPayloadDto usuarioPayloadDto = verificarUsuarioPorToken(token);
       if(usuarioPayloadDto.getGrupo().equals("ADMIN")) {
         List<UsuarioPayloadDto> usuarios = usuarioRepository.findAllUsuariosFilteredByName(nomeFiltro);
         return usuarios;
       } else {
        return null;
       }
    }

    public UsuarioPayloadDto buscaUsuario(String token, long id) {
        UsuarioPayloadDto usuarioPayloadDto = verificarUsuarioPorToken(token);

        if(usuarioPayloadDto.getGrupo().equals("ADMIN")) {
            return usuarioRepository.findById(id);
        }

        return null;
    }
}