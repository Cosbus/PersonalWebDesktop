/**
 * Module for WindowHandler.
 *
 * @module src/js/utils/WindowHandler.js
 * @author Claes Weyde
 * @version 1.0.0
 */

/**
 * A class which handles windows in an application
 *
 * @class WindowHandler
 */
class WindowHandler {
  /**
   * Creates an instance of WindowHandler.
   *
   * @param {HTMLElement} container, the container in which the windows being handled can operate.
   *
   * @memberof WindowHandler
   * @constructor
   */
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

    // Listeners for windowEvents
    this._windowRemovedEvent = new window.CustomEvent('windowRemoved')
  }

  /**
   * A function returning the highest Z-number of the windows.
   *
   * @return {number} The highest z-number of the windows being handled by the WindowHandler.
   *
   * @memberof WindowHandler
   */
  getHighestZindex () {
    return this._highestZindex
  }

  /**
   * A function which increments the highest Z-number of the windows.
   *
   * @memberof WindowHandler
   */
  incrementZindex () {
    this._highestZindex++
  }

  /**
   * A function which removes the focus of all the windows currently
   * being handled by the WindowHandler.
   *
   * @memberof WindowHandler
   */
  unfocusAllWindows () {
    this._windows.forEach(function (element) {
      element.isNotFocused()
    })
  }

  /**
   * A function which finds a window being handled by the WindowHandler from an
   * event which has happened.
   *
   * @param {event} event, the event which was triggered.
   * @return {HTMLElement} the window connected to the event.
   *
   * @memberof WindowHandler
   */
  findWindowFromEvent (event) {
    for (let window of this._windows) {
      if (event.target === window) {
        return window
      }
    }
  }

  /**
   * A function for setting which window out of the windows which is currently active.
   *
   * @return {HTMLElement} the window which is to be set as the currently active window.
   *
   * @memberof WindowHandler
   */
  setActiveWindow (window) {
    this._activeWindow = window
    // this._activeWindow.setZIndex(this._highestZindex)
    // this._activeWindow.isFocused()
  }

  /**
   * A function setting the window with the highest Z-number out of the windows.
   *
   * @param {HTMLElement} window, the window for which the z-number is set.
   *
   * @memberof WindowHandler
   */
  setWindowHighestZIndex (window) {
    window.setZIndex(this._highestZindex)
  }

  /**
   * A function settting the window which is focused.
   *
   * @param {HTMLElement} window, the window element which is to be focused.
   *
   * @memberof WindowHandler
   */
  setWindowIsFocused (window) {
    window.isFocused()
    window.focus()
  }

  /**
   * A function returning the window which is currently active.
   *
   * @return {HTMLElement} the currently active window.
   *
   * @memberof WindowHandler
   */
  getActiveWindow () {
    return this._activeWindow
  }

  /**
   * A function which adds a new window to the windows being handled by the WindowHandler.
   *
   * @param {HTMLElement} window, the window to add.
   * @param {number} width, the width in px of the window being added.
   * @param {number} height, the height in px of the window being added.
   *
   * @memberof WindowHandler
   */
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

  /**
   * A function which determines if a given element is in the current viewport.
   *
   * @param {HTMLElement} elem, the element which is to be evaluated.
   * @return {boolean} returns true/false whether the element is in the viewport.
   *
   * @memberof WindowHandler
   */
  _isInViewport (elem) {
    return ((parseInt(elem.getTopPosition(), 10) >= 0) &&
    (parseInt(elem.getLeftPosition(), 10) >= 0) &&
    ((parseInt(elem.getTopPosition(), 10) + parseInt(elem.getHeight(), 10)) <= window.innerHeight) &&
    ((parseInt(elem.getLeftPosition(), 10) + parseInt(elem.getWidth(), 10)) <= window.innerWidth))
  }

  /**
   * A function returning the index of a given window in the window-array
   * handled by the WindoHandler.
   *
   * @param {HTMLElement} window, the window.
   * @return {number} the index of the window.
   *
   * @memberof WindowHandler
   */
  getIndexOfWindow (window) {
    let index = -1
    for (let element of this._windows) {
      index++
      if (window === element) {
        return index
      }
    }
  }

  /**
   * A function which removes a given window from the WindowHandler.
   *
   * @param {HTMLElement} window, the window to remove.
   * @param {event} e, an event containing the window element to remove.
   *
   * @memberof WindowHandler
   */
  removeWindow (window, e) {
    this._windows.splice(this.getIndexOfWindow(window), 1)
    e.detail.remove()
  }
}

export default WindowHandler
