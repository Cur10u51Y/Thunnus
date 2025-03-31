import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA6Nz4MoB0Z0klFeSgr3DKjD3TiWJOy-xM",
  authDomain: "fkp-atun.firebaseapp.com",
  projectId: "fkp-atun",
  storageBucket: "fkp-atun.firebasestorage.app",
  messagingSenderId: "689285075914",
  appId: "1:689285075914:web:4a71dca23de3c45520b533"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
