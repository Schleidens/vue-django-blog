import ApiService from "./ApiService";

// function to log in obtain a token
export async function login(username, password){
    try {
        const response = await ApiService.post('login/', { username, password });
        const token = response.data.token
        //set token in localStorage
        localStorage.setItem('token', token);
        //set the default Authorization header
        ApiService.defaults.headers.common['Authorization'] = `Token ${token}`
        return true;
    } catch (error) {
        return false;
    }
}

export function isAuthenticated(){
    const token = localStorage.getItem('token');
    return !!token;
}

export async function logout(){
    try {
        const response = await ApiService.post('logout/');

        if(response.status == 204){
            localStorage.removeItem('token');
            delete ApiService.defaults.headers.common['Authorization'];
            window.location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}