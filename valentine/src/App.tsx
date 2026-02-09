import { useState, useRef, useEffect } from "react";
import './App.css';
import Slideshow from './slideshow.jsx';

function App() {

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const year = now.getFullYear();
      const feb14 = new Date(`${year}-02-14T00:00:00`);
      const diff = feb14 - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, []);
  const [yesSize, setYesSize] = useState(40);
  const [noSize, setNoSize] = useState(40);
  const [answeredYes, setAnsweredYes] = useState(false);
  const audioRef = useRef(null); // ref for audio element

  const handleNoClick = () => {
    setYesSize(prev => prev + 10);
    setNoSize(prev => Math.max(prev - 5, 20));
  };

  const handleYesClick = () => {
    setAnsweredYes(true);
    if (audioRef.current) {
      audioRef.current.play(); // play the song
    }
  };

  return (
    <div className='trippy-bg min-w-screen min-h-screen flex flex-col items-center justify-center p-4'>
      {answeredYes ? (
        <>
          <Slideshow />
          <h1 className='text-5xl font-bold text-red-500'>💖 Thank You Bae! 💖</h1>
          <p className='text-xl mt-4'>Dark skin, chocolate, ghanaian will be delivered to you in!</p>
          {/* Countdown Timer */}
          <div className="text-3xl font-bold mt-4 text-pink-700">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </div>

        </>
      ) : (
        <>
          <h1 className='text-3xl font-bold p-10'>Will you be my Valentine?</h1>
          
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleYesClick}
              style={{
                padding: `${yesSize / 2}px ${yesSize}px`,
                fontSize: `${yesSize / 4}px`,
                transition: "all 0.3s ease"
              }}
              className="bg-pink-500 text-white font-bold rounded"
            >
              Yess
            </button>
            <button
              onClick={handleNoClick}
              style={{
                padding: `${noSize / 2}px ${noSize}px`,
                fontSize: `${noSize / 4}px`,
                transition: "all 0.3s ease"
              }}
              className="bg-white rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </>
      )}
      {/* Audio element always rendered */}
      <audio ref={audioRef} src="/leave-the-door.mp3" />
    </div>
  );
}

export default App;