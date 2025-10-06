package com.example.investigacionaplicada2

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
// --------- INICIO DE IMPORTACIONES IMPORTANTES ---------
import androidx.navigation.NavController // Asegúrate de que esta línea esté presente
import androidx.navigation.fragment.NavHostFragment // Asegúrate de que esta línea esté presente
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.bottomnavigation.BottomNavigationView
// --------- FIN DE IMPORTACIONES IMPORTANTES ---------


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. Obtener el NavHostFragment del layout de forma segura.
        //    Esta es la forma canónica y recomendada por Google.
        val navHostFragment = supportFragmentManager
            .findFragmentById(R.id.nav_host_fragment) as NavHostFragment

        // 2. Desde el NavHostFragment, obtén su NavController.
        val navController: NavController = navHostFragment.navController

        // 3. Encontrar el BottomNavigationView en el layout.
        val bottomNavigationView: BottomNavigationView = findViewById(R.id.bottom_nav)

        // 4. Conectar el BottomNavigationView con el NavController que obtuviste.
        bottomNavigationView.setupWithNavController(navController)
    }
}

