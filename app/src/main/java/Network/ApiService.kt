package Network

import Models.ApiResponse
import Models.Users
import retrofit2.Response
import retrofit2.http.*

interface ApiService {

    @POST("usuarios")
    suspend fun guardarUsuario(@Body usuario: Users): Response<ApiResponse>

    @GET("usuarios/{cedula}")
    suspend fun buscarPorCedula(@Path("cedula") cedula: String): Response<ApiResponse>

    @GET("usuarios")
    suspend fun obtenerTodos(): Response<List<Users>>

    @DELETE("usuarios/{cedula}")
    suspend fun eliminarUsuario(@Path("cedula") cedula: String): Response<ApiResponse>
}