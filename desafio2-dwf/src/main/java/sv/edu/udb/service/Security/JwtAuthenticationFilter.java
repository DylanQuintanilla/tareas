package sv.edu.udb.service.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import sv.edu.udb.service.Security.JwtTokenProvider;

import java.io.IOException;

/**
 * Filtro de autenticación JWT que se ejecuta una vez por solicitud HTTP.
 * Verifica si el token JWT es válido y, si lo es, configura la autenticación en el contexto de seguridad.
 */
@Component // Permite que Spring registre automáticamente esta clase como un componente del contexto
@RequiredArgsConstructor // Genera un constructor con los campos final automáticamente
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // Servicio para manejar la lógica de los tokens JWT (validación, extracción, etc.)
    private final JwtTokenProvider JwtTokenProvider;

    // Servicio que carga los detalles del usuario a partir del nombre de usuario
    private final UserDetailsService userDetailsService;

    /**
     * Método que intercepta cada solicitud HTTP para verificar y autenticar el JWT.
     */
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // Obtiene el encabezado "Authorization" de la solicitud
        String authHeader = request.getHeader("Authorization");

        // Si no hay token o no comienza con "Bearer ", se continúa sin autenticar
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extrae el token eliminando el prefijo "Bearer "
        String token = authHeader.substring(7);

        // Extrae el nombre de usuario (subject) del token
        String username = JwtTokenProvider.getUsername(token);


        // Verifica que el usuario exista y no esté autenticado aún en el contexto
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Carga los detalles del usuario desde la base de datos o fuente configurada
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // Valida que el token sea correcto (firma válida, no expirado, etc.)
            if (JwtTokenProvider.validateToken(token)) {


                // Crea un token de autenticación usando los datos del usuario
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null, // No se necesita contraseña ya que ya está autenticado por el token
                                userDetails.getAuthorities() // Roles/autoridades del usuario
                        );

                // Asocia detalles adicionales del request (como IP, sesión, etc.)
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Establece la autenticación en el contexto de seguridad de Spring
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Continúa con la cadena de filtros (puede haber más filtros después)
        filterChain.doFilter(request, response);
    }
}
