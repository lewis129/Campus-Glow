const admin = require("firebase-admin")
const serviceAccount =require("./serviceAccountKey.json")

//initialize firbase admin sdk
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id
})

//replace with your firebase Auth UID
const uid = "KheBcT2orceHkNVdsnLhRHRytPl1"
async function setAdmin(){
    try{
        await admin.auth().setCustomUserClaims(uid, {admin: true});
        console.log(`admin claimset for user ${uid}`)
    }catch(err){
        console.error("Error setting admin claim:", err)
    }
}
setAdmin()