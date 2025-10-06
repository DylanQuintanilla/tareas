package com.example.investigacionaplicada2.models

data class Artista(
    var id: String? = null,
    var nombre: String? = null,
    var genero: String? = null,
    var albums: Map<String, Album>? = null
) {
    constructor() : this(null, null, null, null)
}