package com.example.investigacionaplicada2.adapters


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.investigacionaplicada2.R
import com.example.investigacionaplicada2.models.Artista

class ArtistAdapter(
    private var lista: MutableList<Artista>,
    private val listener: OnArtistClick
) : RecyclerView.Adapter<ArtistAdapter.ArtistVH>() {

    interface OnArtistClick {
        fun onClick(artista: Artista)
    }

    inner class ArtistVH(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvNombre: TextView = itemView.findViewById(R.id.tvNombre)
        val tvGenero: TextView = itemView.findViewById(R.id.tvGenero)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ArtistVH {
        val vista = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_artista, parent, false)
        return ArtistVH(vista)
    }

    override fun onBindViewHolder(holder: ArtistVH, position: Int) {
        val artista = lista[position]
        holder.tvNombre.text = artista.nombre
        holder.tvGenero.text = "Género: ${artista.genero}"
        holder.itemView.setOnClickListener { listener.onClick(artista) }
    }

    override fun getItemCount(): Int = lista.size

    fun setData(nuevaLista: List<Artista>) {
        lista.clear()
        lista.addAll(nuevaLista)
        notifyDataSetChanged()
    }
}