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
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        // transform: 'translate(12px, 0)',
      }}
    >
      <input
        className="input-box"
        type={inputType}
        placeholder={props.placeholder}
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
