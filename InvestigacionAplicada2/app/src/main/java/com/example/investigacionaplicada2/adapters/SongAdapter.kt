package com.example.investigacionaplicada2.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.investigacionaplicada2.R
import com.example.investigacionaplicada2.models.Cancion

class SongAdapter(
    private var lista: MutableList<Cancion>,
    private val listener: OnSongClick
) : RecyclerView.Adapter<SongAdapter.SongVH>() {

    interface OnSongClick {
        fun onClick(cancion: Cancion)
    }

    inner class SongVH(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvTitulo: TextView = itemView.findViewById(R.id.tvTitulo)
        val tvDuracion: TextView = itemView.findViewById(R.id.tvDuracion)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SongVH {
        val vista = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_cancion, parent, false)
        return SongVH(vista)
    }

    override fun onBindViewHolder(holder: SongVH, position: Int) {
        val cancion = lista[position]
        holder.tvTitulo.text = cancion.titulo
        holder.tvDuracion.text = "Duración: ${cancion.duracion}"
        holder.itemView.setOnClickListener { listener.onClick(cancion) }
    }

    override fun getItemCount(): Int = lista.size

    fun setData(nuevaLista: List<Cancion>) {
        lista.clear()
        lista.addAll(nuevaLista)
        notifyDataSetChanged()
    }
}