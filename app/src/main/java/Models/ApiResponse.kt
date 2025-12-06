package Models

data class ApiResponse(
    val success: Boolean,
    val message: String,
    val usuario: Users? = null
)
