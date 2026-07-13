import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Replace these with your Firebase Project config
// 1. Go to Firebase Console -> Project Settings -> General
// 2. Add a Web App
// 3. Copy the config here
const firebaseConfig = {
  apiKey: "AIzaSyB3Xp-xS471n7L5QolLq9niB3vT0MCD83o",
  authDomain: "growbroo.firebaseapp.com",
  projectId: "growbroo",
  storageBucket: "growbroo.firebasestorage.app",
  messagingSenderId: "525953377137",
  appId: "1:525953377137:web:c9a3cf2f7f9fba97004cd0"
};

export const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = typeof window !== 'undefined' && 'serviceWorker' in navigator ? getMessaging(app) : null;

export const requestFirebaseNotificationPermission = async () => {
  try {
    if (!messaging) return null;

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'BDEu3_VotRjDSIdP4ft_5EKkPLRMioZv8zF6d8odLUElk7wSw6YKkWvlM_R_WT87tCE03VjRW5b2WQUWZdoz57k'
      });
      return token;
    }
    return null;
  } catch (error) {
    console.error("Firebase Messaging Error:", error);
    return null;
  }
};
