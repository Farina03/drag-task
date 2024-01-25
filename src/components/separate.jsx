import React from 'react'

const separate = () => {
    if(isResizing.direction === "left") {
        const boundX = largeDivRef.current.getBoundingClientRect().right
        const boundXLeft = largeDivRef.current.getBoundingClientRect().left
          // let moveX = 0
          // if(largeDivPos.x+e.movementX > largeDivRef.current.getBoundingClientRect().right)
          //   moveX = boundXLeft+e.movementX-boundX
          setPosition(prevItem => ({
            ...prevItem,
            x: Math.max(0,prevItem.x-e.movementX)
          }))
        if(largeDivDimensions.width > smallDivWidth) {
          setLargeDivPos(prevItem => ({
            ...prevItem,
            x: Math.min(boundX-smallDivWidth, prevItem.x+e.movementX)    //
          }))
        }
        setLargeDivDimensions(prevItem => (
          {
            ...prevItem,
            width: Math.max(smallDivWidth, prevItem.width - e.movementX)     //
          }
       ))
      }
      if(isResizing.direction === "bottom") {
        if(position.y+smallDivWidth >= largeDivDimensions.height) {
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
  return (
    <div>

    </div>
  )
}

export default separate