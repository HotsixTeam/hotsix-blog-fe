import { useEffect, useRef, useState } from 'react';

function Timer() {
  const [min, setMin] = useState<number>(3);
  const [sec, setSec] = useState<number>(0);
  const time = useRef(180);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMin(~~(time.current / 60));
    setSec(time.current % 60);
    timerId.current = setInterval(() => {
      time.current -= 1;
      setMin(~~(time.current / 60));
      setSec(time.current % 60);
      if (time.current < 0 && timerId.current) {
        clearInterval(timerId.current);
      }
    }, 1000);

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, []);

  return sec < 10 ? (
    <div className="text-[10px] text-gray font-bold">
      0{min}:0{sec}
    </div>
  ) : (
    <div className="text-[10px] text-gray font-bold">
      0{min}:{sec}
    </div>
  );
}

export default Timer;
