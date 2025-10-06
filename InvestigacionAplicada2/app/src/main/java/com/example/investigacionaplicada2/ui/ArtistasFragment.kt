package com.example.investigacionaplicada2.ui

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.investigacionaplicada2.R
import com.example.investigacionaplicada2.adapters.ArtistAdapter
import com.example.investigacionaplicada2.models.Artista
import com.google.firebase.database.*

class ArtistasFragment : Fragment(R.layout.fragment_artistas) {

    private lateinit var database: DatabaseReference
    private lateinit var recyclerView: RecyclerView
    private lateinit var artistaAdapter: ArtistAdapter
    private val listaArtistas = mutableListOf<Artista>()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // 1. Inicializar la referencia a la base de datos de Firebase
        database = FirebaseDatabase.getInstance().getReference("artistas")

        // 2. Configurar el RecyclerView
        recyclerView = view.findViewById(R.id.recyclerViewArtistas)
        recyclerView.layoutManager = LinearLayoutManager(context)
        artistaAdapter = ArtistAdapter(listaArtistas)
        recyclerView.adapter = artistaAdapter

        // 3. Leer los datos de Firebase
        leerDatosDeFirebase()
    }

    private fun leerDatosDeFirebase() {
        database.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                listaArtistas.clear() // Limpiar la lista para evitar duplicados
                for (artistaSnapshot in snapshot.children) {
                    val artista = artistaSnapshot.getValue(Artista::class.java)
                    if (artista != null) {
                        listaArtistas.add(artista)
                    }
                }
                // Notificar al adaptador que los datos han cambiado
                artistaAdapter.notifyDataSetChanged()
            }

            override fun onCancelled(error: DatabaseError) {
                // Manejar el error, por ejemplo, mostrando un mensaje
                // Log.w("ArtistasFragment", "loadPost:onCancelled", error.toException())
            }
        })
    }
}
