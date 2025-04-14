import "../styles/adminform.css";
function AdminPage() {
    return (
      <section className="admin-holderContainer">
        <h2 className="admin-form-header">Admin Form</h2>
        <form action="#" className="admin-form">
          <section className="admin-input-wrapper">
              <input type="text" placeholder="Department" className="inputField" required/>
          
          </section>
          <section className="admin-input-wrapper">
              <input type="text" placeholder="Current Academic Roles" className="inputField" required/>
          </section>
          <button className="signupButton">Sign Up</button>
        </form>
      </section>
    );
  }
  export default AdminPage;