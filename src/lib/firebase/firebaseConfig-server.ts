import { getApps, initializeApp } from "firebase/app";
const firebaseConfigServer = {
  apiKey: process.env.API_KEY ,
  authDomain: process.env.AUTH_DOMAIN ,
  databaseURL: process.env.DATA_BASE_URL,
  projectId: process.env.PROJECT_ID ,
  storageBucket:  process.env.STORAGE_BUCKET,
  messagingSenderId:process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID 
};
 
// Initialize Firebase
const clientApp= getApps().length ===0 ? initializeApp(firebaseConfigServer): getApps()[0];

export default clientApp;

