import axios from "axios";

export default axios.create( {
    baseURL: "http://localhost:3300/api",
    timeout: 2000,
    headers: { authentication: localStorage.get( "auth-token" ) }
} );