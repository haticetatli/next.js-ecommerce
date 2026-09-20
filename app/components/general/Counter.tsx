"use client";
import React from "react";

interface CounterProps {
  cardProduct: { quantity: number };
  increaseFunc: () => void;
  decreaseFunc: () => void;
}

const Counter: React.FC<CounterProps> = ({
  cardProduct,
  increaseFunc,
  decreaseFunc,
}) => {
  return (
    <div className="flex items-center border border-gray-200 rounded-full bg-gray-50/70 p-1">
      <button
        type="button"
        onClick={decreaseFunc}
        className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700 hover:text-pink-600 font-bold transition cursor-pointer"
      >
        -
      </button>
      <span className="w-8 text-center text-xs font-bold text-gray-800">
        {cardProduct.quantity}
      </span>
      <button
        type="button"
        onClick={increaseFunc}
        className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700 hover:text-pink-600 font-bold transition cursor-pointer"
      >
        +
      </button>
    </div>
  );
};

export default Counter;
