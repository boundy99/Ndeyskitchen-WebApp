import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PasswordInput from '../components/PasswordInput';
import Image from '../components/Image';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setPasswordConfirmation] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
      number,
    };

    if (password === confirmPassword) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.error);
        setError(json.error);
      }

      if (response.ok) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPasswordConfirmation('');
        setNumber('');
        setError(null);
        console.log('New user added successfully', json);
        navigate('/login');
      }
    }

    console.log('error');
  };

  return (
    <div className="singup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <p className="signup-form-header">
          <strong>Signup</strong>
        </p>

        <input
          className="input-box"
          type="text"
          placeholder="First name"
          onChange={event => setFirstName(event.target.value)}
          value={firstName}
          maxLength="30"
        />
        <input
          className="input-box"
          type="text"
          placeholder="Last name"
          onChange={event => setLastName(event.target.value)}
          value={lastName}
          maxLength="30"
        />
        <input
          className="input-box"
          type="email"
          placeholder="Email"
          onChange={event => setEmail(event.target.value)}
          value={email}
          maxLength="100"
        />
        <PasswordInput
          placeholder="Password"
          setValue={setPassword}
          value={password}
        />
        <PasswordInput
          placeholder="Confirm password"
          setValue={setPasswordConfirmation}
          value={confirmPassword}
        />
        <input
          className="input-box"
          type="tel"
          maxLength="10"
          placeholder="Phone number"
          onChange={event => setNumber(event.target.value)}
          value={number}
        />

        <button type="submit" className="form-btn">
          Signup
        </button>
        <p className="form-link">
          Already have an account? <a href="/Login">Login here</a>
        </p>
      </form>

      <button type="submit" className="signup-with-btn">
        Continue with
        <Image className="logos" src={'google.png'} alt="google-logo" />
      </button>
    </div>
  );
}
