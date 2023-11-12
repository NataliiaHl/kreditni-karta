import './style.css'
import React, { useRef, useEffect } from 'react';

export default function CardInput() {

  const inputRefs = Array.from({ length: 4 }, () => useRef(null));


  useEffect(() => {
    const handleInput = (index) => {
      return (e) => {
        const input = e.target;
        if (input.value.length === 4) {
          const nextIndex = index + 1;
          if (nextIndex < inputRefs.length) {
            inputRefs[nextIndex].current.focus();
          }
        }
      };
    };

    inputRefs.forEach((ref, index) => {
      if (index < inputRefs.length - 1) {
        ref.current.addEventListener('input', handleInput(index));
      }
    });

    return () => {
      inputRefs.forEach((ref, index) => {
        if (index < inputRefs.length - 1) {
          ref.current.removeEventListener('input', handleInput(index));
        }
      });
    };
  }, [inputRefs]);


  return (
    <div className='container'>
      <p>Please enter your payment card</p>
      <div className="card-container">
        {inputRefs.map((ref, index) => (
          <div key={index}>
            <input
              key={index}
              ref={ref}
              type="text"
              maxLength={4}
              className='card-part'
            />
            {index < inputRefs.length - 1 && (
              <span className="separator">-</span>
            )}
          </div>
          ))}
        </div>
    </div>
  );
}

