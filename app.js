import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBot7cgJDNDynaj7PhjIoi8CwT9ypWtncA",
  authDomain: "shreeejidb.firebaseapp.com",
  projectId: "shreeejidb",
  storageBucket: "shreeejidb.firebasestorage.app",
  messagingSenderId: "628120313770",
  appId: "1:628120313770:web:8e68b14e03f0ab299e55d3",
  measurementId: "G-GQLWWD6T7T"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form submission
const form = document.getElementById('volunteerForm');
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  const fullName = event.target.fullName.value;
  const email = event.target.email.value;
  const phone = event.target.phone.value;
  const message = event.target.message.value;

  // Use fullName as the document ID
  const customDocumentID = fullName.trim().replace(/\s+/g, "_"); // Sanitizing fullName to avoid issues with spaces

  // Ensure we have a valid fullName
  if (!fullName || fullName.trim().length === 0) {
    alert("Please provide a valid full name.");
    return;
  }

  try {
    // Save form data to Firestore with fullName as the document ID
    await setDoc(doc(db, "volunteerForms", customDocumentID), {
      fullName: fullName,
      email: email,
      phone: phone,
      message: message,
      timestamp: new Date()
    });

    alert('Form submitted successfully!');
  } catch (e) {
    console.error("Error adding document: ", e);
    alert('Error submitting form.');
  }
});
