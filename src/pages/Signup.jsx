export default function Signup() {
  return (
    <div className="singup-container">
      <form className="signup-form">
        <h1 className="signup-form-header">Signup</h1>

        <label className="form-label" htmlFor="first-name">
          First Name
        </label>

        <input className="input-box" type="email" id="first-name" />

        <label className="form-label" htmlFor="last-name">
          Last Name
        </label>

        <input className="input-box" type="email" id="last-name" />

        <label className="form-label" htmlFor="email">
          Email
        </label>

        <input className="input-box" type="email" id="email" />

        <label className="form-label" htmlFor="password">
          Password
        </label>

        <input className="input-box" type="password" id="password" />

        <label className="form-label" htmlFor="password-confirmation">
          Confirm Password
        </label>

        <input
          className="input-box"
          type="password"
          id="password-confirmation"
        />

        <button className="form-btn">Login</button>
        <p className="form-link">
          Already have an account? <a href="/Login">Login here</a>
        </p>
      </form>
    </div>
  );
}
