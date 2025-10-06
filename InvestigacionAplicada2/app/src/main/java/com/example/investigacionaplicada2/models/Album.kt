package com.example.investigacionaplicada2.models

data class Album(
    var id: String? = null,
    var titulo: String? = null,
    var año: String? = null,
    var canciones: Map<String, Cancion>? = null // Relación con canciones
) {
    constructor() : this(null, null, null, null)
}