// // import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// // import { auth, db } from "./firebase";
// // import { toast } from "react-toastify";
// // import { setDoc, doc } from "firebase/firestore";
// // import googleLogo from "./google.png"; // Import the image at the top

// // function SignInWithGoogle() {
// //   async function googleLogin() {
// //     try {
// //       const provider = new GoogleAuthProvider();
// //       const result = await signInWithPopup(auth, provider);
// //       const user = result.user;
// //       if (user) {
// //         await setDoc(doc(db, "Users", user.uid), {
// //           email: user.email,
// //           firstName: user.displayName,
// //           photo: user.photoURL,
// //           lastName: "",
// //         });
// //         toast.success("User logged in Successfully", {
// //           position: "top-center",
// //         });
// //         window.location.href = "/profile";
// //       }
// //     } catch (error) {
// //       console.error("Error logging in with Google:", error);
// //       toast.error("Failed to log in with Google");
// //     }
// //   }

// //   return (
// //     <div>
// //       <p className="continue-p">--Or continue with--</p>
// //       <div
// //         style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
// //         onClick={googleLogin}
// //       >
// //         <img src={googleLogo} width={"60%"} alt="Google logo" /> {/* Added alt attribute */}
// //       </div>
// //     </div>
// //   );
// // }

// // export default SignInWithGoogle;


// import React from 'react';
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth, db } from "./firebase";
// import { toast } from "react-toastify";
// import { setDoc, doc } from "firebase/firestore";
// import googleLogo from "./google.png";

// function SignInWithGoogle() {
//   async function googleLogin() {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       if (user) {
//         await setDoc(doc(db, "Users", user.uid), {
//           email: user.email,
//           firstName: user.displayName,
//           photo: user.photoURL,
//           lastName: "",
//         });
//         toast.success("User logged in Successfully", {
//           position: "top-center",
//         });
//         window.location.href = "/profile";
//       }
//     } catch (error) {
//       console.error("Error logging in with Google:", error);
//       toast.error("Failed to log in with Google");
//     }
//   }

//   return (
//     <div>
//       <p className="continue-p">--Or continue with--</p>
//       <div
//         style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
//         onClick={googleLogin}
//       >
//         <img src={googleLogo} width={"60%"} alt="Google logo" />
       
//       </div>
//     </div>
//   );
// }

// export default SignInWithGoogle;

import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import googleLogo from "./google.png";
import './SignInWithGoogle.css'; // Make sure to import the CSS file

function SignInWithGoogle() {
  async function googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        window.location.href = "/profile";
      }
    } catch (error) {
      console.error("Error logging in with Google:", error);
      toast.error("Failed to log in with Google");
    }
  }

  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div className="google-login" onClick={googleLogin}>
        <img src={googleLogo} className="google-logo" alt="Google logo" />
      </div>
    </div>
  );
}

export default SignInWithGoogle;
