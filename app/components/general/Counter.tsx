'use client';
import React from 'react';

const Counter: React.FC<CounterProps> = ({ cardProduct, increaseFunc, decreaseFunc }) => {

    const buttonStyle = "w-8 h-8 border flex items-center justify-center text-lg rounded-md"
  return (
    <div className="flex items-center gap-2">
      <div className={buttonStyle} onClick={decreaseFunc} className ="cursor-pointer px-2 py-1 bg-gray-200 rounded">-</div>
      <div className='text-lg md:text-xl'>{cardProduct.quantity}</div>
      <div className={buttonStyle} onClick={increaseFunc} className = "cursor-pointer px-2 py-1 bg-gray-200 rounded">+</div>
    </div>
  );
};

export default Counter;
