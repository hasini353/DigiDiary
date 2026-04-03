import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDZadYJs7tAaLkfvR0GiHA-rfmgjlrnZts",
  authDomain: "digidiary-93cb0.firebaseapp.com",
  projectId: "digidiary-93cb0",
  storageBucket: "digidiary-93cb0.firebasestorage.app",
  messagingSenderId: "659739445568",
  appId: "1:659739445568:web:451f97870707bb00a012a5"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
