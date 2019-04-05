const axios = require( "axios" );
const Users = require( "./auth-model" );

const bcrypt = require( "bcryptjs" );
const jwt = require( "jsonwebtoken" );

const jwtKey =
    process.env.JWT_SECRET ||
    "add a .env file to root of project with the JWT_SECRET variable";

const { authenticate } = require( "../auth/authenticate" );

module.exports = server => {
    server.post( "/api/register", register );
    server.post( "/api/login", login );
    server.get( "/api/jokes", authenticate, getJokes );
};

function register( req, res ) {
    let user = req.body;
    
    if ( !user || !user.username || !user.password ) {
        res.status( 400 ).json( {
            status: 400, message: "Please include a username" +
                " and password in your" +
                " request."
        } );
        return;
    }
    user.password = bcrypt.hashSync( user.password, 14 );
    
    Users.addUser( user ).then( ids => {
        if ( ids[ 0 ] ) {
            Users.getUser( ids[ 0 ] ).then( user => {
                res.status( 201 ).json( { user } );
            } ).catch( err => {
                res.status( 500 ).json( { message: err.message } );
            } );
        } else {
            res.status( 500 ).json( {
                message: "Something happened while trying to" +
                             " insert the user into the db."
            } );
        }
    } ).catch( err => {
        res.status( 500 ).json( { message: err.message } );
    } );
    
}

function login( req, res ) {
    const login = req.body;
    if ( !login.username || !login.password ) {
        res.status( 400 ).json( {
            message: "Please include the users username and" +
                         " password in your request."
        } );
        return;
    }
    
    Users.getUserByUsername( login.username ).then( user => {
        const samePassword = bcrypt.compareSync( login.password,
            user.password );
        
        if ( samePassword ) {
            const token = generateToken( user );
            if ( token ) {
                res.status( 200 ).json( { token } );
            }
        } else {
            res.status( 400 ).json( { message: "Invalid credentials" } );
        }
    } );
}

function generateToken( user ) {
    const payload = {
        username: user.username,
        password: user.password,
        id:       user.id,
    };
    // removed the const secret from this line <<<<<<<<<<<<<<<<<<<<<<<
    const options = {
        expiresIn: "1d",
    };
    
    return jwt.sign( payload, jwtKey, options ); // returns valid
    // token
}

function getJokes( req, res ) {
    const requestOptions = {
        headers: { accept: "application/json" },
    };
    
    axios.get( "https://icanhazdadjoke.com/search", requestOptions ).
        then( response => {
            res.status( 200 ).json( response.data.results );
        } ).
        catch( err => {
            res.status( 500 ).
                json( { message: "Error Fetching Jokes", error: err } );
        } );
}
