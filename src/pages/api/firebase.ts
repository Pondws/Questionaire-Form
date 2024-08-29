import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC59CWrm4PkLd7w5iH0LaF5z_PDUnJhSms",
  authDomain: "foxbith-login.firebaseapp.com",
  projectId: "foxbith-login",
  storageBucket: "foxbith-login.appspot.com",
  messagingSenderId: "236582307001",
  appId: "1:236582307001:web:a9e7fa815b00d84e9f0768"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)
export default app