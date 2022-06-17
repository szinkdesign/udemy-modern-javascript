import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCUH7L3nC34AQ_2MECtB5LEB9t4pzV7I2g",
    authDomain: "udemy-modern-javascript-9ae78.firebaseapp.com",
    projectId: "udemy-modern-javascript-9ae78",
    storageBucket: "udemy-modern-javascript-9ae78.appspot.com",
    messagingSenderId: "309593545137",
    appId: "1:309593545137:web:cf72bc7aef301491440590"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

const list = document.querySelector('ul');
const form = document.querySelector('form');

const addRecipe = (recipe) => {
  let time = recipe.created_at.toDate();
  let html = `
    <li>
      <div>${recipe.title}</div>
      <div><small>${time}</small></div>
    </li>
  `;

  list.innerHTML += html;
};

// get documents
db.collection('recipes').get().then(querySnapshot => {
  querySnapshot.forEach(doc => {
    addRecipe(doc.data());
  });
}).catch(err => {
  console.log(err);
});

// save documents
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



