import React, { useState } from 'react';

const ProductImage = ({ src, alt, colorClass }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`w-full aspect-[4/3] ${colorClass} rounded-2xl flex flex-col items-center justify-center text-white/40 border border-white/10 shadow-inner mb-6 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <span className="relative text-2xl font-black mb-1">🔥</span>
        <span className="relative text-[10px] font-black uppercase tracking-widest opacity-60">Eye-tahl Standard</span>
      </div>
    );
  }

  return (
    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-lg mb-6 relative group/img transition-all bg-black/40">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-750"
      />
    </div>
  );
};

export default ProductImage;
