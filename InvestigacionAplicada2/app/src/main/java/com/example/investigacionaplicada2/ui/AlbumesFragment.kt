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
import com.example.investigacionaplicada2.adapters.AlbumAdapter
import com.example.investigacionaplicada2.models.Album

class AlbumesFragment : Fragment(), AlbumAdapter.OnAlbumClick {

    private lateinit var rvAlbumes: RecyclerView
    private lateinit var adapter: AlbumAdapter
    private val dbRef = FirebaseDatabase.getInstance().reference.child("artists")
    private lateinit var searchView: SearchView
    private lateinit var listaOriginal: MutableList<Album>

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_albumes, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        rvAlbumes = view.findViewById(R.id.rvAlbumes)
        searchView = view.findViewById(R.id.searchView)
        adapter = AlbumAdapter(mutableListOf(), this)
        rvAlbumes.layoutManager = LinearLayoutManager(requireContext())
        rvAlbumes.adapter = adapter

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
                val lista = mutableListOf<Album>()
                for (artistaSnapshot in snapshot.children) {
                    val artista = artistaSnapshot.getValue(com.example.investigacionaplicada2.models.Artista::class.java)
                    if (artista != null && artista.albums != null) {
                        for (albumSnapshot in artista.albums!!) {
                            val album = albumSnapshot.value as Album
                            lista.add(album)
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

    override fun onClick(album: Album) {
        // Acciones al hacer clic en un álbum (opcional)
    }
}