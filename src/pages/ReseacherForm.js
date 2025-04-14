import  "../styles/researcherform.css";
function ResearcherPage() {
  return (
    <section className="researcher-holderContainer">
      <h2 className="researcher-form-header">Researcher Form</h2>
      <form action="#" className="researcher-form">
        <section className="researcher-input-wrapper">
            <input type="text" placeholder="Department" className="inputField" required/>
        
        </section>
        <section className="researcher-input-wrapper">
            <input type="text" placeholder="Current Academic Roles" className="inputField" required/>
        </section>
        <section className="researcher-input-wrapper">
            <input type="text" placeholder="Current Research Area" className="inputField" required/>
        
        </section>
        <section className="researcher-input-wrapper">
            <input type="text" placeholder="Researcher Experience" className="inputField" required/>
        
        </section>
        <button className="signupButton">Sign Up</button>
      </form>
    </section>
  );
}
export default ResearcherPage;