import cssTemplate from './css.js'
import htmlTemplate from './html.js'

class Pwindow extends window.HTMLElement {
  constructor (width = 30, height = 30) {
    super()
    this._width = width
    this._height = height
    this.attachShadow({ mode: 'open' })

    this._zIndex = 0

    // Variables for the drag action
    this._dragActive = false
    this._initialPointerPosX = 0
    this._initialPointerPosY = 0
    this._posOffsetX = 0
    this._posOffsetY = 0
    this._currentPointerPosX = 0
    this._currentPointerPosY = 0

    /* Variables for the drag action
    this._dragActive = false
    this._initialPointerPosX = 0
    this._initialPointerPosY = 0
    this._xPosOffset = 0
    this._yPosOffset = 0
*/
    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    // set working elements
    this._container = this.shadowRoot.querySelector('#mainContainer')
    this._workSpace = this.shadowRoot.querySelector('#workSpace')
    this._containerHeader = this.shadowRoot.querySelector('#containerHeader')
  }

  /* makeMainWindow () {
    this._container.classList.remove('defaultSetting')
    this._container.classList.add('mainWindow')
  } */

  connectedCallback () {
    this._container.addEventListener('click', e => {
      console.log('clicked')
      // Closebutton clicked
      if (e.target === this.shadowRoot.querySelector('#closeWindowButton')) {
        e.target.parentNode.parentNode.remove()
      }
    })

  /*  console.log(document.querySelector('body'))
    this._container.addEventListener('mousedown', e => {
      console.log('mouse-down')
      // Make window appear in front
      let subWindowClickEvent = new window.CustomEvent('subWindowClicked',
        { detail: this._zIndex })
      this.dispatchEvent(subWindowClickEvent)

      // Handle drag
      this._dragStart(e)
    })

    this._container.addEventListener('mousemove', this._drag.bind(this))
    this._container.addEventListener('mouseup', this._dragEnd.bind(this)) */
  }

  getContainerHeader () {
    return this._containerHeader
  }

  getContainer () {
    return this._container
  }

  getDragActive () {
    return this._dragActive
  }

  setDragActive (value) {
    this._dragActive = value
  }

  getInitialPointerPosX () {
    return this._initialPointerPosX
  }

  setInitialPointerPosX (pos) {
    this._initialPointerPosX = pos
  }

  getInitialPointerPosY () {
    return this._initialPointerPosY
  }

  setInitialPointerPosY (pos) {
    this._initialPointerPosY = pos
  }

  getXPosOffset () {
    return this._posOffsetX
  }

  setXPosOffset (pos) {
    this._posOffsetX = pos
  }

  getYPosOffset () {
    return this._posOffsetY
  }

  setYPosOffset (pos) {
    this._posOffsetY = pos
  }

  getCurrentPointerPosX () {
    return this._currentPointerPosX
  }

  setCurrentPointerPosX (pos) {
    this._currentPointerPosX = pos
  }

  getCurrentPointerPosY () {
    return this._currentPointerPosY
  }

  setCurrentPointerPosY (pos) {
    this._currentPointerPosY = pos
  }

  setContainerStyleTransform (setString) {
    this._container.style.transform = setString
  }
  /* _dragStart (event) {
    this._initialPointerPosX = event.clientX - this._xPosOffset
    this._initialPointerPosY = event.clientY - this._yPosOffset

    console.log(event.target)
    if (event.target === this._containerHeader) {
      this._dragActive = true
    }
  }

  _drag (event) {
    if (this._dragActive) {
      event.preventDefault()

      this._currentPointerPosX = event.clientX - this._initialPointerPosX
      this._currentPointerPosY = event.clientY - this._initialPointerPosY

      this._xPosOffset = this._currentPointerPosX
      this._yPosOffset = this._currentPointerPosY

      this._setNewElementPos()
    }
  }

  _dragEnd () {
    this._initialPointerPosX = this._currentPointerPosX
    this._initialPointerPosY = this._currentPointerPosY

    this._dragActive = false
  }

  _setNewElementPos () {
    this._container.style.transform = 'translate3d(' + this._currentPointerPosX + 'px, ' +
     this._currentPointerPosY + 'px, 0)'
  } */

  setZIndex (zIndex) {
    this._container.style.zIndex = zIndex
  }

  getZIndex () {
    return this._container.getAttribute('z-index')
  }

  getLeftPosition () {
    return this._container.style.left
  }

  setLeftPosition (leftPos) {
    this._container.style.left = leftPos + 'px'
  }

  getTopPosition () {
    return this._container.style.top
  }

  setTopPosition (topPos) {
    this._container.style.top = topPos + 'px'
  }

  /* addWindow (window) {
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

    window.addEventListener('subWindowClicked', e => {
      this._highestZindex += 1
      window.setZIndex(this._highestZindex)
    })

    this._workSpace.appendChild(window)
  } */
}

export default Pwindow
