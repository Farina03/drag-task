import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './draggablediv.css'
//import './App.css'; // You can create this CSS file for styling

const DraggableDiv = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const smallDivRef = useRef(null);
  const largeDivRef = useRef(null);

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleMouseDown = () => {
    setIsDragging(true);
    setTooltipVisible(false)
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
        setTooltipVisible(false)
      const newX = Math.min(Math.max(position.x + e.movementX, 0), largeDivWidth - smallDivWidth);
      const newY = Math.min(Math.max(position.y + e.movementY, 0), largeDivHeight - smallDivHeight);

      setPosition({ x: newX, y: newY });
      updateTooltipPosition(newX, newY);
    }
  };

  const handleMouseUp = () => {
    setTooltipVisible(true)
    setIsDragging(false);
  };

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const updateTooltipPosition = (x, y) => {
    const smallDivRect = smallDivRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const largeDivRect = largeDivRef.current.getBoundingClientRect();

    // Calculate tooltip position based on the small div and tooltip sizes
    const top = smallDivRect.bottom + tooltipMargin;
    let left = x;

    // Check if there is enough space under the small div; otherwise, show on top
    if (smallDivRect.bottom + tooltipRect.height > largeDivRect.bottom) {
      setTooltipPosition({
        top: Math.min(
          largeDivRect.bottom - tooltipRect.height,
          smallDivRect.top - tooltipRect.height - tooltipMargin
        ),
        left: Math.min(
          Math.max(largeDivRect.left, left),
          largeDivRect.right - tooltipRect.width
        ),
      });
    } else {
      setTooltipPosition({
        top: Math.min(largeDivRect.bottom - tooltipRect.height, top),
        left: Math.min(
          Math.max(largeDivRect.left, left),
          largeDivRect.right - tooltipRect.width
        ),
      });
    }
  };

  useEffect(() => {
    // Update tooltip position when the small div's position changes
    updateTooltipPosition(position.x, position.y);
  }, [position]);

  useEffect(() => {
    // Hide tooltip when dragging ends
    if (!isDragging) {
      setTooltipVisible(false);
    }
  }, [isDragging]);

  const tooltipMargin = 10;
  const tooltipRef = useRef(document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(tooltipRef.current);

    return () => {
      document.body.removeChild(tooltipRef.current);
    };
  }, []);

  useEffect(() => {
    largeDivRef.current = document.querySelector('.large-div');
  }, []);

  const largeDivWidth = 300;
  const largeDivHeight = 300;
  const smallDivWidth = 50;
  const smallDivHeight = 50;

  const tooltip = tooltipVisible
    ? createPortal(
        <div className="tooltip" style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
          Tooltip Content
        </div>,
        tooltipRef.current
      )
    : null;

  return (
    <div className="large-div" ref={largeDivRef}>
      <div
        className="small-div"
        ref={smallDivRef}
        style={{ left: position.x, top: position.y }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {tooltip}
    </div>
  );
};

export default DraggableDiv;
