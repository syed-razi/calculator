import { useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function SignUp() {
  const [showModal, setShowModal] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (showSignUp) {
      createUserWithEmailAndPassword(auth, email, password).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    } else {
      signInWithEmailAndPassword(auth, email, password).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    }
  }

  return (
    <>
      <button
        className="mx-4 rounded-2xl bg-cyan-500 px-8 py-2 text-sm text-white shadow-md shadow-blue-500/50 outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Sign In
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative flex w-72 min-w-max flex-initial flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:w-96">
              <button
                className="background-transparent mb-1 mr-1 self-end px-2 py-2 text-sm font-bold text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
              <h3 className="w-full border-b border-solid border-slate-200 px-5 pb-2 text-center text-3xl font-semibold">
                {showSignUp ? "Sign Up" : "Login"}
              </h3>
              <form
                onSubmit={handleSubmit}
                className="relative flex-auto px-6 py-3"
              >
                <label htmlFor="email" className="block">
                  <span className="my-1 block text-lg leading-relaxed text-slate-500 after:ml-0.5 after:text-red-500 after:content-['*']">
                    Email
                  </span>
                  <input
                    type="email"
                    className="shadow-s mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500  sm:text-sm"
                    placeholder="you@example.com"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label htmlFor="password" className="block">
                  <span className="my-1 block text-lg leading-relaxed text-slate-500 after:ml-0.5 after:text-red-500 after:content-['*']">
                    Password
                  </span>
                  <input
                    id="password"
                    type="password"
                    className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                {showSignUp && (
                  <label htmlFor="passwordConfirm" className="block">
                    <span className="my-1 block text-lg leading-relaxed text-slate-500 after:ml-0.5 after:text-red-500 after:content-['*']">
                      Re-enter Password
                    </span>
                    <input
                      id="passwordConfirm"
                      type="password"
                      className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                  </label>
                )}
                <button
                  type="submit"
                  className="mt-5 block w-full rounded-xl bg-blue-500 py-2 text-white shadow shadow-blue-500/50 outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                >
                  {showSignUp ? "Sign Up" : "Login"}
                </button>
              </form>
              <h2 className="mt-2 text-center">
                {showSignUp ? "Already" : "Not"} signed up?
              </h2>
              <button
                onClick={() => setShowSignUp(!showSignUp)}
                className="mx-auto block text-blue-400 underline active:text-blue-600"
              >
                {showSignUp ? "Login" : "Sign Up"}
              </button>
              <button
                className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
