package sv.edu.udb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.controller.request.AuthRequest;
import sv.edu.udb.controller.response.AuthResponse;
import sv.edu.udb.controller.request.RegisterRequest;
import sv.edu.udb.controller.response.ErrorResponse;
import sv.edu.udb.domain.User;
import sv.edu.udb.repository.UserRepository;
import sv.edu.udb.service.Security.JwtService;

/**
 * Controlador para autenticación y registro de usuarios.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    // Asegurarse de que Jackson pueda serializar ErrorResponse
    @Bean
    public Jackson2ObjectMapperBuilderCustomizer customizeJson() {
        return builder -> builder.failOnEmptyBeans(false);
    }

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Autentica al usuario y devuelve tokens JWT.
     */
    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getUsername(),
                        authRequest.getPassword()
                )
        );

        if (authentication.isAuthenticated()) {
            var userDetails = (User) authentication.getPrincipal();
            var jwtToken = jwtService.generateToken(userDetails);
            var refreshToken = jwtService.generateRefreshToken(userDetails);
            return ResponseEntity.ok(new AuthResponse(jwtToken, refreshToken));
        }

        throw new UsernameNotFoundException("Credenciales inválidas");
    }

    /**
     * Registra un nuevo usuario. Verifica unicidad y devuelve error si ya existe.
     */
    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        // Verificar si el usuario ya existe
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("USERNAME_TAKEN", "El nombre de usuario ya está en uso"));
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setFirstname(registerRequest.getFirstname());
        user.setLastname(registerRequest.getLastname());
        user.setAge(registerRequest.getAge());

        User saved = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
