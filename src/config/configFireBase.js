import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKftK9Ec3KLJPNGOIjyhFRmAU7WQZI4W4",
  authDomain: "fashion-shop-758e3.firebaseapp.com",
  projectId: "fashion-shop-758e3",
  storageBucket: "fashion-shop-758e3.appspot.com",
  messagingSenderId: "558858558909",
  appId: "1:558858558909:web:77f290e1654ba80cfd06d4",
  measurementId: "G-8LVEPW5G2J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export default storage
