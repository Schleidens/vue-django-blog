import ApiService from "./ApiService";

// function to register and obtain token
export async function register(data){
    try {
        const response = await ApiService.post('register/', data);
        const token = response.data.token
        console.log(response.data.message);
        
        // set the token to local storage
        localStorage.setItem('token', token);
        //set the default Authorization header
        ApiService.defaults.headers.common['Authorization'] = `Token ${token}`

        return true;
    } catch (error) {
        console.log(error.response.data);
        return false;
    }
}

// function to log in obtain a token
export async function login(data){
    try {
        const response = await ApiService.post('login/', data);
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