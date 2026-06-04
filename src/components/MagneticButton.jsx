import React, { useRef } from 'react';

const MagneticButton = ({ children, onClick, className }) => {
  const ref = useRef(null);
  return (
    <div className="relative inline-block group">
      <button ref={ref} onClick={onClick} className={`${className} transition-transform duration-200 active:scale-95`}>
        {children}
      </button>
    </div>
  );
};

export default MagneticButton;
