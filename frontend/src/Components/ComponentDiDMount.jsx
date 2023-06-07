import firebase from '../firebase';

// ...

componentDidMount() {
  const messaging = firebase.messaging();
  messaging
    .requestPermission()
    .then(() => {
      console.log('Notification permission granted.');
      return messaging.getToken();
    })
    .then((token) => {
      console.log('FCM token:', token);
      // Send the token to your backend server and store it in MongoDB.
    })
    .catch((error) => {
      console.error('Error requesting permission:', error);
    });

  messaging.onMessage((payload) => {
    console.log('Received message:', payload);
    // Handle the received push notification.
  });
}
