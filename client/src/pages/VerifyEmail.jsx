import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

export default function VerifyEmail() {
  const { userToken } = useParams();
  const navigate = useNavigate();

  const [hasExpired, setHasExpired] = useState(false);

  async function validateEmail() {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ userToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setHasExpired(true);
      console.log(json.Message);
    }
    if (response.ok) {
      navigate('/login');
    }
  }

  useEffect(() => {
    validateEmail();
  }, []);
  return hasExpired ? (
    <div className="link-expired">
      <p>This link has expired.</p>
      <p>
        To get another link <a href="/signup">signup again</a>.
      </p>
    </div>
  ) : (
    <Loader />
  );
}
