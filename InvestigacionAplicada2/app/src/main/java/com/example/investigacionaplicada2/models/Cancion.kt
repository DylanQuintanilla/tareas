package com.example.investigacionaplicada2.models

data class Cancion(
    var id: String? = null,
    var titulo: String? = null,
    var duracion: String? = null
) {
    constructor() : this(null, null, null)
}