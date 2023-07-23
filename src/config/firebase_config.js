const env = require("dotenv");
env.config({path: "../config.env"})

exports.FirebaseConfig = {
    "type": process.env.TYPE,
    "project_id": process.env.PRJECT_ID,
    "private_key_id": process.env.PRIVET_KEY_ID,
    "private_key": process.env.PRIVET_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_x509_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_x509_CERT_URL,
    "universe_domain": process.env.UNIVERSE_DDMAIN,
    storageBucket: process.env.Storage_Bucket,
}