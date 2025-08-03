// Configuración de Firebase (compatibilidad con HTML puro)
const firebaseConfig = {
  apiKey: "AIzaSyAHqZs-JDn86AY8NZ2mpUY_4n3-TfaQgVI",
  authDomain: "papeleriaf-9f0e2.firebaseapp.com",
  projectId: "papeleriaf-9f0e2",
  storageBucket: "papeleriaf-9f0e2.appspot.com",
  messagingSenderId: "654877673833",
  appId: "1:654877673833:web:101679a22ec915f50a95f8"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar Firestore
const db = firebase.firestore();
