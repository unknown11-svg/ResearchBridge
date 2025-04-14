const SignupForm = () => {
    return(
    <form action="#" className="signup-form">
        <section className="signup-input-wrapper">
        <i class="fa-solid fa-user"></i><input type="text" placeholder="Full Name" className="inputField" required/>   
        </section>
        <section className="signup-input-wrapper">
          <i class="fa-solid fa-at"></i> <input type="email" placeholder="Email" className="inputField" required/>

        </section>
        <section className="signup-input-wrapper">
          <i class="fa-solid fa-phone"></i> <input type="text" placeholder="Contact No." className="inputField" required/>
        </section>

        <section className="signup-input-wrapper">
          <i class="fa-solid fa-lock"></i> <input type="password" className="inputField" placeholder="Password" required/>
        </section>
        <section className="signup-input-wrapper">
          <i class="fa-solid fa-lock"></i> <input type="password" className="inputField" placeholder="Confirm Password" required/>
        </section>

    
        <button className="NextButton">Next</button>

      </form>)
}
export default SignupForm;