const InputForm = () => {
    return(
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
    );
};
export default InputForm;
