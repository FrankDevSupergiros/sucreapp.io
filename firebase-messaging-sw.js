importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js");
firebase.initializeApp({
    apiKey: "AIzaSyCoOPL0aUJfNKPBxLMWYgZVmWJ3Dm-Q6ME",
    authDomain: "sucreapp-c730e.firebaseapp.com",
    projectId: "sucreapp-c730e",
    storageBucket: "sucreapp-c730e.appspot.com",
    messagingSenderId: "133912002119",
    appId: "1:133912002119:web:332ce482a96f3fc2847b62",
    measurementId: "G-5VETRLG6RM"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("New Message");
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});