import SignupForm  from "./Components/SignupForm";
import GoogleSignUp from "./Components/GoogleSignUp";
import './SignUp.css';

function SignUp(){

  return (
    <>
        <section className = "signup-holderContainer">
            <h2 className = "signup-form-header">Sign Up</h2>
            <SignupForm />
            <p className="split"><span>or</span></p>
            <GoogleSignUp />
        </section>
    </>
  )
}
export default SignUp