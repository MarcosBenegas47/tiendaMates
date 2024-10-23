import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDN1RqXRZQ55zelOxqgouUztgREWOHM1uE",
//   authDomain: "dbmates-99f12.firebaseapp.com",
//   databaseURL: "https://dbmates-99f12-default-rtdb.firebaseio.com",
//   projectId: "dbmates-99f12",
//   storageBucket: "dbmates-99f12.appspot.com",
//   messagingSenderId: "993563755736",
//   appId: "1:993563755736:web:28c31aa334a603c11203ad"
// };
const firebaseConfig = {
  apiKey: process.env.API_KEY ,
  authDomain:  process.env.AUTH_DOMAIN ,
  databaseURL: process.env.DATA_BASE_URL,
  projectId: process.env.PROJECT_ID ,
  storageBucket:  process.env.STORAGE_BUCKET,
  messagingSenderId:process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID 
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

 export default app;

