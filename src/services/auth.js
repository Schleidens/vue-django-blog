import ApiService from "./ApiService";

// function to log in obtain a token
export async function login(username, password){
    try {
        const response = await ApiService.post('login/', { username, password });
        const token = response.data.token
        //set token in localStorage
        localStorage.setItem("token", token);
        //set the default Authorization header
        ApiService.defaults.headers.common['Authorization'] = `Token ${token}`
        return true;
    } catch (error) {
        console.log("Login failed", error.response.data.error[0])
    }
}

export function isAuthenticated(){
    const token = localStorage.getItem('token');
    return !!token;
}