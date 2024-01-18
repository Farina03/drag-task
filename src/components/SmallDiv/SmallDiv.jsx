import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import './smalldiv.css'

const SmallDiv = ({isDragging, 
                setIsDragging, 
                // setPosition, 
                // position,
                tooltipVisible,
                setTooltipVisible,
                setTooltipPosition,
                tooltipPosition,
                largeDivRef}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    // const [tooltipPosition, setTooltipPosition] = useState({x: 0, y:0})
    
    const smallDivRef = useRef(null)
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setTooltipVisible(false)
    };
  
    const handleMouseMove = (e) => {
      if (isDragging) {
        setTooltipVisible(false)
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
      let smallDivY = smallDivRef.current?.getBoundingClientRect().bottom
      let smallDivX = smallDivRef.current?.getBoundingClientRect().left
      let largeDivX = largeDivRef.current?.getBoundingClientRect().right
      let largeDivY = largeDivRef.current?.getBoundingClientRect().bottom
      setTooltipPosition({
        x: Math.min(smallDivX, largeDivX-150),
        y: smallDivY + 30 >= largeDivY ? smallDivY - 80 : smallDivY 
      })
      setTooltipVisible(true)
    };
    const handleMouseEnter = (e) => {
      let smallDivY = smallDivRef.current?.getBoundingClientRect().bottom
      let smallDivX = smallDivRef.current?.getBoundingClientRect().left
      let largeDivX = largeDivRef.current?.getBoundingClientRect().right
      let largeDivY = largeDivRef.current?.getBoundingClientRect().bottom
        setTooltipVisible(true)
        setTooltipPosition({
          x: Math.min(smallDivX, largeDivX-150),
          y: smallDivY + 30 >= largeDivY ? smallDivY - 80 : smallDivY 
        })
    }
    const handleMouseLeave = (e) => {
        setIsDragging(false)
        setTooltipVisible(false)
    }
  return (
    <div id="large-div" ref={smallDivRef}
      onMouseDown={handleMouseDown} 
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