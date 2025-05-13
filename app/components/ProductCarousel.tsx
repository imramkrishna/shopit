'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Banner data array
const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    heading: "Summer Collection 2023",
    description: "Discover our exclusive summer products with up to 40% discount",
    url: "/category/summer"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    heading: "Fashion Week Specials",
    description: "Latest trends from top designers at unbeatable prices",
    url: "/category/fashion"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    heading: "Tech Gadgets Sale",
    description: "Upgrade your tech with our premium selection of gadgets",
    url: "/category/electronics"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    heading: "Home & Decor",
    description: "Transform your space with our stylish home accessories",
    url: "/category/home"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    heading: "Accessories Collection",
    description: "Complete your look with our premium accessories",
    url: "/category/accessories"
  }
];

const ProductCarousel = () => {
  const router = useRouter();
  const [currentBanner, setCurrentBanner] = useState(0);
  
  // Randomly select a banner on initial load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * banners.length);
    setCurrentBanner(randomIndex);
  }, []);
  
  // Set up the interval for banner rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 3000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);
  
  const handleBannerClick = () => {
    router.push(banners[currentBanner].url);
  };

  return (
    <div 
      className="w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden my-6 cursor-pointer relative"
      onClick={handleBannerClick}
    >
      {/* Banner Image with transition */}
      {banners.map((banner, index) => (
        <div 
          key={banner.id}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === currentBanner ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ backgroundImage: `url('${banner.image}')` }}
        >
          {/* Overlay with gradient for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
            <div className="flex flex-col justify-center h-full text-white p-8 sm:p-12 max-w-lg">
              <h2 className="text-2xl sm:text-4xl font-bold mb-4">{banner.heading}</h2>
              <p className="text-sm sm:text-base mb-6">{banner.description}</p>
              <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-full w-fit transition-all">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Indicator dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentBanner(index);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentBanner 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
