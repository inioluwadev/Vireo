"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { Button } from "./ui/button";

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft | null {
  const difference = +targetDate - +new Date();
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return null;
}

const CountdownBox = ({ value, label }: { value: number, label: string }) => (
  <div className="flex flex-col items-center justify-center bg-secondary rounded-lg p-4 w-20 h-20 shadow-md">
    <span className="text-3xl font-bold font-headline text-primary">{String(value).padStart(2, '0')}</span>
    <span className="text-xs uppercase tracking-wider text-foreground/70">{label}</span>
  </div>
);

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Set initial value on client mount to avoid hydration mismatch
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <div className="flex flex-col items-center space-y-4 text-center">
        <h2 className="text-2xl font-bold text-primary animate-pulse">We've Launched!</h2>
        <Link href="/" passHref>
          <Button size="lg" className="transition-transform duration-300 hover:scale-105">
            <Rocket className="mr-2 h-5 w-5" />
            Enter the Future
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-4">
      <CountdownBox value={timeLeft.days} label="Days" />
      <CountdownBox value={timeLeft.hours} label="Hours" />
      <CountdownBox value={timeLeft.minutes} label="Minutes" />
      <CountdownBox value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
