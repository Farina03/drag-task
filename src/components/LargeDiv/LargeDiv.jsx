import React, { useState, useRef } from 'react'
import SmallDiv from '../SmallDiv/SmallDiv'
import './largediv.css'
import { createPortal } from 'react-dom';

const LargeDiv = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({x:0, y:0})
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const smallDivRef = useRef(null)

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       const newX = position.x + e.movementX;
//       const newY = position.y + e.movementY;
//       const maxX = 250
//       const maxY = 250
//       const boundX = Math.max(0, Math.min(newX, maxX))
//       const boundY = Math.max(0, Math.min(newY, maxY))
//       setPosition({ x: boundX, y: boundY });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };
    // const handleMouseEnter = () => {
    //     setTooltipVisible(true)
    // }
    const handleMouseOut = (e) => {
        setIsDragging(false)
        setTooltipVisible(false)
    }
    const tooltipStyle = {
        visibility: tooltipVisible ? "visible" : "hidden",
        position: "fixed",
        left: tooltipPosition.x,
        top: tooltipPosition.y,
        border: ".5px solid black",
        height: "30px",
        width: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
    console.log(position, "position")
    console.log(tooltipPosition, "tooltippos")
  return (
    <div id="large-div" onMouseOut={handleMouseOut} className='large-div'>
        {createPortal(
            <div className='tooltip' style={tooltipStyle}>This is tooltip</div>, document.body
        )}
        <SmallDiv isDragging={isDragging} 
                setIsDragging={setIsDragging}
                tooltipVisible={tooltipVisible}
                setTooltipVisible={setTooltipVisible}
                position={position}
                setPosition={setPosition}
                setTooltipPosition={setTooltipPosition}
                tooltipPosition={tooltipPosition}
                smallDivRef={smallDivRef}/>
        {/* setTooltipVisible={setTooltipVisible}
                setTooltipPosition = {setTooltipPosition}
                tooltipPosition = {tooltipPosition}  */}
    </div>
  )
}

export default LargeDiv