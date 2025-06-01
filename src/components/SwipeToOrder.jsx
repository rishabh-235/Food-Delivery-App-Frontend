import React, { useState, useRef, useEffect } from 'react';
import './styles/swiptoorder.css';

const SwipeToOrder = ({
  onConfirm,
  text = "Swipe to Order",
  confirmText = "Order Placed!",
  backgroundColor = "#ffffff",
  confirmColor = "#4CAF50",
  sliderColor = "#d9d9d9",
  textColor = "#666",
  confirmTextColor = "#fff",
  disabled = false,
  resetAfter = 2000,
  threshold = 0.8, // 80% swipe to confirm
  icon = "→"
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isConfirmed && resetAfter > 0) {
      const timer = setTimeout(() => {
        setIsConfirmed(false);
        setSliderPosition(0);
      }, resetAfter);

      return () => clearTimeout(timer);
    }
  }, [isConfirmed, resetAfter]);

  const handleStart = (clientX) => {
    if (disabled || isConfirmed) return;
    
    setIsDragging(true);
    startX.current = clientX;
    currentX.current = clientX;
  };

  const handleMove = (clientX) => {
    if (!isDragging || disabled || isConfirmed) return;

    currentX.current = clientX;
    const diff = currentX.current - startX.current;
    const maxDistance = containerWidth - 105; // 60px is slider width
    const newPosition = Math.max(0, Math.min(diff, maxDistance));
    
    setSliderPosition(newPosition);
  };

  const handleEnd = () => {
    if (!isDragging || disabled || isConfirmed) return;

    setIsDragging(false);
    const maxDistance = containerWidth - 105;
    const swipePercentage = sliderPosition / maxDistance;

    if (swipePercentage >= threshold) {
      setSliderPosition(maxDistance);
      setIsConfirmed(true);
      onConfirm && onConfirm();
    } else {
      setSliderPosition(0);
    }
  };

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, sliderPosition, containerWidth]);

  const progressPercentage = containerWidth > 0 ? (sliderPosition / (containerWidth - 105)) * 100 : 0;

  return (
    <div 
      ref={containerRef}
      className={`swipe-to-confirm ${disabled ? 'disabled' : ''} ${isConfirmed ? 'confirmed' : ''}`}
      style={{
        backgroundColor: isConfirmed ? confirmColor : backgroundColor,
        color: isConfirmed ? confirmTextColor : textColor,
      }}
    >
      <div 
        className="swipe-background"
        style={{
          width: `${progressPercentage}%`,
          backgroundColor: confirmColor,
        }}
      />
      
      <div className="swipe-text">
        {isConfirmed ? confirmText : text}
      </div>
      
      <div
        ref={sliderRef}
        className={`swipe-slider ${isDragging ? 'dragging' : ''}`}
        style={{
          transform: `translateX(${sliderPosition}px)`,
          backgroundColor: sliderColor,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <span className="swipe-icon">{icon}</span>
      </div>
    </div>
  );
};

export default SwipeToOrder;