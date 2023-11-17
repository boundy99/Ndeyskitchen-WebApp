import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutNavbar from '../components/Checkout/CheckoutNavbar.jsx';
import Information from '../components/Checkout/Information.jsx';
import Service from '../components/Checkout/Service.jsx';
import Payment from '../components/Checkout/Payment.jsx';
import useCartSizeContext from '../hooks/useCartSizeContext.js';
import useAuthContext from '../hooks/useAuthContext';
import useFetchedUserData from '../hooks/useFetchedUserData';

export default function Checkout() {
  const navigate = useNavigate();
  const { dispatch } = useCartSizeContext();

  const { user } = useAuthContext();
  const { userInformation, isLoading } = useFetchedUserData();

  const [service, setService] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [total, setTotal] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [datesAndTimes, setDatesAndTimes] = useState({
    nonCake: { selectedDate: '', selectedTime: '' },
    cake: { selectedDate: '', selectedTime: '' },
  });

  const [userData, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    number: '',
    residence: '',
  });

  function handleUserInfoCollection(updatedData) {
    setUser({
      ...userData,
      ...updatedData,
    });
  }

  function handleServiceCollection(id) {
    setService(id);
  }

  function handlePaymentMethodCollection(id) {
    setPaymentMethod(id);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cart = JSON.parse(localStorage.getItem('cart'));
    const { selectedDate: selectedCakeDate, selectedTime: selectedCakeTime } =
      JSON.parse(localStorage.getItem('cake-date-and-time'));

    const {
      selectedDate: selectedNonCakeDate,
      selectedTime: selectedNonCakeTime,
    } = JSON.parse(localStorage.getItem('non-cake-date-and-time'));

    setTotal(JSON.parse(localStorage.getItem('total-price')));
    setDatesAndTimes({
      nonCake: {
        selectedDate: selectedNonCakeDate,
        selectedTime: selectedNonCakeTime,
      },
      cake: { selectedDate: selectedCakeDate, selectedTime: selectedCakeTime },
    });

    let id;

    const information = {
      id: id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      countryCode: userData.countryCode,
      number: userData.number,
      residence: userData.residence,
      service,
      paymentMethod,
      items: cart,
      total,
      datesAndTimes,
    };

    if (user && userInformation) {
      information.id = userInformation.id;
    }

    async function onSubmit() {
      const response = await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({ information }),
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.Message);
        return;
      }

      setIsButtonClicked(true);
      localStorage.removeItem('cart');
      localStorage.removeItem('total-price');
      localStorage.removeItem('cake-date-and-time');
      localStorage.removeItem('non-cake-date-and-time');
      dispatch({ type: 'SET_CART_SIZE', payload: '0' });
      navigate('/');
    }

    onSubmit();
  }

  return (
    <div className="checkout-page-container">
      <CheckoutNavbar />
      <form className="checkout-content-container">
        <p className="checkout-header">Checkout</p>
        <Information
          user={user}
          userInformation={userInformation}
          isLoading={isLoading}
          onFormChange={handleUserInfoCollection}
        />
        <span className="divider"></span>
        <Service onButtonClick={handleServiceCollection} />
        <span className="divider"></span>
        <Payment onButtonClick={handlePaymentMethodCollection} />
        <span className="divider"></span>
        <button
          className={!isButtonClicked ? 'place-order' : 'order-placed'}
          disabled={isButtonClicked}
          onClick={event => handleSubmit(event)}
        >
          {!isButtonClicked ? (
            'Place order'
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Order placed
              <span className="material-symbols-outlined">done</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
}
