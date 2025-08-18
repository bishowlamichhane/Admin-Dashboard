import * as functions from "firebase-functions";
import ImageKit from "imagekit";
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // keep secret
    urlEndpoint: "https://ik.imagekit.io/bishoECOM"
});

exports.imagekitAuth = functions.https.onRequest((req, res) => {
    res.set("Access-Control-Allow-Origin", "*"); // allow frontend
    res.send(imagekit.getAuthenticationParameters());
});
