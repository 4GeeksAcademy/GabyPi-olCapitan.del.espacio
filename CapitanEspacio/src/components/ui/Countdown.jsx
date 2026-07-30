import { useState, useEffect } from 'react';

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!targetDate) return;

    const targetTime = +new Date(targetDate);

    if (isNaN(targetTime)) {
      console.error('Countdown: Fecha no válida ->', targetDate);
      return;
    }

    const calculate = () => {
      const difference = targetTime - +new Date();
      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    setTimeLeft(calculate());
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      {[
        ['Días', timeLeft.days],
        ['Horas', timeLeft.hours],
        ['Min', timeLeft.minutes],
        ['Seg', timeLeft.seconds]
      ].map(([label, val]) => (
        <div key={label} className="bg-space-900/60 border border-gray-800/50 rounded-xl p-2">
          <span className="block text-lg font-bold text-space-primary font-mono">
            {String(val).padStart(2, '0')}
          </span>
          <span className="text-[10px] text-gray-500 uppercase font-medium">{label}</span>
        </div>
      ))}
    </div>
  );
}