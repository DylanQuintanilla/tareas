package sv.edu.udb.service.Security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Component // Marca la clase como un componente de Spring (será detectada automáticamente).
public class JwtTokenProvider {

    @Value("${jwt.secret:defaultSecretKey}") // Inyecta la clave secreta definida en el archivo properties o usa un valor por defecto.
    private String secretKey;

    @Value("${jwt.expiration:3600000}") // Tiempo de validez del token de acceso (1 hora en milisegundos).
    private long accessTokenValidity;

    @Value("${jwt.refresh-expiration:86400000}") // Tiempo de validez del token de refresco (24 horas en milisegundos).
    private long refreshTokenValidity;

    private Key key; // Llave criptográfica generada a partir del secretKey.

    @PostConstruct // Método que se ejecuta automáticamente después de que se inyectan los valores.
    protected void init() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey); // Decodifica la clave Base64.
        this.key = Keys.hmacShaKeyFor(keyBytes); // Genera una llave HMAC con SHA-256.
    }

    // Crea un token de acceso a partir del objeto Authentication (credenciales del usuario).
    public String createToken(Authentication auth) {
        return buildToken(auth, accessTokenValidity);
    }

    // Crea un token de refresco con mayor duración.
    public String createRefreshToken(Authentication auth) {
        return buildToken(auth, refreshTokenValidity);
    }

    // Método privado que genera un JWT con duración personalizada.
    private String buildToken(Authentication auth, long validity) {
        String username = auth.getName(); // Extrae el nombre de usuario.
        List<String> roles = auth.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()); // Convierte los roles en una lista de Strings.

        Claims claims = Jwts.claims().setSubject(username); // Crea los claims (datos dentro del token).
        claims.put("roles", roles); // Agrega los roles al JWT.

        Date now = new Date(); // Fecha actual.
        Date exp = new Date(now.getTime() + validity); // Fecha de expiración.

        // Construye y firma el JWT.
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Valida si un token es válido y no está expirado.
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token); // Parsea el token y verifica su firma.
            return !claims.getBody().getExpiration().before(new Date()); // Retorna true si no ha expirado.
        } catch (JwtException | IllegalArgumentException e) {
            return false; // Token inválido o malformado.
        }
    }

    // Extrae el nombre de usuario (subject) desde el token.
    public String getUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Extrae los roles desde el token.
    @SuppressWarnings("unchecked")
    public List<String> getRoles(String token) {
        return (List<String>) Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("roles");
    }

}
