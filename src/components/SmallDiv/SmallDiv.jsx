import React from 'react'
import { useState } from 'react';
import './smalldiv.css'

const SmallDiv = ({isDragging, 
                setIsDragging, 
                setPosition, 
                position,
                tooltipVisible,
                setTooltipVisible,
                setTooltipPosition,
                tooltipPosition,
                smallDivRef}) => {
    // const [position, setPosition] = useState({ x: 0, y: 0 });
    // const [tooltipPosition, setTooltipPosition] = useState({x:0, y:0})
    // const [tooltipVisible, setTooltipVisible] = useState(false)

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setTooltipVisible(false)
    };
  
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = position.x + e.movementX;
        const newY = position.y + e.movementY;
        const maxX = 250
        const maxY = 250
        const boundX = Math.max(0, Math.min(newX, maxX))
        const boundY = Math.max(0, Math.min(newY, maxY))
        setPosition({ x: boundX, y: boundY });
      }
    };
  
    const handleMouseUp = (e) => {
      setIsDragging(false);
      setTooltipVisible(true)
      setTooltipPosition({
        x: e.clientX,
        y: e.clientY + 30
    })
    };
    const handleMouseEnter = (e) => {
        setTooltipVisible(true)
        const maxToolPosX = 200
        const maxToolPosY = 200
        const newX = e.clientX;
        const newY = e.clientY + 30;
        setTooltipPosition({
            x: newX,
            y: newY
        })
    }
    const handleMouseLeave = (e) => {
        setIsDragging(false)
        setTooltipVisible(false)
    }
  return (
    <div id="large-div" onMouseDown={handleMouseDown} 
        onMouseMove={handleMouseMove} 
        onMouseUp={handleMouseUp} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='small-div' 
        style={{left: position.x, top:position.y}}>
    </div>
  )
}

export default SmallDiv