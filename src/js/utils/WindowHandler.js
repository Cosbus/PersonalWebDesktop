class WindowHandler {
  constructor (container) {
    // Variables for keeping track of the Windows
    this._windows = []
    this._highestZindex = 0
    this._activeWindow = null
    this._firstWindowStartingTopPos = 50
    this._firstWindowStartingLeftPos = 50
    this._nextWindowTopOffset = 20
    this._nextWindowLeftOffset = 20
    this._headerSize = 20
    this._container = container

    // Listeners for windoEvents
    this._windowRemovedEvent = new window.CustomEvent('windowRemoved')
  }

  getHighestZindex () {
    return this._highestZindex
  }

  incrementZindex () {
    this._highestZindex++
  }

  unfocusAllWindows () {
    this._windows.forEach(function (element) {
      element.isNotFocused()
    })
  }

  findWindowFromEvent (event) {
    for (let window of this._windows) {
      if (event.target === window) {
        return window
      }
    }
  }

  setActiveWindow (window) {
    this._activeWindow = window
    // this._activeWindow.setZIndex(this._highestZindex)
    // this._activeWindow.isFocused()
  }

  setWindowHighestZIndex (window) {
    window.setZIndex(this._highestZindex)
  }

  setWindowIsFocused (window) {
    window.isFocused()
    window.focus()
  }

  getActiveWindow () {
    return this._activeWindow
  }

  addWindow (window, width, height) {
    if (this._windows.length === 0) {
      window.setLeftPosition(this._firstWindowStartingLeftPos)
      window.setTopPosition(this._firstWindowStartingTopPos)
    } else {
      let lastWindow = this._windows[this._windows.length - 1]
      // Dont stack windows right on top of each other
      window.setLeftPosition(`${parseInt(lastWindow.getLeftPosition(), 10) +
         this._nextWindowLeftOffset}`)
      window.setTopPosition(`${parseInt(lastWindow.getTopPosition(), 10) +
        this._nextWindowTopOffset}`)
    }
    this.incrementZindex()
    window.setZIndex(this._highestZindex)
    window.setWidth(`${width}px`)
    window.setHeight(`${height}px`)

    if (!this._isInViewport(window)) { // If the new window falls out of viewport
      this._firstWindowStartingLeftPos += 10
      window.setLeftPosition(this._firstWindowStartingLeftPos)
      window.setTopPosition(this._firstWindowStartingTopPos)
    }
    this.setActiveWindow(window)
    this._windows.push(window)

    this._container.appendChild(window)

    // Add eventlistener for window closing
    window.addEventListener('closeWindow', e => {
      let window = this.findWindowFromEvent(e)
      if (window !== null) {
        this._container.dispatchEvent(this._windowRemovedEvent)
        this.removeWindow(window, e)
      }
    })
  }

  _isInViewport (elem) {
    return ((parseInt(elem.getTopPosition(), 10) >= 0) &&
    (parseInt(elem.getLeftPosition(), 10) >= 0) &&
    ((parseInt(elem.getTopPosition(), 10) + parseInt(elem.getHeight(), 10)) <= window.innerHeight) &&
    ((parseInt(elem.getLeftPosition(), 10) + parseInt(elem.getWidth(), 10)) <= window.innerWidth))
  }

  getIndexOfWindow (window) {
    let index = -1
    for (let element of this._windows) {
      index++
      if (window === element) {
        return index
      }
    }
  }

  removeWindow (window, e) {
    this._windows.splice(this.getIndexOfWindow(window), 1)
    e.detail.remove()
  }
}

export default WindowHandler
