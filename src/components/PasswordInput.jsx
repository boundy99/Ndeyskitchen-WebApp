import { React, useState } from 'react';
export default function PasswordInput(props) {
  const [extension, setExtension] = useState('show.png');
  const [passwordImage, setpasswordImage] = useState(
    require('../images/' + extension)
  );
  const [inputType, setInputeType] = useState('password');
  function handleClick() {
    if (extension === 'show.png') {
      setExtension('hide.png');
      setpasswordImage(require('../images/hide.png'));
      setInputeType('text');
    } else {
      setpasswordImage(require('../images/show.png'));
      setInputeType('password');
      setExtension('show.png');
    }
  }

  function handleInputChange(event) {
    props.setValue(event.target.value);
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <input
        className="input-box"
        type={inputType}
        placeholder={props.placeholder}
        name={props.name}
        onChange={handleInputChange}
        value={props.value}
        maxLength="30"
      />
      <img
        className="hide-unhide"
        alt="image"
        src={passwordImage}
        onClick={handleClick}
      />
    </div>
  );
}
