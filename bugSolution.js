// bugSolution.js

// Import the Firebase library
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get } from "firebase/database";

// ... (Your Firebase configuration)

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const starCountRef = ref(db, 'stars');

// Improved error handling
try {
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log('Data:', data);
  }, {
    once: true
  });
} catch (error) {
  if (error.code === 'database/offline') {
    console.error('Firebase Offline: Attempting to re-connect');
    // Implement retry logic or inform the user gracefully
  } else {
    console.error('Firebase Error:', error);
  }
}

// Verify network connectivity specifically to Firebase servers
async function checkFirebaseConnectivity() {
  try {
    const snapshot = await get(starCountRef); // Make a test connection to Firebase
    console.log('Firebase server is reachable');
  } catch (error) {
    console.error('Firebase server is unreachable:', error);
  }
}