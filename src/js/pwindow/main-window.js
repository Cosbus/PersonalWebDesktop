import Pwindow from './p-window.js'
import SubWindow from './sub-window.js'

class MainWindow extends Pwindow {
  constructor () {
    super()

    // Variables for keeping track of the subWindows
    this._windows = []
    this._highestZindex = 0
    this._activeWindow = this
    this._firstWindowStartingTopPos = 20
    this._firstWindowStartingLeftPos = 20
    this._nextWindowTopOffset = 20
    this._nextWindowLeftOffset = 20
    this._headerSize = 20

    // Variables for the application buttons
    this._applications = []
    this._buttonWidth = 40
    this._buttonHeight = 40
    this._buttonSpacer = 5

    // Remove elements which should not be there for main window
    this.shadowRoot.querySelector('#closeWindowButton').remove()
    this.shadowRoot.querySelector('#containerHeader').remove()

    // Remove and add classes
    this._container.classList.remove('defaultSetting')
    this._container.classList.add('mainWindow')
    this._workSpace.style.height = '100%'
    this._workSpace.classList.add('workSpaceMainWindow')

    // Add Apps
    this._AppContainer = this.shadowRoot.querySelector('#expandBubble')
    this._AppContIdleHeight = '30px'
    this._AppContIdleWidth = '30px'
  }

  connectedCallback () {
    this._container.addEventListener('click', e => {
      for (let application of this._applications) {
        if (e.target === application) {
          this.addSubWindow(new SubWindow(application.getNewApplication()),
            application.getApplication(application.getNoOfApplicationInstances() - 1).getWidthRequired(),
            application.getApplication(application.getNoOfApplicationInstances() - 1).getHeightRequired() + this._headerSize)
        }
      }
    })

    this._AppContainer.addEventListener('mouseover', e => {
      // Make sure element moves to front
      this._highestZindex++
      this._AppContainer.style.zIndex = this._highestZindex
      this._applications.forEach((element) => {
        element.style.visibility = 'visible'
      })

      // And change size of bubble
      this._AppContainer.style.width = `${this._applications.length * (this._buttonWidth + this._buttonSpacer) +
      2 * this._buttonSpacer}px`
      this._AppContainer.style.height = `${this._buttonHeight + 2 * this._buttonSpacer}px`
    })
    this._AppContainer.addEventListener('mouseout', e => {
      this._applications.forEach((element) => {
        element.style.visibility = 'hidden'
      })
      this._AppContainer.style.width = this._AppContIdleWidth
      this._AppContainer.style.height = this._AppContIdleHeight
    })

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

  addApplication (application) {
    if (this._applications.length > 0) {
      application.setLeftPosition(`${parseInt(this._applications[this._applications.length - 1].getLeftPosition(), 10) +
      this._buttonWidth + this._buttonSpacer}`)
    } else {
      application.setLeftPosition(5)
    }
    this._applications.push(application)
    this._AppContainer.appendChild(application)
  }

  addSubWindow (subWindow, width, height) {
    if (this._windows.length === 0) {
      subWindow.setLeftPosition(this._firstWindowStartingLeftPos)
      subWindow.setTopPosition(this._firstWindowStartingTopPos)
    } else {
      let lastWindow = this._windows[this._windows.length - 1]
      // Dont stack windows right on top of each other
      subWindow.setLeftPosition(`${parseInt(lastWindow.getLeftPosition(), 10) +
         this._nextWindowLeftOffset}`)
      subWindow.setTopPosition(`${parseInt(lastWindow.getTopPosition(), 10) +
        this._nextWindowTopOffset}`)
    }
    this._highestZindex += 1
    subWindow.setZIndex(this._highestZindex)
    subWindow.setWidth(`${width}px`)
    subWindow.setHeight(`${height}px`)

    if (!this._isInViewport(subWindow)) { // If the new window falls out of viewport
      this._firstWindowStartingLeftPos += 10
      subWindow.setLeftPosition(this._firstWindowStartingLeftPos)
      subWindow.setTopPosition(this._firstWindowStartingTopPos)
    }

    this._windows.push(subWindow)

    this._workSpace.appendChild(subWindow)
  }

  _isInViewport (elem) {
    return ((parseInt(elem.getTopPosition(), 10) >= 0) &&
    (parseInt(elem.getLeftPosition(), 10) >= 0) &&
    ((parseInt(elem.getTopPosition(), 10) + parseInt(elem.getHeight(), 10)) <= window.innerHeight) &&
    ((parseInt(elem.getLeftPosition(), 10) + parseInt(elem.getWidth(), 10)) <= window.innerWidth))
  }
}

export default MainWindow
