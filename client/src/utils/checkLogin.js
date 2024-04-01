// import { useNavigate } from "react-router-dom";

export const checkLogin = () => {

    const token = localStorage.getItem('token');
    console.log(token)
  
    if (token) {
        // Add auth header for subsequent requests
        // return { 'Authorization': `Bearer ${token}` }; 
        return true
    } else {
        // Handle unauthorized state (e.g., redirect to login)
        window.location.href = '/login';
    }
}