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

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    // set working elements
    this._container = this.shadowRoot.querySelector('#mainContainer')
    this._workSpace = this.shadowRoot.querySelector('#workSpace')
    this._containerHeader = this.shadowRoot.querySelector('#containerHeader')
  }

  connectedCallback () {
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

  setZIndex (zIndex) {
    this._container.style.zIndex = zIndex
  }

  getZIndex () {
    return this._container.getAttribute('z-index')
  }

  setWidth (width) {
    this._container.style.width = width
  }

  getWidth () {
    return this._container.style.width
  }

  setHeight (height) {
    this._container.style.height = height
  }

  getHeight () {
    return this._container.style.height
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

  getRightPosition () {
    return this._container.style.right
  }

  setRightPosition (rightPos) {
    this._container.style.right = rightPos + 'px'
  }

  getBottomPosition () {
    return this._container.style.bottom
  }

  setBottomPosition (bottomPos) {
    this._container.style.bottom = bottomPos + 'px'
  }

  getBoundingRect () {
    return this._container.getBoundingClientRect()
  }
}

export default Pwindow
