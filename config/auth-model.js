const database = require( "../database/dbConfig" );

const addUser = user => {
    return database( "users" ).insert( user );
};

const getUser = id => {
    return database( "users" ).where( { id } ).first();
};

const getUserByUsername = username => {
    return database( "users" ).where( { username } ).first();
};

module.exports = {
    addUser,
    getUser,
    getUserByUsername
};