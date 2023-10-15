import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function VerifyEmail() {
  const { userToken } = useParams();

  console.log(userToken);

  async function validateEmail() {
    const response = await fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.stringify({ verificationToken: userToken }),
      },
    });

    if (!response.ok) console.log('Smh ');
    if (response.ok) console.log('Yess');
  }

  useEffect(() => {
    validateEmail();
  }, []);
  return <div>Your email is being verified</div>;
}