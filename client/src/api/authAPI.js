const API_URL = "http://localhost:5000/api/auth/login"; // Ajusta la URL según la configuración de tu servidor
export default async function login(userInfo) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        });
        if (!response.ok) {
            throw new Error("Error en la autenticación");
        }
        const data = await response.json();
        localStorage.setItem("token", data.token); // Almacena el JWT en localStorage
        return data;
    }
    catch (error) {
        console.error("Error en el login:", error);
        throw error;
    }
}
export const logout = () => {
    localStorage.removeItem("token"); // Elimina el JWT de localStorage
};
