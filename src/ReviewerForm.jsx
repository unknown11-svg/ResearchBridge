import "./ReviewerFormCSS.css";
function ReviewerForm() {
    return (
      <section className="reviewer-holderContainer">
        <h2 className="reviewer-form-header">Reviewer Form</h2>
        <form action="#" className="reviewer-form">
          <section className="reviewer-input-wrapper">
              <input type="text" placeholder="Department" className="inputField" required/>
          
          </section>
          <section className="reviewer-input-wrapper">
              <input type="text" placeholder="Current Academic Roles" className="inputField" required/>
          </section>
          <section className="reviewer-input-wrapper">
              <input type="text" placeholder="Current Research Area" className="inputField" required/>
          
          </section>
          <section className="reviewer-input-wrapper">
              <input type="text" placeholder="Researcher Experience" className="inputField" required/>
          
          </section>
          <button className="signupButton">Sign Up</button>
        </form>
      </section>
    );
  }
  export default ReviewerForm;