import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, updateDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
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

// const profile_img=document.getElementById("profile-img")


// const uploadFiles=(file)=>{

// return new Promise((resolve, reject) => {

//   const storageRef = ref(storage, `images/${file.name}`);
//   const uploadTask = uploadBytesResumable(storageRef, file);


//   uploadTask.on('state_changed', 
//     (snapshot) => {


//       switch (snapshot.state) {
//         case 'paused':
//           hideloder()
//           break;
//         case 'running':
//           showloder()
//           break;
//       }
//     }, 
//     (error) => {
//       hideloder()
//     reject(error)
//     }, 
//    async () => {
//       hideloder()
//     await  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         resolve (downloadURL);

//       });
//     },

//   );



// })




// }

// const fileInput = document.getElementById("file-inp");

// fileInput && fileInput.addEventListener("change", () => {
//     console.log(fileInput.files[0])
//     profile_img.src =  URL.createObjectURL(fileInput.files[0])
// })
// const updateProfile = document.getElementById("update-profile");

// updateProfile && updateProfile.addEventListener("click", async () => {
//   showloder()
//     let uid = localStorage.getItem("uid")
//     let fullName = document.getElementById("fullName")
//     let phone = document.getElementById("phone")
//     const imageUrl = await uploadFiles(fileInput.files[0])
//     console.log(imageUrl)
//     const firestoreRef = doc(db, "users", uid);
//     await updateDoc(firestoreRef, {
//         fullName: fullName.value,
//         phone: phone.value,
//         picture: imageUrl
//     });
//     hideloder()

// console.log("done")
// })





let loader = document.getElementById("loader")

let showloder = () => {
  loader.style.display = "block";
}

let hideloder = () => {
  loader.style.display = "none";
}



let signupBtn = document.getElementById("signUp");
signupBtn && signupBtn.addEventListener("click", async () => {

  let email = document.getElementById("user-email")
  let password = document.getElementById("password")
  let phone = document.getElementById("user-number")
  let user = document.getElementById("user-name")


  let userData = {
    user: user.value,
    phone: phone.value,
    email: email.value,
    password: password.value,
    // imageUrl:imageUrl.value
  }



  showloder() || createUserWithEmailAndPassword(auth, userData.email, userData.password)

    .then(async (userCredential) => {

      const user = userCredential.user;

      try {
        await setDoc(doc(db, "users", user.uid), {
          ...userData,
          uid: user.uid,



        });

        //  localStorage.setItem("userId",user.uid ,)
        location.href = "index.html"
        // console.log("Document written with ID: ", docRef.id);
        console.log("added")
      } catch (e) {
        console.error("Error adding document: ", e);
        sweetAlert("Oops...", error.message, "error");
      }
      hideloder()
    })
    .catch((error) => {
      hideloder()
      const errorMessage = error.message;
      sweetAlert("Oops...", error.message, "error");
    })

})


let loginBtn = document.getElementById("loginBtn")
loginBtn && loginBtn.addEventListener("click", () => {
  let email = document.getElementById("user-email")
  let password = document.getElementById("password")


  showloder() || signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {

      const user = userCredential.user;

      try {
        console.log("welcome to my website")
        localStorage.setItem("uid", user.uid)
        location.href = "blogs.html"

      } catch (err) {
        console.log(err)

      }

      // getUser(user.uid)
      hideloder()


    })
    .catch((error) => {
      hideloder()
      console.log("error.message", error.message)
      sweetAlert("Oops...", error.message, "error");
    });

})


const defaultImg = `images/user.png`



let getUser = async (uid) => {
  let fullName = document.getElementById("fullName");
  let phone = document.getElementById("phone");
  let email = document.getElementById("email");

  const docRef = await doc(db, "users", uid);
  console.log('docRef---',docRef)
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

    console.log("Document data:", docSnap.data().email);

    fullName.value = docSnap.data().user
    email.value = docSnap.data().email

    phone.value = docSnap.data().phone
    if (docSnap.data().picture) {

      profile_img.src = docSnap.data().picture
    }
    else {
      profile_img.src = defaultImg
    }
  }

  else {
    console.log("No such document!");
  }

}
getUser()

// onAuthStateChanged(auth, (user) => {
//   const uid = localStorage.getItem("uid")
//   if (user && uid) {

//       getUser(user.uid)
//       if (location.pathname !== '/profile.html'&& location.pathname !== '/chat.html') {
//           location.href = "profile.html"
//       }
//   } else {
//       if (location.pathname !== '/index.html' && location.pathname !== '/signup.html' ) {
//           location.href = "index.html"
//       }
//   }
// });


const logoutBtn = document.getElementById("logout-btn")

logoutBtn && logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    localStorage.clear()
    location.href = "index.html"
  }).catch((error) => {
    // An error happened.
  });

})














































// })
