package com.example.investigacionaplicada2.ui

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.SearchView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import com.example.investigacionaplicada2.R
import com.example.investigacionaplicada2.adapters.SongAdapter
import com.example.investigacionaplicada2.models.Album
import com.example.investigacionaplicada2.models.Cancion

class CancionesFragment : Fragment(), SongAdapter.OnSongClick {

    private lateinit var rvCanciones: RecyclerView
    private lateinit var adapter: SongAdapter
    private val dbRef = FirebaseDatabase.getInstance().reference.child("artists")
    private lateinit var searchView: SearchView
    private lateinit var listaOriginal: MutableList<Cancion>

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_canciones, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        rvCanciones = view.findViewById(R.id.rvCanciones)
        searchView = view.findViewById(R.id.searchView)
        adapter = SongAdapter(mutableListOf(), this)
        rvCanciones.layoutManager = LinearLayoutManager(requireContext())
        rvCanciones.adapter = adapter

        escucharCambios()

        searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String?): Boolean {
                filtrarPorNombre(query.orEmpty())
                return true
            }
            override fun onQueryTextChange(newText: String?): Boolean {
                filtrarPorNombre(newText.orEmpty())
                return true
            }
        })
    }

    private fun escucharCambios() {
        dbRef.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val lista = mutableListOf<Cancion>()
                for (artistaSnapshot in snapshot.children) {
                    val artista = artistaSnapshot.getValue(com.example.investigacionaplicada2.models.Artista::class.java)
                    if (artista != null && artista.albums != null) {
                        for (albumSnapshot in artista.albums!!) {
                            val album = albumSnapshot.value as Album
                            if (album.canciones != null) {
                                for (cancionSnapshot in album.canciones!!) {
                                    val cancion = cancionSnapshot.value as Cancion
                                    lista.add(cancion)
                                }
                            }
                        }
                    }
                }
                adapter.setData(lista)
                listaOriginal = lista
            }
            override fun onCancelled(error: DatabaseError) {
                // Manejar error
            }
        })
    }

    private fun filtrarPorNombre(texto: String) {
        val filtrados = listaOriginal.filter { it.titulo?.contains(texto, ignoreCase = true) == true }
        adapter.setData(filtrados)
    }

    override fun onClick(cancion: Cancion) {
        // Acciones al hacer clic en una canción (opcional)
    }
}