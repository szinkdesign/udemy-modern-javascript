// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCUH7L3nC34AQ_2MECtB5LEB9t4pzV7I2g",
  authDomain: "udemy-modern-javascript-9ae78.firebaseapp.com",
  projectId: "udemy-modern-javascript-9ae78",
  storageBucket: "udemy-modern-javascript-9ae78.appspot.com",
  messagingSenderId: "309593545137",
  appId: "1:309593545137:web:cf72bc7aef301491440590"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function getRecipes() {
  const recipesCol = collection(db, "recipes");
  const recipeSnapshot = await getDocs(recipesCol);
  return recipeSnapshot.docs.forEach((doc) => {
    addRecipe(doc.data());
  });
}
 
getRecipes();

const list = document.querySelector('ul');
const form = document.querySelector('form');

const addRecipe = recipe => {
   let time = recipe.created_at.toDate();
   let html = `
   <li>
   <div>${recipe.title}</div>
   <div>${time}</div>
   </li>
   `
 list.innerHTML += html;
}

// get documents
db.collection('recipes').get().then(snapshot => {
  snapshot.docs.forEach(doc => {
    addRecipe(doc.data());
  });
}).catch(err => {
  console.log(err);
});

// add documents
form.addEventListener('submit', e => {
  e.preventDefault();
  const now = new Date();
  const recipe = {
    title: form.recipe.value,
    created_at: firebase.firestore.Timestamp.fromDate(now)
  };
  db.collection('recipes').add(recipe).then(() => {
    console.log('recipe added');

  }).catch(err => {
    console.log(err);
  });
});

