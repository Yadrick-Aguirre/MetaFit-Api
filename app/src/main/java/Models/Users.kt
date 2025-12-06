package Models

import com.google.gson.annotations.SerializedName

data class Users(
    @SerializedName("cedula") val cedula: String = "",
    @SerializedName("nombre") val nombre: String = "",
    @SerializedName("apellidos") val apellidos: String = "",
    @SerializedName("nacionalidad") val nacionalidad: String? = null,
    @SerializedName("fechaNacimiento") val fechaNacimiento: String = "",
    @SerializedName("genero") val genero: String = "",
    @SerializedName("peso") val peso: String = "",
    @SerializedName("fotoPerfil") val fotoPerfil: String? = null
)