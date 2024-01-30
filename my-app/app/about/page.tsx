"use client";


import { title } from "@/components/primitives";
import { useState, useEffect } from 'react';

export default function AboutPage() {
  const [letters, setLetters] = useState('');
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMove = (e: React.MouseEvent | TouchEvent) => {
    
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
    const randomChar = (): string => {
      return chars[Math.floor(Math.random() * (chars.length - 1))]
    }
    
    const randomString = (length: number): string => {
      return Array.from<string, string>(Array(length), randomChar).join("");
    }
    
    setLetters(randomString(1500));
  }
  
  useEffect(() => {
    
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
    }
  }, []);

  return (
    <div className="card-track">
      <div className="card-wrapper">
        <div 
          className="card"
          onMouseMove={(e) => handleMove(e)}

          onTouchMove={(e) => handleMove(e)}
        >
          
          <div className="card-gradient"></div>
          
          <div 
            className="card-letters"
            style={{
              '--x': x + 'px',
              '--y': y + 'px'
            }}
          
          >
            {letters}
          </div>
        </div>

      </div>
      
      <div id="links">
        {/* links */}
      </div>
    </div>
  );
}
