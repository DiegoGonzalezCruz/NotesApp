require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI_LOCAL = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI_LOCAL


/* 
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI_LOCAL = process.env.MONGODB_URI_LOCAL 
*/

module.exports = {
    MONGODB_URI_LOCAL,
    PORT
}
