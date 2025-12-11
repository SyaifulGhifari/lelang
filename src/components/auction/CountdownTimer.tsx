'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endDate: Date;
  onEnded?: () => void;
}

export function CountdownTimer({ endDate, onEnded }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isEnded: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isEnded: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = endDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true });
        onEnded?.();
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isEnded: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate, onEnded]);

  if (timeLeft.isEnded) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-center">
        <p className="text-lg font-bold text-red-600">Auction Ended</p>
      </div>
    );
  }

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 6;

  return (
    <div className={`rounded-lg p-4 text-center ${isUrgent ? 'bg-orange-50' : 'bg-blue-50'}`}>
      <p className="text-sm text-gray-600 mb-2">Time remaining</p>
      <div className="flex justify-center gap-3 text-lg font-bold">
        <div>
          <span className={isUrgent ? 'text-orange-600' : 'text-blue-600'}>
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <p className="text-xs text-gray-600">days</p>
        </div>
        <div>
          <span className={isUrgent ? 'text-orange-600' : 'text-blue-600'}>
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <p className="text-xs text-gray-600">hrs</p>
        </div>
        <div>
          <span className={isUrgent ? 'text-orange-600' : 'text-blue-600'}>
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <p className="text-xs text-gray-600">min</p>
        </div>
        <div>
          <span className={isUrgent ? 'text-orange-600' : 'text-blue-600'}>
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <p className="text-xs text-gray-600">sec</p>
        </div>
      </div>
    </div>
  );
}
