if (process.env.DATABASE) {
    module.exports = {
        database: process.env.DATABASE,
        appSecret: process.env.APPSECRET,
    }
} else {
    console.log('Missing database keys (src/config/keys.js)')
}