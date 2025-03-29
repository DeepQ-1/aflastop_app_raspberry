import React, { useEffect, useRef } from 'react';

export const TouchRipple: React.FC = () => {
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a single reusable highlight element
    const highlightElement = document.createElement('div');
    highlightElement.className = 'tap-highlight';
    document.body.appendChild(highlightElement);
    
    const showHighlight = (x: number, y: number) => {
      // Position the highlight at the event coordinates
      highlightElement.style.left = `${x}px`;
      highlightElement.style.top = `${y}px`;
      
      // Show the highlight
      highlightElement.style.opacity = '1';
      
      // Hide it after a short delay
      setTimeout(() => {
        highlightElement.style.opacity = '0';
      }, 150);
    };
    
    // Handle mouse events (for desktop testing)
    const handleMouseDown = (event: MouseEvent) => {
      showHighlight(event.clientX, event.clientY);
    };
    
    // Handle touch events
    const handleTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      showHighlight(touch.clientX, touch.clientY);
    };
    
    // Add event listeners
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('touchstart', handleTouch);
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('touchstart', handleTouch);
      document.body.removeChild(highlightElement);
    };
  }, []);

  return null;
};