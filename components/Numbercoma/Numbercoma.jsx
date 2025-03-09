import React from 'react';

const NumberWithCommas = ({ number }) => {
  // Function to format the number with commas
  const formatNumberWithCommas = (num) => {
    if (typeof num === 'string') {
      num = parseInt(num, 10);
    }
    return num?.toLocaleString();
  };

  return (
    <span>{formatNumberWithCommas(number)}</span>
  );
};

export default NumberWithCommas;
