export function cursorDeterminer(e, boundTop, boundBottom, boundLeft, boundRight) {
    if(((e.clientX >= boundLeft-5 && 
      e.clientX <= boundLeft+5) && 
      (e.clientY >= boundTop-5 && 
      e.clientY <= boundTop+5)) ||
      ((e.clientX >= boundRight-5 && 
      e.clientX <= boundRight+5) && 
      (e.clientY >= boundTop-5 && 
      e.clientY <= boundTop+5)) ||
      ((e.clientX >= boundLeft-5 && 
      e.clientX <= boundLeft+5) && 
      (e.clientY >= boundBottom-5 && 
      e.clientY <= boundBottom+5)) ||
      ((e.clientX >= boundRight-5 && 
      e.clientX <= boundRight+5) && 
      (e.clientY >= boundBottom-5 && 
      e.clientY <= boundBottom+5))) {
        return("move")
        //setCursor("move")
      }
    else if((e.clientX >= boundLeft-5 && 
      e.clientX <= boundLeft+5) || 
      (e.clientX >= boundRight-5 && 
      e.clientX <= boundRight+5)) {
        return("col-resize")
        //setCursor("col-resize")
    }
    else if((e.clientY >= boundTop-5 && 
      e.clientY <= boundTop+5) || 
      (e.clientY >= boundBottom-5 && 
      e.clientY <= boundBottom+5)) {
        return("row-resize")
        //setCursor("row-resize")
    }
    else return("")
    //else setCursor("")
}