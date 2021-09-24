// Provided by firebase.google.com
const firebaseConfig = {
  apiKey: "[###]",
  authDomain: "[URL]",
  projectId: "[NAME]",
  storageBucket: "[URL]",
  messagingSenderId: "[###]",
  appId: "[###]",
  measurementId: "[###]",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true,
});
