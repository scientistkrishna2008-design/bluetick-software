importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// TODO: Replace these with your Firebase Project config
firebase.initializeApp({
  apiKey: "AIzaSyB3Xp-xS471n7L5QolLq9niB3vT0MCD83o",
  authDomain: "growbroo.firebaseapp.com",
  projectId: "growbroo",
  storageBucket: "growbroo.firebasestorage.app",
  messagingSenderId: "525953377137",
  appId: "1:525953377137:web:c9a3cf2f7f9fba97004cd0"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico',
    badge: '/favicon.ico'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
