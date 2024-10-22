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
  apiKey: process.env.NEXT_PUBLIC_API_KEY ,
  authDomain:  process.env.NEXT_PUBLIC_AUTH_DOMAIN ,
  databaseURL: process.env.NEXT_PUBLIC_DATA_BASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ,
  storageBucket:  process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId:process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID 
};
// console.log(API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID);


// Initialize Firebase
const app = initializeApp(firebaseConfig);

 export default app;

