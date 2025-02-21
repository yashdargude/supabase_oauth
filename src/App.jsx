import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "../supabaseClient";
import googleLogo from "./assets/Google.png"; // import the Google logo

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  // Company info details
  const companyName = "Dora";
  const tagline = `"Style Made Personal"`;
  const companyInfo = "";
  const companyQuote =
    "Innovation meets style. Empowering your look with technology.";
  const logoUrl =
    "https://media.licdn.com/dms/image/v2/D560BAQG8AsKcZdeeAA/company-logo_200_200/company-logo_200_200/0/1719845688167/doraagent_logo?e=1748476800&v=beta&t=PO9W0kH42YaeLk11JicIGcQ69wd4eFJUwhTpTt7aI50";

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-top">
          <img
            src={logoUrl}
            alt={`${companyName} Logo`}
            className="header-logo"
          />
          <h1 className="header-title">{companyName}</h1>
        </div>
        <p className="tagline">{tagline}</p>
      </header>

      <main className="card">
        {session ? (
          <>
            <h2>
              Welcome,{" "}
              {session.user.user_metadata.full_name
                ? session.user.user_metadata.full_name
                : ""}
              <br />
              {session.user.email}
            </h2>
            <p className="company-info">{companyInfo}</p>
            <p className="quote">"{companyQuote}"</p>
            <button onClick={signOut}>Sign out</button>
          </>
        ) : (
          <>
            <h2>Welcome to {companyName}</h2>
            <p className="company-info">{companyInfo}</p>
            <p className="quote">"{companyQuote}"</p>
            <button onClick={signInWithGoogle} className="google-btn">
              <img src={googleLogo} alt="Google Logo" className="google-logo" />
              Sign in with Google
            </button>
          </>
        )}
      </main>

      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} {companyName} IT Services. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
