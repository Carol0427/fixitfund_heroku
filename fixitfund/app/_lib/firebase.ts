import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import dotenv from "dotenv";
import path from "path"
dotenv.config({ path: path.resolve(__dirname, '..', '..' + '/.env') });

// Your web app's Firebase configuration
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

if(firebaseConfig === undefined){
    console.error("Firebase Config undefined, please check .env file");
}

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;
