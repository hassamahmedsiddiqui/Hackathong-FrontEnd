import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc,onSnapshot ,deleteDoc , setDoc, getDoc, updateDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1T6VVFGWiIt39xAs8SeHOQeefP8e5Nes",
  authDomain: "chatapp-b15e0.firebaseapp.com",
  projectId: "chatapp-b15e0",
  storageBucket: "chatapp-b15e0.appspot.com",
  messagingSenderId: "460443204169",
  appId: "1:460443204169:web:d2182b84e61264eed79d98",
  measurementId: "G-HWD8EKHNW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const storage = getStorage();
let title = document.getElementById('title') 
let text = document.getElementById('text')
// let psBtn = document.getElementsByClassName('psBtn')
let post = document.getElementById('post');
async function addData (){
    
    try {
        const docRef = await addDoc(collection(db, 'users'), {
            title: title.value,
            text :text.value,
        });
        
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    
}
post.addEventListener('click',addData)
let mainDiv = document.getElementById('mainDiv')
const getblogs = () => {
    onSnapshot(collection(db, "users"), (data) => {
      data.docChanges().forEach((change) => {
        console.log("change", change.doc.data());
        
        let data =  change.doc.data();
        console.log('data-->',data.text)
        mainDiv.innerHTML += `<div class="blog-sec ">
      <div class="card Blog text-center">
        <h2 class="card-header">
          ${ data.user}
          
        </h2>
        <div class="card-body">
          <h5 class="card-title"> <img  src="images/pic-3.png" alt="">${data.title}</h5>
          <span class="Email" id="Email">${data.email}</span>
          <p class="card-text">${data.text}</p>
          <a  onclick='deletePost('${change.doc.id}')' class="btn btn-danger">Delete</a>
          <a  href='#' class="btn btn-secondary">Edit</a>
        </div>
        
      </div>`
        
      });
    });
  };
  

  getblogs();

  function deletePost (id){
    console.log('id-->',id)

  }
  window.deletePost= deletePost();