
import Pwindow from './p-window.js'

class MainWindow extends Pwindow {
  constructor () {
    super()

    // Variables for keeping track of the subWindows
    this._windows = []
    this._highestZindex = 0
    this._activeWindow = this

    this._container.classList.remove('defaultSetting')
    this._container.classList.add('mainWindow')
  }

  connectedCallback () {
    this._container.addEventListener('mousedown', e => {
      // Make window appear in front
      this._highestZindex += 1
      for (let window of this._windows) {
        if (e.target === window) {
          this._activeWindow = window
          this._activeWindow.setZIndex(this._highestZindex)
          this._dragStart(this._activeWindow, e)
        }
      }

      // Handle drag
    }, false)

    this._container.addEventListener('mousemove', e => {
      this._drag(this._activeWindow, e)
    }, false)

    this._container.addEventListener('mouseup', e => {
      for (let window of this._windows) { // Find the specific window
        if (e.target === window) {
          this._activeWindow = window
          this._dragEnd(this._activeWindow, e)
        }
      }
    }, false)
  }

  _dragStart (window, event) {
    window.setInitialPointerPosX(event.clientX - window.getXPosOffset())
    window.setInitialPointerPosY(event.clientY - window.getYPosOffset())

    if (event.composedPath()[0] === window.getContainerHeader()) {
      window.setDragActive(true)
    }
  }

  _drag (window, event) {
    if (window.getDragActive()) {
      event.preventDefault()

      window.setCurrentPointerPosX(event.clientX - window.getInitialPointerPosX())
      window.setCurrentPointerPosY(event.clientY - window.getInitialPointerPosY())

      window.setXPosOffset(window.getCurrentPointerPosX())
      window.setYPosOffset(window.getCurrentPointerPosY())

      this._setNewElementPos(window, event)
    }
  }

  _dragEnd (window) {
    window.setInitialPointerPosX(window.getCurrentPointerPosX())
    window.setInitialPointerPosY(window.getCurrentPointerPosY())

    window.setDragActive(false)
  }

  _setNewElementPos (window) {
    window.setContainerStyleTransform('translate3d(' + window.getCurrentPointerPosX() + 'px, ' +
     window.getCurrentPointerPosY() + 'px, 0)')
  }

  addSubWindow (window) {
    if (this._highestZindex === 0) {
      window.setLeftPosition(20)
      window.setTopPosition(20)
    } else {
      // Dont stack windows right on top of each other
      window.setLeftPosition(`${parseInt(this._windows[this._windows.length - 1].getLeftPosition(), 10) + 10}`)
      window.setTopPosition(`${parseInt(this._windows[this._windows.length - 1].getTopPosition(), 10) + 10}`)
    }
    this._highestZindex += 1
    window.setZIndex(this._highestZindex)

    this._windows.push(window)

    this._workSpace.appendChild(window)
  }
}

export default MainWindow
