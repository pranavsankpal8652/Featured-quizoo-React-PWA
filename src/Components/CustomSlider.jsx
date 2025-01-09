import React, { useState, useRef } from "react";
import { BiSolidRightArrowSquare } from "react-icons/bi";
import { BiSolidLeftArrowSquare } from "react-icons/bi";


const CustomSlider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const nextSlide = () => {
    if (currentIndex < children.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
    <div className="relative w-full overflow-hidden">
      {/* Slider Wrapper */}
      <div
        className="flex transition-transform duration-1000"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="min-w-full flex-shrink-0"
          >
            {child}
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      
    </div>
    <button
        className={`absolute left-[17%] lg:top-1/2  transform -translate-y-1/2 text-green-500 text-[3rem]    rounded ${
          currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
      <BiSolidLeftArrowSquare />

      </button>

      {/* Right Arrow */}
      <button
        className={`absolute right-[17%] lg:top-1/2 transform -translate-y-1/2 text-green-500 text-[3rem] rounded ${
          currentIndex === children.length - 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={nextSlide}
        disabled={currentIndex === children.length - 1}
      >
        <BiSolidRightArrowSquare />

      </button>
    
    </>
    
  );
};

export default CustomSlider;
