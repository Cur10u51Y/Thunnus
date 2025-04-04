import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJp8maMtWNdeLrK0JcQ8Q-8JdIc07A69M",
  authDomain: "bancamiga-8549e.firebaseapp.com",
  projectId: "bancamiga-8549e",
  storageBucket: "bancamiga-8549e.firebasestorage.app",
  messagingSenderId: "907153786958",
  appId: "1:907153786958:web:8736e2175cd35ebef9db1f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
