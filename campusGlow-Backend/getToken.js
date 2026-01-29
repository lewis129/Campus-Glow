const { initializeApp } = require ("firebase/app");
const { getAuth, signInWithEmailAndPassword } =require ("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyA9sErMpogvy9D9jFKrNi03y3uqHdBGaCQ",
  authDomain: "campusglowproducts.firebaseapp.com",
  projectId: "campusglowproducts",
  storageBucket: "campusglowproducts.firebasestorage.app",
  messagingSenderId: "977606362100",
  appId: "1:977606362100:web:311d2170313830fae9afa1",
  measurementId: "G-EC50BBZ5S3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function login() {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      "test@example.com",
      "password123"
    );
    const token = await userCredential.user.getIdToken();
    console.log("ID Token:", token);
  } catch (error) {
    console.error("Login error:", error.message);
  }
}

login();
