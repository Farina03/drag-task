import React, { useState, useRef, useEffect } from 'react'
import SmallDiv from '../SmallDiv/SmallDiv'
import './largediv.css'
import { createPortal } from 'react-dom';
import { cursorDeterminer } from '../../utils';
// import '../SmallDiv/smalldiv.css'

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
  const [cursor, setCursor] = useState("")
  const largeDivRef = useRef(null)
  const smallDivRef = useRef(null)
  const initialTop = window.innerHeight/2-largeDivWidth
  const largeDivStyle = {
    left: largeDivPos.x,
    top: largeDivPos.y,
    height: largeDivDimensions.height,
    width: largeDivDimensions.width,
    cursor: cursor
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
    //marginTop: "50px"
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
    // if(((e.clientX >= largeDivRef.current.getBoundingClientRect().left-5 && 
    //   e.clientX <= largeDivRef.current.getBoundingClientRect().left+5) && 
    //   (e.clientY >= largeDivRef.current.getBoundingClientRect().top-5 && 
    //   e.clientY <= largeDivRef.current.getBoundingClientRect().top+5)) ||
    //   ((e.clientX >= largeDivRef.current.getBoundingClientRect().right-5 && 
    //   e.clientX <= largeDivRef.current.getBoundingClientRect().right+5) && 
    //   (e.clientY >= largeDivRef.current.getBoundingClientRect().top-5 && 
    //   e.clientY <= largeDivRef.current.getBoundingClientRect().top+5)) ||
    //   ((e.clientX >= largeDivRef.current.getBoundingClientRect().left-5 && 
    //   e.clientX <= largeDivRef.current.getBoundingClientRect().left+5) && 
    //   (e.clientY >= largeDivRef.current.getBoundingClientRect().bottom-5 && 
    //   e.clientY <= largeDivRef.current.getBoundingClientRect().bottom+5)) ||
    //   ((e.clientX >= largeDivRef.current.getBoundingClientRect().right-5 && 
    //   e.clientX <= largeDivRef.current.getBoundingClientRect().right+5) && 
    //   (e.clientY >= largeDivRef.current.getBoundingClientRect().bottom-5 && 
    //   e.clientY <= largeDivRef.current.getBoundingClientRect().bottom+5))) {
    //     setCursor("move")
    //   }
    // else if((e.clientX >= largeDivRef.current.getBoundingClientRect().left-5 && 
    //   e.clientX <= largeDivRef.current.getBoundingClientRect().left+5) || 
    //   (e.clientX >= largeDivRef.current.getBoundingClientRect().right-5 && 
    //   e.clientX <= largeDivRef.current.getBoundingClientRect().right+5)) {
    //     setCursor("col-resize")
    // }
    // else if((e.clientY >= largeDivRef.current.getBoundingClientRect().top-5 && 
    //   e.clientY <= largeDivRef.current.getBoundingClientRect().top+5) || 
    //   (e.clientY >= largeDivRef.current.getBoundingClientRect().bottom-5 && 
    //   e.clientY <= largeDivRef.current.getBoundingClientRect().bottom+5)) {
    //     setCursor("row-resize")
    // }
    // else setCursor("")
    const boundX = largeDivRef.current.getBoundingClientRect().right
    const boundXLeft = largeDivRef.current.getBoundingClientRect().left
    const boundY = largeDivRef.current.getBoundingClientRect().bottom
    const boundYTop = largeDivRef.current.getBoundingClientRect().top
    // const cursorDeterminer = cursorDeterminer(e, boundYTop, boundY, boundXLeft, boundX)
    setCursor(cursorDeterminer(e, boundYTop, boundY, boundXLeft, boundX))
    if(isResizing.resize === true) {
      //const boundX = largeDivRef.current.getBoundingClientRect().right
      //const boundY = largeDivRef.current.getBoundingClientRect().bottom
      if(isResizing.direction === "left-top") {
        setLargeDivPos({
          x: Math.min(boundX-smallDivWidth-1, largeDivPos.x+e.movementX),
          y: Math.min(boundY-smallDivWidth-31-50, largeDivPos.y+e.movementY)
        })
        setLargeDivDimensions(
          {
            width: Math.max(smallDivWidth, largeDivDimensions.width - e.movementX),
            height: Math.max(smallDivWidth, largeDivDimensions.height - e.movementY)
          }
        )
        setPosition({
          x: Math.max(0,position.x-e.movementX),
          y: Math.max(0,position.y-e.movementY)
        })
      }
      if(isResizing.direction === "right-top") {
        if(position.x+smallDivWidth >= largeDivDimensions.width) { 
          setPosition(prevItem => (
            {
              ...prevItem,
              x: Math.max(0, Math.min(prevItem.x, prevItem.x+e.movementX))
            }
          ))
        }
        setPosition(prevItem => (
          {
            ...prevItem,
            y: Math.max(0, prevItem.y-e.movementY)
          }
        ))
          setLargeDivPos(prevItem => (
            {
              ...prevItem,
              y: Math.min(boundY-smallDivWidth-1-30-50, prevItem.y+e.movementY)
            }
          ))
        setLargeDivDimensions(
          {
            width: Math.max(smallDivWidth, largeDivDimensions.width + e.movementX),
            height: Math.max(smallDivWidth, largeDivDimensions.height - e.movementY)
          }
        )
      }
      if(isResizing.direction === "left-bottom") {
        if(position.y+smallDivWidth >= largeDivDimensions.height) {
          setPosition(prevItem => (
          {
            ...prevItem,       //x: Math.max(0,position.x-e.movementX),
            y: Math.max(0, Math.min(prevItem.y,prevItem.y+e.movementY))  //y: Math.max(0,position.y+e.movementY)
          }
          ))
        }
        setPosition(prevItem => ({
          ...prevItem,
          x: Math.max(0,prevItem.x-e.movementX)
        }))
        setLargeDivDimensions(
          {
            width: Math.max(smallDivWidth, largeDivDimensions.width - e.movementX),
            height: Math.max(smallDivWidth, largeDivDimensions.height + e.movementY)
          }
        )
        setLargeDivPos(prevItem => (
          {
            ...prevItem,
            x: Math.min(boundX-smallDivWidth-1, prevItem.x+e.movementX)
        }))
      }
      if(isResizing.direction === "right-bottom") {
        if((position.x+smallDivWidth >= largeDivDimensions.width) || 
          (position.y+smallDivWidth >= largeDivDimensions.height)) {
          setPosition({
            x: Math.max(0, Math.min(position.x, position.x+e.movementX)),     //x: Math.min(0, Math.max(0, position.x+e.movementX)),
            y: Math.max(0, Math.min(position.y,position.y+e.movementY))    //y: Math.min(0, Math.max(0,position.y+e.movementY))
          })
        }
        setLargeDivDimensions(
          {
            width: Math.max(smallDivWidth, largeDivDimensions.width + e.movementX),
            height: Math.max(smallDivWidth, largeDivDimensions.height + e.movementY)
          }
        )
      }
      if(isResizing.direction === "left") {
          setLargeDivPos(prevItem => {
            return {
              ...prevItem,
                x: Math.min(boundX-smallDivWidth-1, largeDivPos.x+e.movementX)  
            }
          })
          setLargeDivDimensions(prevItem => {
            return {
              ...prevItem,
              width: Math.max(smallDivWidth, prevItem.width-e.movementX)  
            }
          })
          setPosition(prevItem => {   
            return {
              ...prevItem,
              x: Math.max(0, prevItem.x-e.movementX)
            }    
          })
      }
      if(isResizing.direction === "right") {
        setLargeDivDimensions(prevItem => (
          {
            ...prevItem,
            width: Math.max(smallDivWidth, prevItem.width + e.movementX)
          }
        ))
        if(position.x+smallDivWidth >= largeDivDimensions.width) {
          setPosition(prevItem => ({
            ...prevItem,
            x: Math.max(0, Math.min(prevItem.x, prevItem.x+e.movementX)),
          }))
        }
      }
      if(isResizing.direction === "top") {
          setLargeDivPos(prevItem => ({
            ...prevItem,
            y: Math.min(boundY-smallDivWidth-1-30-50, prevItem.y+e.movementY)    //calculate 30
          }))
          setLargeDivDimensions(prevItem => (
            {
              ...prevItem,
              height: Math.max(smallDivWidth, prevItem.height - e.movementY)
            }
          ))
          setPosition(prevItem => ({
            ...prevItem,
            y: Math.max(0, prevItem.y-e.movementY)
          }))
      }
      if(isResizing.direction === "bottom") {
        console.log(position.y, boundY)
        if(position.y+smallDivWidth >= largeDivDimensions.height) {     //
          setPosition(prevItem => ({
            ...prevItem,
            y: Math.max(0, Math.min(prevItem.y,prevItem.y+e.movementY))    //max -> 0,prevItem.y+e.movementY
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
    
    if((e.clientX >= largeDivRef.current.getBoundingClientRect().left-5 && 
      e.clientX <= largeDivRef.current.getBoundingClientRect().left+5) && 
      (e.clientY >= largeDivRef.current.getBoundingClientRect().top-5 && 
      e.clientY <= largeDivRef.current.getBoundingClientRect().top+5)) {
      setIsResizing({
        resize: true,
        direction: "left-top"
      })
    }
    else if((e.clientX >= largeDivRef.current.getBoundingClientRect().right-5 && 
      e.clientX <= largeDivRef.current.getBoundingClientRect().right+5) && 
      (e.clientY >= largeDivRef.current.getBoundingClientRect().top-5 && 
      e.clientY <= largeDivRef.current.getBoundingClientRect().top+5)) {
      setIsResizing({
        resize: true,
        direction: "right-top"
      })
    }
    else if((e.clientX >= largeDivRef.current.getBoundingClientRect().left-5 && 
      e.clientX <= largeDivRef.current.getBoundingClientRect().left+5) && 
      (e.clientY >= largeDivRef.current.getBoundingClientRect().bottom-5 && 
      e.clientY <= largeDivRef.current.getBoundingClientRect().bottom+5)) {
      setIsResizing({
        resize: true,
        direction: "left-bottom"
      })
    }
    else if((e.clientX >= largeDivRef.current.getBoundingClientRect().right-5 && 
      e.clientX <= largeDivRef.current.getBoundingClientRect().right+5) && 
      (e.clientY >= largeDivRef.current.getBoundingClientRect().bottom-5 && 
      e.clientY <= largeDivRef.current.getBoundingClientRect().bottom+5)) {
      setIsResizing({
        resize: true,
        direction: "right-bottom"
      })
    }
    else if(e.clientX >= largeDivRef.current.getBoundingClientRect().left-5 && 
      e.clientX <= largeDivRef.current.getBoundingClientRect().left+5) {
      setIsResizing({
        resize: true,
        direction: "left"
      })
    }
    else if(e.clientX >= largeDivRef.current.getBoundingClientRect().right-5 && 
      e.clientX <= largeDivRef.current.getBoundingClientRect().right+5) {
      setIsResizing({
        resize: true,
        direction: "right"
      })
    }
    else if(e.clientY >= largeDivRef.current.getBoundingClientRect().top-5 && 
      e.clientY <= largeDivRef.current.getBoundingClientRect().top+5) {
      setIsResizing({
        resize: true,
        direction: "top"
      })
    }
    else if(e.clientY >= largeDivRef.current.getBoundingClientRect().bottom-5 && 
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
    setCursor("")
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