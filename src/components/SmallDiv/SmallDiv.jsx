import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import './smalldiv.css'

const SmallDiv = ({isDragging, 
                setIsDragging, 
                setPosition, 
                position,
                tooltipVisible,
                setTooltipVisible,
                setTooltipPosition,
                tooltipPosition,
                options,
                largeDivRef}) => {
    // const [position, setPosition] = useState({ x: 0, y: 0 });
    // const [tooltipPosition, setTooltipPosition] = useState({x: 0, y:0})
    const smallDivRef = useRef(null)
    const largeDivWidth = 300
    const smallDivWidth = 50
    const tooltipHeight = 30
    const tooltipWidth = 100
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setTooltipVisible(false)
    };
  
    const handleMouseMove = (e) => {
      if (isDragging) {
        setTooltipVisible(false)
        const newX = position.x + e.movementX
        const newY = position.y + e.movementY
        const maxX = largeDivRef.right  //largeDivWidth - smallDivWidth 
        const maxY = largeDivRef.bottom  //largeDivWidth - smallDivWidth 
        const boundX = Math.max(largeDivRef.left, Math.min(newX, maxX))   //0
        const boundY = Math.max(largeDivRef.top, Math.min(newY, maxY))   //0
        setPosition({ x: boundX, y: boundY });
      }
    };
  
    const handleMouseUp = (e) => {
      setIsDragging(false);
      let smallDivBottom = smallDivRef.current?.getBoundingClientRect().bottom
      let smallDivTop = smallDivRef.current?.getBoundingClientRect().top
      let smallDivLeft = smallDivRef.current?.getBoundingClientRect().left
      let smallDivRight = smallDivRef.current?.getBoundingClientRect().right
      let largeDivRight = largeDivRef.current?.getBoundingClientRect().right
      let largeDivLeft = largeDivRef.current?.getBoundingClientRect().left
      let largeDivBottom = largeDivRef.current?.getBoundingClientRect().bottom
      let largeDivTop = largeDivRef.current?.getBoundingClientRect().top
      if(options === "bottom") {
        setTooltipPosition({
          x: Math.min(smallDivLeft, largeDivRight - tooltipWidth),
          y: smallDivBottom + tooltipHeight >= largeDivBottom ? 
              smallDivBottom - (smallDivWidth + tooltipHeight) : 
              smallDivBottom 
        })
      }
      if(options === "top" || options === "") {
        setTooltipPosition({
          x: Math.min(smallDivLeft, largeDivRight - tooltipWidth),
          y: smallDivTop - tooltipHeight <= largeDivTop ? 
             smallDivBottom : smallDivTop - tooltipHeight
        })
      }
      if(options === "right") {
        setTooltipPosition({
          x: smallDivRight+tooltipWidth >= largeDivRight ?
             smallDivLeft-tooltipWidth : smallDivRight,
          //Math.min(smallDivRight,largeDivRight-tooltipWidth),
          y: smallDivTop + (smallDivWidth/2 - tooltipHeight/2)
        })
      }
      if(options === "left") {
        setTooltipPosition({
          x: smallDivLeft - tooltipWidth <= largeDivLeft ?
             smallDivRight : smallDivLeft - tooltipWidth,
          y: smallDivTop + (smallDivWidth/2 - tooltipHeight/2)
        })
      }
      setTooltipVisible(true)
    };
    const handleMouseEnter = (e) => {
      setIsDragging(false);
      let smallDivBottom = smallDivRef.current?.getBoundingClientRect().bottom
      let smallDivTop = smallDivRef.current?.getBoundingClientRect().top
      let smallDivLeft = smallDivRef.current?.getBoundingClientRect().left
      let smallDivRight = smallDivRef.current?.getBoundingClientRect().right
      let largeDivRight = largeDivRef.current?.getBoundingClientRect().right
      let largeDivLeft = largeDivRef.current?.getBoundingClientRect().left
      let largeDivBottom = largeDivRef.current?.getBoundingClientRect().bottom
      let largeDivTop = largeDivRef.current?.getBoundingClientRect().top
      if(options === "bottom") {
        setTooltipPosition({
          x: Math.min(smallDivLeft, largeDivRight - tooltipWidth),
          y: smallDivBottom + tooltipHeight >= largeDivBottom ? 
              smallDivBottom - (smallDivWidth + tooltipHeight) : 
              smallDivBottom 
        })
      }
      if(options === "top" || options === "") {
        setTooltipPosition({
          x: Math.min(smallDivLeft, largeDivRight - tooltipWidth),
          y: smallDivTop - tooltipHeight <= largeDivTop ? 
              smallDivBottom : smallDivTop - tooltipHeight
        })
      }
      if(options === "right") {
        setTooltipPosition({
          x: smallDivRight+tooltipWidth >= largeDivRight ?
             smallDivLeft-tooltipWidth : smallDivRight,
          //Math.min(smallDivRight,largeDivRight-tooltipWidth),
          y: smallDivTop + (smallDivWidth/2 - tooltipHeight/2)
        })
      }
      if(options === "left") {
        setTooltipPosition({
          x: smallDivLeft - tooltipWidth <= largeDivLeft ?
             smallDivRight : smallDivLeft - tooltipWidth,
          y: smallDivTop + (smallDivWidth/2 - tooltipHeight/2)
        })
      }
      setTooltipVisible(true)
    }
    const handleMouseLeave = (e) => {
        // handleMouseDown && setIsDragging(true)
        // setIsDragging(false)
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