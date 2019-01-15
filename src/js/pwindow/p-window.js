/**
 * Module for PWindow.
 *
 * @module src/js/pwindow/p-window.js
 * @author Claes Weyde
 * @version 1.0.0
 */
import cssTemplate from './css.js'
import htmlTemplate from './html.js'

/**
 * A class which handles a HTML-window containing content.
 *
 * @class PWindow
 * @extends window.HTMLElement
 */
class Pwindow extends window.HTMLElement {
  /**
   * Creates an instance of PWindow.
   *
   * @param {number} width, the height of the window in px.
   * @param {number} height, the width of the window in px.
   *
   * @memberof PWindow
   * @constructor
   */
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

  /**
   * A function which returns the header element of the window.
   *
   * @return {HTMLElement} the header of the window.
   *
   * @memberof PWindow
   */
  getContainerHeader () {
    return this._containerHeader
  }

  /**
   * A function which returns the container of the window.
   *
   * @return {HTMLElement} the container of the window.
   *
   * @memberof PWindow
   */
  getContainer () {
    return this._container
  }

  /**
   * A function which returns whether the window is being dragged.
   *
   * @return {boolean} whether the window is being dragged.
   *
   * @memberof PWindow
   */
  getDragActive () {
    return this._dragActive
  }

  /**
   * A function which sets whether the window is beind dragged or not.
   *
   * @param {boolean} value, true/false whether the window is being dragged.
   *
   * @memberof PWindow
   */
  setDragActive (value) {
    this._dragActive = value
  }

  /**
   * A function which returns the pointer x-position before mouse being moved.
   *
   * @return {number} the x-position of the pointer in px.
   *
   * @memberof PWindow
   */
  getInitialPointerPosX () {
    return this._initialPointerPosX
  }

  /**
   * A function which sets the pointer x-position before mouse being moved.
   *
   * @param {number} pos x-position of the pointer in px.
   *
   * @memberof PWindow
   */
  setInitialPointerPosX (pos) {
    this._initialPointerPosX = pos
  }

  /**
   * A function which returns the pointer y-position before mouse being moved.
   *
   * @return {number} the y-position of the pointer in px.
   *
   * @memberof PWindow
   */
  getInitialPointerPosY () {
    return this._initialPointerPosY
  }

  /**
   * A function which sets the pointer y-position before mouse being moved.
   *
   * @param {number} pos, the y-position of the pointer in px.
   *
   * @memberof PWindow
   */
  setInitialPointerPosY (pos) {
    this._initialPointerPosY = pos
  }

  /**
   * A function which returns the offset x-position of the window from the mouse.
   *
   * @return {number} the x-position of the offset from the mouse pointer in px.
   *
   * @memberof PWindow
   */
  getXPosOffset () {
    return this._posOffsetX
  }

  /**
   * A function which sets the offset x-position of the window from the mouse.
   *
   * @param {number} pos, the x-position of the offset from the mouse pointer in px.
   *
   * @memberof PWindow
   */
  setXPosOffset (pos) {
    this._posOffsetX = pos
  }

  /**
   * A function which returns the offset y-position of the window from the mouse.
   *
   * @return {number} the y-position of the offset from the mouse pointer in px.
   *
   * @memberof PWindow
   */
  getYPosOffset () {
    return this._posOffsetY
  }

  /**
   * A function which sets the offset y-position of the window from the mouse.
   *
   * @param {number} pos, the y-position of the offset from the mouse pointer in px.
   *
   * @memberof PWindow
   */
  setYPosOffset (pos) {
    this._posOffsetY = pos
  }

  /**
   * A function which returns the current x-position of the mouse pointer.
   *
   * @return {number} the current x-position of the mouse pointer in px.
   *
   * @memberof PWindow
   */
  getCurrentPointerPosX () {
    return this._currentPointerPosX
  }

  /**
   * A function which sets the current x-position of the mouse pointer.
   *
   * @param {number} pos, the current x-position of the mouse pointer in px.
   *
   * @memberof PWindow
   */
  setCurrentPointerPosX (pos) {
    this._currentPointerPosX = pos
  }

  /**
   * A function which returns the current y-position of the mouse pointer.
   *
   * @return {number} the current y-position of the mouse pointer in px.
   *
   * @memberof PWindow
   */
  getCurrentPointerPosY () {
    return this._currentPointerPosY
  }

  /**
   * A function which sets the current y-position of the mouse pointer.
   *
   * @param {number} the current y-position of the mouse pointer in px.
   *
   * @memberof PWindow
   */
  setCurrentPointerPosY (pos) {
    this._currentPointerPosY = pos
  }

  /**
   * A function which sets the 'transform' property of the container.
   *
   * @param {String} setString, the transform string.
   *
   * @memberof PWindow
   */
  setContainerStyleTransform (setString) {
    this._container.style.transform = setString
  }

  /**
   * A function which sets the z-index of the container.
   *
   * @param {number} zIndex, the z-index of the container.
   *
   * @memberof PWindow
   */
  setZIndex (zIndex) {
    this._container.style.zIndex = zIndex
  }

  /**
   * A function which returns the z-index of the container.
   *
   * @return {number} the z-index of the container.
   *
   * @memberof PWindow
   */
  getZIndex () {
    return this._container.getAttribute('z-index')
  }

  /**
   * A function which sets the width of the container.
   *
   * @param {number} width, the width of the container.
   *
   * @memberof PWindow
   */
  setWidth (width) {
    this._container.style.width = width
  }

  /**
   * A function which returns the width of the container.
   *
   * @return {number} the width of the container.
   *
   * @memberof PWindow
   */
  getWidth () {
    return this._container.style.width
  }

  /**
   * A function which sets the height of the container.
   *
   * @param {number} height, the height of the container.
   *
   * @memberof PWindow
   */
  setHeight (height) {
    this._container.style.height = height
  }

  /**
   * A function which returns the height of the container.
   *
   * @return {number} the height of the container.
   *
   * @memberof PWindow
   */
  getHeight () {
    return this._container.style.height
  }

  /**
   * A function which returns the left position of the container.
   *
   * @return {number} the px value of the upper left corner of the container.
   *
   * @memberof PWindow
   */
  getLeftPosition () {
    return this._container.style.left
  }

  /**
   * A function which sets the left position of the container.
   *
   * @param {number} leftPos, the value of the upper left corner of the container.
   *
   * @memberof PWindow
   */
  setLeftPosition (leftPos) {
    this._container.style.left = leftPos + 'px'
  }

  /**
   * A function which returns the top position of the container.
   *
   * @return {number} the px value of the top position of the container.
   *
   * @memberof PWindow
   */
  getTopPosition () {
    return this._container.style.top
  }

  /**
   * A function which sets the top position of the container.
   *
   * @param {number} topPos, the top position value of the container.
   *
   * @memberof PWindow
   */
  setTopPosition (topPos) {
    this._container.style.top = topPos + 'px'
  }

  /**
   * A function which returns the right position of the container.
   *
   * @return {number} the px value of the right position of the container.
   *
   * @memberof PWindow
   */
  getRightPosition () {
    return this._container.style.right
  }

  /**
   * A function which sets the right position of the container.
   *
   * @param {number} rightPos, the right position value of the container.
   *
   * @memberof PWindow
   */
  setRightPosition (rightPos) {
    this._container.style.right = rightPos + 'px'
  }

  /**
   * A function which returns the bottom position of the container.
   *
   * @return {number} the px value of the bottom position of the container.
   *
   * @memberof PWindow
   */
  getBottomPosition () {
    return this._container.style.bottom
  }

  /**
   * A function which sets the bottom position of the container.
   *
   * @param {number} bottomPos, the bottom position value of the container.
   *
   * @memberof PWindow
   */
  setBottomPosition (bottomPos) {
    this._container.style.bottom = bottomPos + 'px'
  }

  /**
   * A function which returns the bounding rectangle of the container.
   *
   * @return {[]} the array containing the bounding rectangle of the container.
   *
   * @memberof PWindow
   */
  getBoundingRect () {
    return this._container.getBoundingClientRect()
  }
}

export default Pwindow
