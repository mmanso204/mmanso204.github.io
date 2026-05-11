import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { slides } from './slideshowData.js';

const Slideshow = () => {
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Memoize the detection function
  const isVideo = useCallback((src: string) => /\.(mp4|webm|ogg)$/i.test(src), []);
  
  const currentSlide = useMemo(() => slides[current], [current]);
  const nextSlideIndex = useMemo(() => (current + 1) % slides.length, [current]);
  const prevSlideIndex = useMemo(() => current === 0 ? slides.length - 1 : current - 1, [current]);
  const isCurrentVideo = useMemo(() => isVideo(currentSlide), [currentSlide, isVideo]);

  // Preload adjacent images
  useEffect(() => {
    const preloadImage = (src: string) => {
      if (!isVideo(src)) {
        const img = new Image();
        img.src = src;
      }
    };

    // Preload next slide
    preloadImage(slides[nextSlideIndex]);
    // Preload previous slide
    preloadImage(slides[prevSlideIndex]);
  }, [current, isVideo, nextSlideIndex, prevSlideIndex]);

  // Memoized slide navigation functions
  const prevSlide = useCallback(() => {
    setCurrent(prevSlideIndex);
  }, [prevSlideIndex]);

  const nextSlide = useCallback(() => {
    setCurrent(nextSlideIndex);
  }, [nextSlideIndex]);

  const handleVideoEnded = useCallback(() => {
    nextSlide();
  }, [nextSlide]);

  // Auto-slide effect
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (isCurrentVideo) {
      // For videos, let them play to completion
      const video = videoRef.current;
      if (video) {
        video.addEventListener("ended", handleVideoEnded);
        return () => {
          video.removeEventListener("ended", handleVideoEnded);
        };
      }
    } else {
      // For images, auto-advance every 4 seconds
      timerRef.current = setTimeout(() => {
        nextSlide();
      }, 4000);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [isCurrentVideo, handleVideoEnded, nextSlide]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Main Slideshow Container */}
      <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
        {/* Slide */}
        <div className="relative w-full pt-[100%]">
          {isCurrentVideo ? (
            <video
              ref={videoRef}
              src={currentSlide}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onError={(e) => console.error("Video failed to load:", e)}
            />
          ) : (
            <>
              {isLoading && (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
                </div>
              )}
              <img
                src={currentSlide}
                alt={`Slide ${current + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                decoding="async"
                onLoad={() => setIsLoading(false)}
                onError={(e) => {
                  console.error("Image failed to load:", e);
                  setIsLoading(false);
                }}
              />
            </>
          )}

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 text-gray-900 font-bold text-2xl px-3 py-2 rounded-lg transition-all hover:scale-110 active:scale-95"
            aria-label="Previous slide"
          >
            ‹
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 text-gray-900 font-bold text-2xl px-3 py-2 rounded-lg transition-all hover:scale-110 active:scale-95"
            aria-label="Next slide"
          >
            ›
          </button>

          {/* Slide Counter */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium">
            {current + 1} / {slides.length}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center items-center gap-2 py-4 bg-gray-900 overflow-x-auto px-4">
          {slides.map((_: string, index: number) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`flex-shrink-0 rounded-full transition-all duration-300 ${
                index === current 
                  ? "bg-blue-600 w-3 h-3 scale-125" 
                  : "bg-gray-400 hover:bg-gray-300 w-2 h-2 hover:scale-110"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
