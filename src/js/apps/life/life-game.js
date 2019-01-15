/**
 * Module for Life.
 *
 * @module src/js/apps/life/life-game.js
 * @author Claes Weyde
 * @version 1.0.0
 */

import cssTemplate from './css.js'
import htmlTemplate from './html.js'
import WindowHandler from '../../utils/WindowHandler.js'
import Dragger from '../../utils/Dragger.js'
import InputView from '../../utils/inputView/input-view.js'
import SubWindow from '../../pwindow/sub-window.js'
import InfoView from '../../utils/infoView/info-view.js'

/**
 * A class which handles a life game.
 *
 * @class Life
 * @extends window.HTMLElement
 **/
class LifeGame extends window.HTMLElement {
  /**
   * Creates an instance of Life.
   *
   * @memberof Life
   * @constructor
   */
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._canvas = this.shadowRoot.querySelector('#canvas')
    this._mainDiv = this.shadowRoot.querySelector('#mainDiv')
    this._configArea = this.shadowRoot.querySelector('#configArea')
    this._clearButton = this.shadowRoot.querySelector('#clearButton')
    this._drawShapeButton = this.shadowRoot.querySelector('#shapeButton')
    this._stepForwardButton = this.shadowRoot.querySelector('#stepButton')
    this._runButton = this.shadowRoot.querySelector('#runButton')
    this._stopButton = this.shadowRoot.querySelector('#stopButton')
    this._snapShotButton = this.shadowRoot.querySelector('#snapshotButton')

    this._mousePressed = false
    this._lastXPos = 0
    this._lastYPos = 0
    this._ctx = this._canvas.getContext('2d')
    this._ctx.strokeStyle = 'black'

    this._isFocused = true

    this._arr = []
    this._nextArr = []
    this._intervalID = null
    this._noIterations = 0
    this._lifeInfo = this.shadowRoot.querySelector('#lifeInfo')
    this._updateTime = 100

    this._windowHandler = new WindowHandler(this._mainDiv)
    this._dragger = new Dragger(this._mainDiv, this._windowHandler)

    this._height = 400
    this._width = 450
    this._configAreaSize = 77
    this._icon = ''

    this._containerHeader = null
    this._mainDropDownActive = false
    this._aboutWindowOpen = true

    this._headerTemplate = this.shadowRoot.querySelector('#headerTemplate')
      .content.cloneNode(true)
  }

  /**
   * A function which is called when the game object is placed on the global window.
   *
   * @memberof Life
   */
  connectedCallback () {
    this._createArray(this._arr)
    this._createArray(this._nextArr)
    this._canvas.addEventListener('mousedown', this._startDraw.bind(this))
    this._canvas.addEventListener('mouseup', this._endDraw.bind(this))
    this._canvas.addEventListener('mousemove', this._performDraw.bind(this))
    this._canvas.addEventListener('mouseleave', this._endDraw.bind(this))
    this._configArea.addEventListener('click', e => {
      if (this._mainDropDownActive) {
        this._closeDropDown()
      }
      switch (e.target) {
        case this._clearButton:
          this._noIterations = 0
          this._lifeInfo.textContent = `Iterations: ${this._noIterations}`
          this._clearCanvas()
          break
        case this._drawShapeButton:
          this._drawShape()
          break
        case this._stepForwardButton:
          this._stepForward()
          break
        case this._runButton:
          this._runLife()
          break
        case this._stopButton:
          clearInterval(this._intervalID)
          break
        case this._snapShotButton:
          this._thisTakeSnapShot()
          break
        default:
          break
      }
    })

    this._containerHeader.addEventListener('click', event => {
      switch (event.target) {
        case this._containerHeader.querySelector('#configure'):
          if (!this._mainDropDownActive) {
            this._mainDropDownActive = true
            this._containerHeader.querySelector('.dropdown-content').style.display = 'block'
          } else {
            this._closeDropDown()
          }
          break
        case this._containerHeader.querySelector('#dropdown-about'):
          this._openAboutWindow()
          this._closeDropDown()
          break
        default:
          this._closeDropDown()
          break
      }
    })

    this._sendImageEvent = new window.CustomEvent('sentimage', { detail: this._snapShotURL })
  }

  /**
   * A function which closes the dropdown menu.
   *
   * @memberof Life
   */
  _closeDropDown () {
    this._mainDropDownActive = false
    this._containerHeader.querySelector('.dropdown-content').style.display = 'none'
  }

  /**
   * A function which opens a window containing information regarding the Life Game.
   *
   * @memberof Life
   */
  _openAboutWindow () {
    let aboutView = new InfoView('About "Conways game of life"', '"Conways game of life" is a game which is fully determined' +
    ' by the initial state of the game. Originally devised by the British mathematician John Horton' +
    ' in 1970 it shows how an emerging complexity may arise from a simple set of rules. The game' +
    ' takes place on a two-dimensional grid of square cells where every cell can be in a state of' +
    ' life or death. Depending on the state of the 8 surrounding cells the cell then either continues to live' +
    ' or dies off. A dead cell may be repopulated depending on its surrounding cells. The rules used here are:\n\n' +
    '1. A live cell having less than 2 live neighbours die.\n' +
    '2. A live cell with 2 or 3 neighbours live on. \n' +
    '3. A live cell with more than 3 live neighbours die. \n' +
    '4. A dead cell with exactly 3 live neighbours becomes alive.')
    let aboutWindow = new SubWindow(aboutView, false)
    this._windowHandler.addWindow(aboutWindow, aboutView.getWidthRequired(),
      aboutView.getHeightRequired())
    this._dragger.startListening()
    this._aboutWindowOpen = true
    aboutView.addEventListener('closeView', e => {
      this._aboutWindowOpen = false
    })
  }

  /**
   * A function which handles the starting action of drawing on the canvas.
   *
   * @param {event} event, the event starting the drawing on the canvas
   *
   * @memberof Life
   */
  _startDraw (event) {
    this._closeDropDown()
    this._mousePressed = true

    this._draw(event.pageX - this._canvas.getBoundingClientRect().x,
      event.pageY - this._canvas.getBoundingClientRect().y, false)
  }

  /**
   * A function which handles the drawing action on the canvas.
   *
   * @param {event} event, the event of drawing on the canvas
   *
   * @memberof Life
   */
  _performDraw (event) {
    if (this._mousePressed) {
      this._draw(event.pageX - this._canvas.getBoundingClientRect().x,
        event.pageY - this._canvas.getBoundingClientRect().y, true)
    }
  }

  /**
   * A function which handles the action of ending the drawing on the canvas.
   *
   * @param {event} event, the event which ends the drawing on the canvas
   *
   * @memberof Life
   */
  _endDraw (event) {
    this._mousePressed = false
  }

  /**
   * A function which draws on the canvas.
   *
   * @param {number} xPos, the x-position of the pointer.
   * @param {number} yPos, the y-position of the pointer.
   * @param {boolean} isMoved, a parameter keeping track of if the pointer is moved.
   *
   * @memberof Life
   */
  _draw (xPos, yPos, isMoved) {
    if (isMoved) {
      this._initParams()
      this._ctx.moveTo(this._lastXPos, this._lastYPos)
      this._ctx.lineTo(xPos, yPos)
      this._ctx.stroke()
      this._ctx.closePath()
    }
    this._lastXPos = xPos
    this._lastYPos = yPos
  }

  /**
   * A function which clears the canvas
   *
   * @memberof Life
   */
  _clearCanvas () {
    this._ctx.setTransform(1, 0, 0, 1, 0, 0)
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height)
  }

  /**
   * A function which handles the drawing of a selected shape on the canvas.
   *
   * @memberof Life
   */
  _drawShape () {
    let selection = this.shadowRoot.querySelector('#selShape')
    this._initParams()
    switch (selection.options[selection.selectedIndex].value) {
      case 'Rectangle':
        this._drawRectangle()
        break
      case 'Circle':
        this._drawCircle()
        break
      case 'Triangle':
        this._drawTriangle()
        break
      case 'Random':
        this._randomPattern()
        this._drawPatternOnCanvas()
        break
      default:
        break
    }
  }

  /**
   * A function which draws a rectangle on the canvas.
   *
   * @memberof Life
   */
  _drawRectangle () {
    this._ctx.rect(this._canvas.clientWidth / 4, this._canvas.clientHeight / 4, this._canvas.clientWidth / 2, this._canvas.clientHeight / 2)
    this._ctx.closePath()
    this._ctx.stroke()
  }

  /**
   * A function which draws a circle on the canvas.
   *
   * @memberof Life
   */
  _drawCircle () {
    this._ctx.arc(this._canvas.clientWidth / 2, this._canvas.clientHeight / 2, this._canvas.clientHeight / 4, 0, 2 * Math.PI)
    this._ctx.closePath()
    this._ctx.stroke()
  }

  /**
   * A function which draws a triangle on the canvas.
   *
   * @memberof Life
   */
  _drawTriangle () {
    this._ctx.moveTo(this._canvas.clientWidth / 4, this._canvas.clientHeight / 4)
    this._ctx.lineTo(this._canvas.clientWidth / 4, this._canvas.clientHeight * (3 / 4))
    this._ctx.lineTo(this._canvas.clientWidth * (3 / 4), this._canvas.clientHeight * (3 / 4))

    this._ctx.closePath()
    this._ctx.stroke()
  }

  /**
   * A function which draws a random on the canvas.
   *
   * @memberof Life
   */
  _randomPattern () {
    for (let j = 0; j < this._height; j++) {
      for (let k = 0; k < this._width; k++) {
        this._arr[j][k] = Math.round(Math.random())
      }
    }
  }

  /**
   * A function which draws a pattern on the canvas based on a two-dimensional grid.
   *
   * @memberof Life
   */
  _drawPatternOnCanvas () {
    for (let j = 1; j < this._height; j++) {
      for (let k = 1; k < this._width; k++) {
        if (this._arr[j][k] === 1) {
          this._ctx.fillStyle = 'black'
          this._ctx.fillRect(k, j, 1, 1)
        }
      }
    }
  }

  /**
   * A function which scans the canvas and places the pattern in a two-dimensional grid.
   *
   * @memberof Life
   */
  _getPatternFromCanvas () {
    let currentCanvasImage = this._ctx.getImageData(0, 0, this._width, this._height)
    let j = 0
    let k = 0
    for (let i = 0; i < currentCanvasImage.data.length; i += 4) {
      if (currentCanvasImage.data[i] === 0 &&
        currentCanvasImage.data[i + 1] === 0 &&
        currentCanvasImage.data[i + 2] === 0 &&
        currentCanvasImage.data[i + 3] !== 0) {
        this._arr[j][k] = 1
      } else {
        this._arr[j][k] = 0
      }
      k++
      if (k > this._width) {
        j++
        k = 1
      }
    }
  }

  /**
   * A function which steps forward one step in the game of life.
   *
   * @memberof Life
   */
  _stepForward () {
    this._getPatternFromCanvas()
    this._updateArray()
    this._clearCanvas()
    this._drawPatternOnCanvas()
    this._lifeInfo.textContent = `Iterations: ${this._noIterations}`
    this._noIterations++
  }

  /**
   * A function which initializes the parameters for the canvas.
   *
   * @memberof Life
   */
  _initParams () {
    this._ctx.beginPath()
    let selectors = this.shadowRoot.querySelector('#selWidth')
    this._ctx.lineWidth = selectors.options[selectors.selectedIndex].value
    this._ctx.lineJoin = 'round'
  }

  /**
   * A function which returns the width required for the Life window.
   *
   * @return {number} the width required in px.
   *
   * @memberof Life
   */
  getWidthRequired () {
    return this._width
  }

  /**
   * A function which returns the height required for the Life window.
   *
   * @return {number} the height required in px.
   *
   * @memberof Life
   */
  getHeightRequired () {
    return (this._height + this._configAreaSize)
  }

  /**
   * A function which creates a two-dimensional array to be used for the game of life.
   *
   * @param {[number]} arr, the array to be filled with arrays.
   *
   * @memberof Life
   */
  _createArray (arr) {
    for (let i = 0; i < this._height; i++) {
      arr[i] = []
    }
  }

  /**
   * A function which updates the array containing the information of the current step in
   * the game of life.
   *
   * @memberof Life
   */
  _updateArray () {
    let totalCells
    for (let i = 1; i < this._height - 1; i++) {
      for (let j = 1; j < this._width - 1; j++) {
        totalCells = 0
        totalCells += this._arr[i - 1][j - 1] // top left
        totalCells += this._arr[i - 1][j] // top center
        totalCells += this._arr[i - 1][j + 1] // top right
        totalCells += this._arr[i][j - 1] // middle left
        totalCells += this._arr[i][j + 1] // middle right
        totalCells += this._arr[i + 1][j - 1] // bottom left
        totalCells += this._arr[i + 1][j] // bottom center
        totalCells += this._arr[i + 1][j + 1] // bottom right
        // Apply rules
        if (this._arr[i][j] === 0) { // Apply rules for dead cell
          switch (totalCells) {
            case 3:
              this._nextArr[i][j] = 1 // dead cell with 3 neighbours => regenerate
              break
            default:
              this._nextArr[i][j] = 0 // else remain dead
          }
        } else if (this._arr[i][j] === 1) { // Apply rules for living cell
          switch (totalCells) {
            case 0:
            case 1:
              this._nextArr[i][j] = 0 // Cell dies
              break
            case 2:
            case 3:
              this._nextArr[i][j] = 1 // Continue to live
              break
            default:
              this._nextArr[i][j] = 0 // Cell dies
              break
          }
        }
      }
    }
    // Copy the array
    for (let i = 0; i < this._height; i++) {
      for (let j = 0; j < this._width; j++) {
        this._arr[i][j] = this._nextArr[i][j]
      }
    }
  }

  /**
   * A function which runs the game of life by stepping forward continually.
   *
   * @memberof Life
   */
  _runLife () {
    // Reset interval
    clearInterval(this._intervalID)

    this._intervalID = setInterval(() => {
      this._stepForward()
    }, this._updateTime)
  }

  /**
   * A function which sets the container header of the Life window.
   *
   * @param {HTMLElement} header, the container header of the Life window.
   *
   * @memberof Life
   */
  setContainerHeader (header) {
    this._containerHeader = header
    this._containerHeader.appendChild(this._headerTemplate)
  }

  /**
   * A function which sets the icon image URL of the Life window.
   *
   * @param {String} icon, the icon image URL of the Life window.
   *
   * @memberof Life
   */
  setIcon (icon) {
    this._icon = icon
    this._containerHeader.querySelector('#iconImg').src = icon
  }

  /**
   * A function which takes a snapshot of the current canvas view of the game of Life and
   * saves it in a file specified by the user.
   *
   * @memberof Life
   */
  _thisTakeSnapShot () {
    this._getPatternFromCanvas()
    this._snapShotURL = this._canvas.toDataURL('img/png')
    this._canvas.style.background = 'black'
    setTimeout(() => {
      this._canvas.style.background = 'rgba(168, 218, 220, 1.00)'
      this._clearCanvas()
      this._drawPatternOnCanvas()
    }, 100)

    // Saving image
    let fileNameView = new InputView('filename')
    let fileNameWindow = new SubWindow(fileNameView, false)
    this._windowHandler.addWindow(fileNameWindow, fileNameView.getWidthRequired(),
      fileNameView.getHeightRequired())
    this._dragger.startListening()
    this._subWindowOpen = true
    fileNameView.addEventListener('changeInput', e => {
      let fileName = `${fileNameView.getInput()}.png`
      let link = document.createElement('a')
      link.download = fileName
      link.href = this._snapShotURL.replace('image/png', 'image/octet-stream')
      link.click()
    })

    this.dispatchEvent(this._sendImageEvent)
  }

  /**
   * A function which returns the current snapshot of the Life canvas.
   *
   * @return {URL} the URL of the current snapshot of the Life canvas.
   *
   * @memberof Life
   */
  getSnapShot () {
    return this._snapShotURL
  }

  /**
   * A function which sets the current snapshot of the Life canvas.
   *
   * @param {URL} snapShot, the URL of the current snapshot of the Life canvas.
   *
   * @memberof Life
   */
  setSnapShot (snapShot) {
    this._snapShotURL = snapShot
  }

  /**
   * A function which sets the focus of the Life window to true.
   *
   * @memberof Life
   */
  setFocusedTrue () {
    this._isFocused = true
  }

  /**
   * A function which sets the focus of the Life window to false.
   *
   * @memberof Life
   */
  setFocusedFalse () {
    this._isFocused = false
  }
}

export default LifeGame
