import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const {
  REACT_APP_FB_API_KEY,
  REACT_APP_FB_AUTH_DOMAIN,
  REACT_APP_FB_DATABASE_URL,
  REACT_APP_FB_PROJECT_ID,
  REACT_APP_FB_STORAGE_BUCKET,
  REACT_APP_FB_MESSAGING_SENDER_ID,
  REACT_APP_FB_APP_ID
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FB_API_KEY,
  authDomain: REACT_APP_FB_AUTH_DOMAIN,
  databaseURL: REACT_APP_FB_DATABASE_URL,
  projectId: REACT_APP_FB_PROJECT_ID,
  storageBucket: REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: REACT_APP_FB_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

// Get a reference to the auth service
const auth = getAuth(app);

export { database, auth };
