import SignUp from "./SignUp";

export default function Navbar({
  email,
  auth,
}: {
  email: string | null;
  auth: any;
}) {
  return (
    <div className="flex h-16 w-screen items-center justify-end border-b shadow-md">
      {email ? (
        <>
          <p>{`Welcome back ${email}!`}</p>
          <button
            className="mx-4 rounded-2xl bg-blue-500 px-8 py-2 text-sm text-white shadow-md shadow-blue-500/50 outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
            type="button"
            onClick={() => auth.signOut()}
          >
            Logout
          </button>
        </>
      ) : (
        <SignUp />
      )}
    </div>
  );
}
