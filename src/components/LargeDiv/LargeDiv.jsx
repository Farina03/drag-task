import React, { useState, useRef, useEffect } from 'react'
import SmallDiv from '../SmallDiv/SmallDiv'
import './largediv.css'
import { createPortal } from 'react-dom';

const LargeDiv = () => {
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({x:0, y:0})
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const largeDivRef = useRef(null)

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
    // console.log(smallDivRef.current?.getBoundingClientRect, "divRef")
  return (
    <div id="large-div" ref={largeDivRef} onMouseOut={handleMouseOut} className='large-div'>
        {createPortal(
            <div className='tooltip' style={tooltipStyle}>This is tooltip</div>, document.body
        )}
        <SmallDiv isDragging={isDragging} 
                setIsDragging={setIsDragging}
                tooltipVisible={tooltipVisible}
                setTooltipVisible={setTooltipVisible}
                // position={position}
                // setPosition={setPosition}
                setTooltipPosition={setTooltipPosition}
                tooltipPosition={tooltipPosition}
                largeDivRef={largeDivRef}/>
        {/* setTooltipVisible={setTooltipVisible}
                setTooltipPosition = {setTooltipPosition}
                tooltipPosition = {tooltipPosition}  */}
    </div>
  )
}

export default LargeDiv