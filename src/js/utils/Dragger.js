/**
 * Module for Dragger.
 *
 * @module src/js/utils/Dragger.js
 * @author Claes Weyde
 * @version 1.0.0
 */

/**
 * A class which handles dragging of elements in an application.
 *
 * @class Dragger
 */
class Dragger {
  /**
   * Creates an instance of Dragger.
   *
   * @param {HTMLElement} container, the container in which the element is active.
   * @param {WindowHandler} handler, a WindowHandler object which handles the elements within
   *                                 the container.
   *
   * @memberof Dragger
   * @constructor
   */
  constructor (container, handler) {
    this._container = container
    this._windowHandler = handler
  }

  /**
   * A function which activates the listeners for the element.
   *
   * @memberof Dragger
   */
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
      }
    }, false)
  }

  /**
   * A function which starts the dragging action of the element.
   *
   * @param {HTMLElement} window, the window/element being dragged.
   * @param {event} event, the event starting the dragging action.
   *
   * @memberof Dragger
   */
  dragStart (window, event) {
    window.setInitialPointerPosX(event.clientX - window.getXPosOffset())
    window.setInitialPointerPosY(event.clientY - window.getYPosOffset())

    if (event.composedPath()[0] === window.getContainerHeader()) {
      window.setDragActive(true)
    }
  }

  /**
   * A function which performs the dragging action of the element.
   *
   * @param {HTMLElement} window, the window/element being dragged.
   * @param {event} event, the event starting the dragging action.
   *
   * @memberof Dragger
   */
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

  /**
   * A function which ends the dragging action of the element.
   *
   * @param {HTMLElement} window, the window/element being dragged.
   *
   * @memberof Dragger
   */
  dragEnd (window) {
    window.setInitialPointerPosX(window.getCurrentPointerPosX())
    window.setInitialPointerPosY(window.getCurrentPointerPosY())

    window.setDragActive(false)
  }

  /**
   * A function setting the new position of the window/element being dragged.
   *
   * @param {HTMLElement} window, the window/element being dragged.
   *
   * @memberof Dragger
   */
  _setNewElementPos (window) {
    window.setContainerStyleTransform('translate3d(' + window.getCurrentPointerPosX() + 'px, ' +
     window.getCurrentPointerPosY() + 'px, 0)')
  }
}

export default Dragger
