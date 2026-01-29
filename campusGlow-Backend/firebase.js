const admin = require ("firebase-admin")
const serviceAccount = require ("./serviceAccountKey.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "YOUR_PROJECT.appspot.com"
});
const db = admin.firestore();
module.exports = { db }