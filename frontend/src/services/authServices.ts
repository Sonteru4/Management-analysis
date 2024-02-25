import axios from 'axios'
import { ENV } from '../env/environment';
// AUTH SERVICES
export const loginUser = async(loginData:any)=>{
    try {
        // Make a POST request to the login API endpoint
        const response = await axios.post(`${ENV}/login`, loginData);
    
        console.log("RESPONSE.DATA : ",response.data);
        const { token, loginStatus } = response.data;
        if (loginStatus) {
          // Assuming you have a cookie library or a function to set cookies
          // Replace 'setCookieFunction' with the actual function you are using
          setCookieFunction('userToken', token, { path: '/' });
        }
    
        
        // Return the response data
        return response.data;
      } catch (error:any) {
        // Handle errors and return an error object
        return { error: error.response.data.error || 'Internal Server Error' };
      }
}

export const registerUser = async(registerData:any)=>{
    try {
        // Make a POST request to the register API endpoint
        const response = await axios.post(`${ENV}/register`, registerData)
        // Return the response data
        return response.data;
      } catch (error:any) {
        // Handle errors and return an error object
        return { error: error.response.data.error || 'Internal Server Error' };
      }


}

function setCookieFunction(name:any, value:any, options:any) {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  
    if (options.expires) {
      const expires = new Date();
      expires.setDate(expires.getDate() + options.expires);
      cookieString += `;expires=${expires.toUTCString()}`;
    }
  
    if (options.path) {
      cookieString += `;path=${options.path}`;
    }
  
    document.cookie = cookieString;
  }