import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddressAndNumberUpdatePage() {
  const navigate = useNavigate('/');

  const [form, setForm] = useState({
    residence: '',
    number: '',
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: capitalizeFirstLetter(event.target.value),
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const user = localStorage.getItem('token');
    const userUpdateInfoToken = localStorage.getItem('userUpdateInfoToken');

    try {
      const response = await fetch('/api/users/update-address-and-number', {
        method: 'POST',
        body: JSON.stringify({
          form,
          user,
          userUpdateInfoToken,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.Message);
        return;
      }

      localStorage.removeItem('userUpdateInfoToken');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="adress-number-container">
      <div className="adress-number-form-container">
        <p className="welcome-message">Welcome to Ndeys's kitchen</p>
        <form className="adress-number-form" onSubmit={handleSubmit}>
          <p className="adress-number-form-header">
            <strong>Update Information</strong>
          </p>

          <label className="form-label" htmlFor="residence">
            Enter your address
          </label>

          <input
            className="input-box"
            type="text"
            id="residence"
            name="residence"
            maxLength="50"
            onChange={handleChange}
            required
          />

          <label className="form-label" htmlFor="number">
            Enter your number
          </label>

          <input
            className="input-box"
            type="tel"
            id="number"
            name="number"
            maxLength="20"
            onChange={handleChange}
            required
          />

          <button type="submit" className="form-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}