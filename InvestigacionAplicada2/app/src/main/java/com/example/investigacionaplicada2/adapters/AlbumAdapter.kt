package com.example.investigacionaplicada2.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.investigacionaplicada2.R
import com.example.investigacionaplicada2.models.Album

class AlbumAdapter(
    private var lista: MutableList<Album>,
    private val listener: OnAlbumClick
) : RecyclerView.Adapter<AlbumAdapter.AlbumVH>() {

    interface OnAlbumClick {
        fun onClick(album: Album)
    }

    inner class AlbumVH(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvTitulo: TextView = itemView.findViewById(R.id.tvTitulo)
        val tvAño: TextView = itemView.findViewById(R.id.tvAño)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AlbumVH {
        val vista = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_album, parent, false)
        return AlbumVH(vista)
    }

    override fun onBindViewHolder(holder: AlbumVH, position: Int) {
        val album = lista[position]
        holder.tvTitulo.text = album.titulo
        holder.tvAño.text = "Año: ${album.año}"
        holder.itemView.setOnClickListener { listener.onClick(album) }
    }

    override fun getItemCount(): Int = lista.size

    fun setData(nuevaLista: List<Album>) {
        lista.clear()
        lista.addAll(nuevaLista)
        notifyDataSetChanged()
    }
}