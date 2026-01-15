import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuration Firebase
// IMPORTANT: Remplacez ces valeurs par vos propres clés Firebase
// Pour obtenir votre configuration:
// 1. Allez sur https://console.firebase.google.com/
// 2. Créez un nouveau projet (ou sélectionnez un projet existant)
// 3. Cliquez sur "Ajouter une application" > Web
// 4. Copiez la configuration qui s'affiche

const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJECT_ID.firebaseapp.com",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_PROJECT_ID.appspot.com",
  messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
  appId: "VOTRE_APP_ID"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);

// Initialisation des services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
