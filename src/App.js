import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  
  return (
    <GoogleOAuthProvider clientId="702984125850-bl8l4jc151iqd94jcuahrkqa6u3lh5ho.apps.googleusercontent.com">
      <>
      <section className="login-holderContainer">
        <h2 className="login-form-header">Login</h2>
        <form action="#" className="login-form">
                  <section className="login-input-wrapper">
                    <i class="fa-solid fa-at"></i> <input type="email" placeholder="Email" className="inputField" required/>
        
                  </section>
                  <section className="login-input-wrapper">
                    <i class="fa-solid fa-lock"></i> <input type="password" className="inputField" placeholder="Password" required/>
                  </section>
                  {/* <a href="#" className="forgot-password">Forgot Password?</a> */}
                  <button className="loginButton">Log In</button>
        
                </form>

        <p className="signup-suggestion">
          Don't have an account? <a href="#">Sign-up Here</a>
        </p>

        <p className="split"><span>or</span></p>
        <section className = "third-party-login">
          <button className = "third-party"> Login with Google    <i class="fa-brands fa-google" id="google"></i></button><br/>
          {/* <button className = "third-party">Login with Apple   <i class="fa-brands fa-apple" id="apple"></i></button><br/>
          <button className = "third-party">Login with Facebook   <i class="fa-brands fa-facebook" id="facebook"></i></button><br/> */}
        </section>
        <p><span></span></p>
      </section>
    </>
    </GoogleOAuthProvider>
  );
}

export default App;

