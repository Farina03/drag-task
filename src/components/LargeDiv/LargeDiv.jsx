import React, { useState, useRef, useEffect } from 'react'
import SmallDiv from '../SmallDiv/SmallDiv'
import './largediv.css'
import { createPortal } from 'react-dom';

const LargeDiv = () => {
  const largeDivWidth = 300  
  const smallDivWidth = 50
  const tooltipHeight = 30
  const tooltipWidth = 100
  const optionsWidth = 150
  const [position, setPosition] = useState({ x: 0, y: 0});
  const [isDragging, setIsDragging] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({x:0, y:0})
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [largeDivPos, setLargeDivPos] = useState(
    {x: (window.innerWidth/2)-largeDivWidth/2, 
     y: (window.innerHeight/2)-largeDivWidth})
  const [largeDivIsDragging, setLargeDivIsDragging] = useState(false)
  const [largeDivDimensions, setLargeDivDimensions] = useState({height: 300, width: 300})
  const [isResizing, setIsResizing] = useState({resize:false, direction:""})
  const [options, setOptions] = useState("")
  const largeDivRef = useRef(null)
  const smallDivRef = useRef(null)

  const largeDivStyle = {
    left: largeDivPos.x,
    top: largeDivPos.y,
    height: largeDivDimensions.height,
    width: largeDivDimensions.width
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
  const optionsStyle = {
    marginLeft: window.innerWidth/2 - optionsWidth/2,
    marginTop: "50px"
  }
  function handleOptionChange(e) {
    setOptions(e.target.value)
  }
  function handleDragBtnMouseDown() {
    setLargeDivIsDragging(true)
  }
  function handleMainDivMouseMove(e) {        //write the resizing conditions
    if(largeDivIsDragging) {
      setTooltipVisible(false)
      const newX = largeDivPos.x + e.movementX
      const newY = largeDivPos.y + e.movementY
      setLargeDivPos({
        x: Math.max(0, Math.min(newX, window.innerWidth-largeDivDimensions.width)),
        y: Math.max(0-80, Math.min(newY, window.innerHeight-55-largeDivDimensions.height))
      })
    }
    if(isDragging) {
      setTooltipVisible(false)
      const newX = position.x + e.movementX
      const newY = position.y + e.movementY
      const maxX = largeDivRef.current.getBoundingClientRect().width-smallDivWidth
      const maxY = largeDivRef.current.getBoundingClientRect().height-smallDivWidth
      const boundX = Math.max(0, Math.min(newX, maxX))   
      const boundY = Math.max(0, Math.min(newY, maxY))  
      setPosition({ x: boundX, y: boundY });
    }
    if(isResizing.resize === true) {
      if(isResizing.direction === "left") {
        if(position.x+smallDivWidth >= largeDivDimensions.width) {
          setPosition(prevItem => ({
            ...prevItem,
            x: Math.max(0,prevItem.x-e.movementX)
          }))
        }
        if(largeDivDimensions.width > smallDivWidth) {
          setLargeDivPos(prevItem => ({
            ...prevItem,
            x: prevItem.x+e.movementX
          }))
        }
        setLargeDivDimensions(prevItem => (
          {
            ...prevItem,
            width: Math.max(smallDivWidth, prevItem.width - e.movementX)
          }
        ))
      }
      if(isResizing.direction === "right") {
        if(position.x+smallDivWidth >= largeDivDimensions.width) {
          setPosition(prevItem => ({
            ...prevItem,
            x: Math.max(0, prevItem.x+e.movementX)
          }))
        }
        setLargeDivDimensions(prevItem => (
          {
            ...prevItem,
            width: Math.max(smallDivWidth, prevItem.width + e.movementX)
          }
        ))
      }
      if(isResizing.direction === "top") {
        if(position.y+smallDivWidth >= largeDivDimensions.height) {
          setPosition(prevItem => ({
            ...prevItem,
            y: Math.max(0,prevItem.y-e.movementY)
          }))
        }
        if(largeDivDimensions.height > smallDivWidth) {
          setLargeDivPos(prevItem => ({
            ...prevItem,
            y: largeDivPos.y+e.movementY
          }))
        }
        setLargeDivDimensions(prevItem => (
          {
            ...prevItem,
            height: Math.max(smallDivWidth, prevItem.height - e.movementY)
          }
        ))
      }
      if(isResizing.direction === "bottom") {
        if(position.y+smallDivWidth >= largeDivDimensions.height) {
          setPosition(prevItem => ({
            ...prevItem,
            y: Math.max(0,prevItem.y+e.movementY)
          }))
        }
        setLargeDivDimensions(prevItem => (
          {
            ...prevItem,
            height: Math.max(smallDivWidth, prevItem.height + e.movementY)
          }
        ))
      }
    }
  }
  function handleMainDivMouseDown(e) { 
    if(largeDivIsDragging) {
      setLargeDivIsDragging(false)
    }
    if(isDragging) {
      setIsDragging(false)
    }
    if(e.clientX >= largeDivRef.current.getBoundingClientRect().left-5 && 
      e.clientX <= largeDivRef.current.getBoundingClientRect().left+5) {
      setIsResizing({
        resize: true,
        direction: "left"
      })
    }
    if(e.clientX >= largeDivRef.current.getBoundingClientRect().right-5 && 
      e.clientX <= largeDivRef.current.getBoundingClientRect().right+5) {
      setIsResizing({
        resize: true,
        direction: "right"
      })
    }
    if(e.clientY >= largeDivRef.current.getBoundingClientRect().top-5 && 
      e.clientY <= largeDivRef.current.getBoundingClientRect().top+5) {
      setIsResizing({
        resize: true,
        direction: "top"
      })
    }
    if(e.clientY >= largeDivRef.current.getBoundingClientRect().bottom-5 && 
      e.clientY <= largeDivRef.current.getBoundingClientRect().bottom+5) {
      setIsResizing({
        resize: true,
        direction: "bottom"
      })
    }
  }
  function handleMainDivMouseUp() { 
    if(isDragging)
      setIsDragging(false)
    if(largeDivIsDragging)
      setLargeDivIsDragging(false)
    setIsResizing({
      resize: false,
      direction: ""
    })
  }
  return (
    <div className="main-div" 
         onMouseMove={handleMainDivMouseMove} 
         onMouseDown={handleMainDivMouseDown}
         onMouseUp={handleMainDivMouseUp}>
      <select className="select-options" value={options} style={optionsStyle} onChange={handleOptionChange}>
        <option value="">Select Direction</option>
        <option value="top">Top</option>
        <option value="bottom">Bottom</option>
        <option value="left">Left</option>
        <option value="right">Right</option>
      </select>
      <div style={largeDivStyle} id="large-div" ref={largeDivRef} 
            className='large-div'>
        <div className='large-div-drag'
             onMouseDown={handleDragBtnMouseDown}>
          Drag
        </div>
        {createPortal(
            <div className='tooltip' style={tooltipStyle}>This is tooltip</div>, document.body
        )}
        <div ref={smallDivRef}>
        <SmallDiv isDragging={isDragging} 
                setIsDragging={setIsDragging}
                tooltipVisible={tooltipVisible}
                setTooltipVisible={setTooltipVisible}
                position={position}
                setPosition={setPosition}
                setTooltipPosition={setTooltipPosition}
                tooltipPosition={tooltipPosition}
                largeDivRef={largeDivRef}
                options={options}
                largeDivPos={largeDivPos}/>
        </div>
      </div>
    </div> 
  )
}

export default LargeDiv