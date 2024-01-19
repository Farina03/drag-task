import React, { useState, useRef, useEffect } from 'react'
import SmallDiv from '../SmallDiv/SmallDiv'
import './largediv.css'
import { createPortal } from 'react-dom';

const LargeDiv = () => {
  let toSubFromX = 0
  let toSubFromY = 0
  const [position, setPosition] = useState({ x: 0, y: 0});
  const [isDragging, setIsDragging] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({x:0, y:0})
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [largeDivPos, setLargeDivPos] = useState({x: 0, y: 0})
  const [options, setOptions] = useState("")
  const largeDivRef = useRef(null)
  
   useEffect(() => {
    toSubFromX = largeDivRef?.current?.getBoundingClientRect().left
    toSubFromY = largeDivRef?.current?.getBoundingClientRect().top
    setPosition({
      x: toSubFromX,
      y: toSubFromY
    })
    console.log(toSubFromX, toSubFromY, "sub")
    // setLargeDivPos({x: largeDivPos.x - toSubFromX,
    //                 y: largeDivPos.y - toSubFromY})
   }, [])

    const handleMouseOut = (e) => {
        // setIsDragging(false)
        setTooltipVisible(false)
    }
    // console.log(largeDivRef?.current?.getBoundingClientRect().left + 150)
    const largeDivStyle = {
      left: largeDivPos.x,
      top: largeDivPos.y
    }
    const tooltipStyle = {
        visibility: tooltipVisible ? "visible" : "hidden",
        position: "fixed",
        left: tooltipPosition.x,
        top: tooltipPosition.y,
        border: ".5px solid black",
        height: "30px",
        width: "100px", //150
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px"
    }
    function handleOptionChange(e) {
      setOptions(e.target.value)
    }
    // console.log(smallDivRef.current?.getBoundingClientRect, "divRef")
  return (
    <div className="main-div">
      <select className="select-options" value={options} onChange={handleOptionChange}>
        <option value="">Select Direction</option>
        <option value="top">Top</option>
        <option value="bottom">Bottom</option>
        <option value="left">Left</option>
        <option value="right">Right</option>
      </select>
      <div style={largeDivStyle} id="large-div" ref={largeDivRef} 
          onMouseOut={handleMouseOut} 
          className='large-div'>
        <div className='large-div-drag'>
          Drag
        </div>
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
                largeDivRef={largeDivRef}
                options={options}/>
    </div>
    </div>
    
  )
}

export default LargeDiv