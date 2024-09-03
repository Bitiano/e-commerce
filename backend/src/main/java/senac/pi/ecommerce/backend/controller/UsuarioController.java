package senac.pi.ecommerce.backend.controller;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import senac.pi.ecommerce.backend.models.Usuario;
import senac.pi.ecommerce.backend.models.UsuarioLoginDto;
import senac.pi.ecommerce.backend.models.UsuarioPayloadDto;
import senac.pi.ecommerce.backend.repository.UsuarioRepository;
import senac.pi.ecommerce.backend.services.UsuarioService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@AllArgsConstructor
@RestController
@RequestMapping("usuario/")
public class UsuarioController {

    private final UsuarioService userService;
    private final UsuarioRepository userRepository;

    @PostMapping("incluiAcesso")
    public ResponseEntity<String> registraUsuario(@RequestBody Usuario usuario, @RequestParam String token) {
        UsuarioPayloadDto u = userService.verificarUsuarioPorToken(token);
        if(u.getGrupo().equals("ADMIN")) {
            if(!userService.validaEmail(usuario.getEmail())) {
                userService.encriptSenha(usuario);
                userRepository.save(usuario);
                return new ResponseEntity<>("Created", HttpStatus.CREATED);
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Este email ja existe");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "É necessário ser um admin para criar usuário");
        }
    }


    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody UsuarioLoginDto usuarioLoginDto) {
        if(userService.validaSenha(usuarioLoginDto)) {
            Usuario usuario = userRepository.findByEmail(usuarioLoginDto.getEmail());
            if(usuario.isAtivo()){
                return ResponseEntity.ok(userService.gerarToken(usuarioLoginDto));
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario está desativado");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario nao existe ou email ou senha errados");
        }
    }

    @PutMapping("atualizaUsuario/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody Usuario usuario, @RequestParam String token) {
        Usuario u = userService.atualizar(id, usuario, token);

        if(u != null) {
            userRepository.save(u);
            return ResponseEntity.ok("Usuario atualizado");
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Nao é possivel atualizar o próprio usuário");
    }

    @PutMapping("atualizaAcessoUsuario/{id}")
    public ResponseEntity<String> atualizaAcesso(@PathVariable Long id, @RequestParam String token) {
        Usuario u = userService.atualizaAcesso(id, token);

        if(u != null) {
            userRepository.save(u);
            return ResponseEntity.ok("Acesso atualizado");
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "É preciso ser admin para atualizar acesso");
    }

    @GetMapping("buscaUsuarios")
    public List<UsuarioPayloadDto> buscaUsuarios(@RequestParam(required = false) String nomeFiltro, @RequestParam String token) {
        List<UsuarioPayloadDto> u = userService.buscaUsuarios(nomeFiltro, token);

        if(u != null) {
            return u;
        }else{
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Apenas admnistradores podem acessar a lista de usuários");
        }
    }

    @GetMapping("buscaUsuario/{id}")
    public UsuarioPayloadDto buscaUsuario(@RequestParam String token, @PathVariable long id) {
        UsuarioPayloadDto u = userService.buscaUsuario(token, id);

        if(u != null) {
            return u;
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nao foi possivel o usuário");
        }
    }

    @GetMapping("informacoes")
    public UsuarioPayloadDto informations(@RequestParam String jwtToken) {
        return userService.verificarUsuarioPorToken(jwtToken);
    }    
}