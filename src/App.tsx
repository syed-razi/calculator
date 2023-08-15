import { useEffect, useState } from "react";
import { auth } from "./firebase";

import Calculator from "./Calculator";
import Navbar from "./Navbar";

function App() {
  const [email, setEmail] = useState<string | null>("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log("User is signed in");
        setEmail(user.email);
        // ...
      } else {
        // User is signed out
        console.log("User is signed out");
        setEmail("");
      }
    });
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start">
      <Navbar email={email} auth={auth} />
      <Calculator />
    </div>
  );
}

export default App;
