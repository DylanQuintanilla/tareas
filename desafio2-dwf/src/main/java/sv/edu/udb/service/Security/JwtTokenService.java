/*package sv.edu.udb.service.Security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Service // Marca esta clase como un componente de servicio para que Spring la detecte y administre.
@RequiredArgsConstructor // Genera automáticamente un constructor con los campos final.
public class JwtTokenService {

    @Value("${jwt.secret:defaultSecretKey}") // Inyecta el valor del secreto JWT desde el archivo properties.
    private String secretKey;

    @Value("${jwt.expiration:3600000}") // Inyecta el tiempo de expiración del token (1 hora por defecto).
    private long expirationInMs;

    private Key signingKey; // Llave usada para firmar los tokens.

    @PostConstruct // Se ejecuta después de que se inyectan las dependencias.
    public void init() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey); // Decodifica la clave en Base64.
        this.signingKey = Keys.hmacShaKeyFor(keyBytes); // Crea la llave de firma HMAC.
    }

    // Genera un token JWT desde un UserDetails (usualmente en login).
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        List<String> roles = userDetails.getAuthorities()
                .stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        claims.put("roles", roles); // Agrega roles al payload.
        return buildToken(claims, userDetails.getUsername(), expirationInMs);
    }

    // Alternativa para generar token usando un objeto Authentication.
    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        List<String> roles = authentication.getAuthorities()
                .stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        Map<String, Object> claims = Map.of("roles", roles);
        return buildToken(claims, username, expirationInMs);
    }

    // Construye y firma el token JWT.
    private String buildToken(Map<String, Object> claims, String subject, long validityMillis) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + validityMillis);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject) // Usuario principal.
                .setIssuedAt(now) // Fecha de emisión.
                .setExpiration(expiry) // Fecha de expiración.
                .signWith(signingKey, SignatureAlgorithm.HS256) // Firma con HMAC-SHA256.
                .compact();
    }

    // Verifica si el token es válido y corresponde al usuario.
    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject().equals(userDetails.getUsername())
                    && !claims.getExpiration().before(new Date()); // Verifica expiración.
        } catch (JwtException | IllegalArgumentException e) {
            return false; // Token inválido o malformado.
        }
    }

    // Extrae el nombre de usuario (subject) del token.
    public String extractUsername(String token) {
        return parseClaims(token).getSubject();
    }

    // Extrae los roles del token.
    @SuppressWarnings("unchecked")
    public List<String> extractRoles(String token) {
        return (List<String>) parseClaims(token).get("roles");
    }

    // Método auxiliar para obtener los claims del token.
    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
*/