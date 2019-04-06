import axios from "axios";

export default axios.create( {
    baseURL: "http://localhost:3300/api",
    timeout: 2000,
    headers: { Authentication: localStorage.getItem( "auth-token" ) }
} );