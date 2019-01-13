
class Dragger {
  constructor (container, handler) {
    this._container = container
    this._windowHandler = handler
  }

  startListening () {
    this._container.addEventListener('mousedown', e => {
      // Make window appear in front
      this._windowHandler.incrementZindex()
      this._windowHandler.unfocusAllWindows()

      // If window is pressed start dragaction
      let win = this._windowHandler.findWindowFromEvent(e)
      if (win !== (null || undefined)) {
        this._windowHandler.setActiveWindow(win)
        this._windowHandler.setWindowHighestZIndex(win)
        this._windowHandler.setWindowIsFocused(win)
        this.dragStart(this._windowHandler.getActiveWindow(), e)
      }
    }, false)

    this._container.addEventListener('mousemove', e => {
      this.drag(this._windowHandler.getActiveWindow(), e)
    }, false)

    this._container.addEventListener('mouseup', e => {
      let win = this._windowHandler.findWindowFromEvent(e)
      if (win !== (null || undefined)) {
        this._windowHandler.setActiveWindow(win)
        this.dragEnd(this._windowHandler.getActiveWindow(), e)
        // for (let window of this._windows) { // Find the specific window
        // if (e.target === window) {
        // this._activeWindow = window
        // this._dragger.dragEnd(this._activeWindow, e)
        // this._dragEnd(this._activeWindow, e)
      }
    }, false)
  }

  dragStart (window, event) {
    window.setInitialPointerPosX(event.clientX - window.getXPosOffset())
    window.setInitialPointerPosY(event.clientY - window.getYPosOffset())

    if (event.composedPath()[0] === window.getContainerHeader()) {
      window.setDragActive(true)
    }
  }

  drag (window, event) {
    if (window.getDragActive()) {
      event.preventDefault()

      window.setCurrentPointerPosX(event.clientX - window.getInitialPointerPosX())
      window.setCurrentPointerPosY(event.clientY - window.getInitialPointerPosY())

      window.setXPosOffset(window.getCurrentPointerPosX())
      window.setYPosOffset(window.getCurrentPointerPosY())

      this._setNewElementPos(window, event)
    }
  }

  dragEnd (window) {
    window.setInitialPointerPosX(window.getCurrentPointerPosX())
    window.setInitialPointerPosY(window.getCurrentPointerPosY())

    window.setDragActive(false)
  }

  _setNewElementPos (window) {
    window.setContainerStyleTransform('translate3d(' + window.getCurrentPointerPosX() + 'px, ' +
     window.getCurrentPointerPosY() + 'px, 0)')
  }
}

export default Dragger
