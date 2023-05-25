import PasswordInput from '../components/PasswordInput';
import Image from '../components/Image';
export default function Signup() {
  return (
    <div className="singup-container">
      <form className="signup-form">
        <p className="signup-form-header">
          <strong>Signup</strong>
        </p>

        <input className="input-box" id="first-name" placeholder="First Name" />
        <input className="input-box" type="email" placeholder="Last Name" />
        <input className="input-box" type="email" placeholder="Email" />
        <PasswordInput placeholder="Password" />
        <PasswordInput placeholder="Confirm Password" />

        <button type="submit" className="form-btn">
          Signup
        </button>
        <p className="form-link">
          Already have an account? <a href="/Login">Login here</a>
        </p>
      </form>

      <button type="submit" className="signup-with-btn">
        Signup with
        <Image className="logos" src={'google.png'} alt="google-logo" />
      </button>
    </div>
  );
}
