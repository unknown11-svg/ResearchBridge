import GoogleLogin from "./Components/GoogleLogin";
import InputForm from "./Components/InputForm";

function Login(){

  return (
    <>
      <section className = "login-holderContainer">
        <h2 className = "login-form-header">Login</h2>
        <InputForm />
        
  
        <p className="signup-suggestion">Don't have an account?<a href="#">Sign-up Here?</a></p>
        
        <p className="split"><span>or</span></p>
        <GoogleLogin />
        <p><span></span></p>
      </section>

    </>
  )
}
export default Login