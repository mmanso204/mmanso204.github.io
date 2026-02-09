import { useState, useEffect, useRef } from "react";
import { slides } from './slideshowData.js';

const Slideshow = () => {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef(null);

  // Helper to detect video vs image
  const isVideo = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);

  // Handle video end event
  const handleEnded = () => {
    setCurrent(prev => (prev + 1) % slides.length);
  };

  // Auto-slide effect
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;


    if (isVideo(slides[current])) {
      // If current slide is video, wait until video ends or loop every 5 sec
      const video = videoRef.current;
      if (video) {
        // When video ends, move to next slide
        const video = document.getElementById("myVideo") as HTMLVideoElement;
        video.addEventListener("ended", handleEnded);

        return () => video.removeEventListener("ended", handleEnded);

      }
    } else {
      // If image, auto-advance every 5 seconds
      timer = setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [current, handleEnded]);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Slide */}
      {isVideo(slides[current]) ? (
        <video
          ref={videoRef}
          src={slides[current]}
          className="w-full min-h-75 object-cover rounded"
          autoPlay
          muted
          playsInline
        />
      ) : (
        <img
          src={slides[current]}
          alt={`Slide ${current + 1}`}
          className="w-full min-h-75 object-cover rounded"
        />
      )}

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 px-2 py-1 rounded"
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 px-2 py-1 rounded"
      >
        ›
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-2 gap-2">
        {slides.map((_: string, index: number) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === current ? "bg-blue-600" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
