export default function Login() {
  return (
    <div className="login">
      <form>
        <h1 className="form-header">Login</h1>
        <label className="form-label" htmlFor="email">
          Email
        </label>

        <input className="input-box" type="email" id="email" />

        <label className="form-label" htmlFor="password">
          Password
        </label>

        <input className="input-box" type="password" id="password" />

        <button className="form-btn">Login</button>
        <p className="form-link">
          Don't have an account? <a href="/">Signup here</a>
        </p>
      </form>
    </div>
  );
}
