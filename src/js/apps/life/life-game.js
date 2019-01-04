import cssTemplate from './css.js'
import htmlTemplate from './html.js'

class LifeGame extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._canvas = this.shadowRoot.querySelector('#canvas')
    this._mainDiv = this.shadowRoot.querySelector('#mainDiv')
    this._configArea = this.shadowRoot.querySelector('#configArea')
    this._clearButton = this.shadowRoot.querySelector('#clearButton')
    // this._rectangleButton = this.shadowRoot.querySelector('#rectangleButton')
    // this._circleButton = this.shadowRoot.querySelector('#circleButton')
    this._drawShapeButton = this.shadowRoot.querySelector('#shapeButton')
    this._stepForwardButton = this.shadowRoot.querySelector('#stepButton')
    this._runButton = this.shadowRoot.querySelector('#runButton')
    this._stopButton = this.shadowRoot.querySelector('#stopButton')
    this._snapShotButton = this.shadowRoot.querySelector('#snapshotButton')

    this._mousePressed = false
    this._lastXPos = 0
    this._lastYPos = 0
    this._ctx = this._canvas.getContext('2d')
    //   this._ctx.lineWidth = 5
    this._ctx.strokeStyle = 'black'

    this._arr = []
    this._nextArr = []
    this._intervalID = null
    this._noIterations = 0
    this._lifeInfo = this.shadowRoot.querySelector('#lifeInfo')
    this._updateTime = 100

    //= document.createElement('img')

    this._height = 400
    this._width = 450
    this._configAreaSize = 77

    this._containerHeader = null

    this._headerTemplate = this.shadowRoot.querySelector('#headerTemplate')
      .content.cloneNode(true)
  }

  connectedCallback () {
    this._createArray(this._arr)
    this._createArray(this._nextArr)
    this._canvas.addEventListener('mousedown', this._startDraw.bind(this))
    this._canvas.addEventListener('mouseup', this._endDraw.bind(this))
    this._canvas.addEventListener('mousemove', this._performDraw.bind(this))
    this._canvas.addEventListener('mouseleave', this._endDraw.bind(this))
    this._configArea.addEventListener('click', e => {
      switch (e.target) {
        case this._clearButton:
          this._noIterations = 0
          this._lifeInfo.textContent = `Number of iterations: ${this._noIterations}`
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

    this._containerHeader.querySelector('.dropdown').addEventListener('click', event => {
      console.log('clicked dropdown')
      this._containerHeader.querySelector('.dropdown-content').style.display = 'block'
    })

    this._sendImageEvent = new window.CustomEvent('sentimage', { detail: this._snapShotURL })
  }

  _startDraw (event) {
    this._mousePressed = true

    this._draw(event.pageX - this._canvas.getBoundingClientRect().x,
      event.pageY - this._canvas.getBoundingClientRect().y, false)
  }

  _performDraw (event) {
    if (this._mousePressed) {
      this._draw(event.pageX - this._canvas.getBoundingClientRect().x,
        event.pageY - this._canvas.getBoundingClientRect().y, true)
    }
  }

  _endDraw (event) {
    this._mousePressed = false
  }

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

  _clearCanvas () {
    this._ctx.setTransform(1, 0, 0, 1, 0, 0)
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height)
  }

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

  _drawRectangle () {
    this._ctx.rect(100, 100, 100, 100)
    this._ctx.closePath()
    this._ctx.stroke()
  }

  _drawCircle () {
    this._ctx.arc(100, 100, 50, 0, 2 * Math.PI)
    this._ctx.closePath()
    this._ctx.stroke()
  }

  _drawTriangle () {
    this._ctx.moveTo(100, 100)
    this._ctx.lineTo(100, 300)
    this._ctx.lineTo(300, 300)
    this._ctx.closePath()
    this._ctx.stroke()
  }

  _randomPattern () {
    for (let j = 0; j < this._height; j++) {
      for (let k = 0; k < this._width; k++) {
        this._arr[j][k] = Math.round(Math.random())
      }
    }
  }

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

  _stepForward () {
    this._getPatternFromCanvas()
    this._updateArray()
    this._clearCanvas()
    this._drawPatternOnCanvas()
    this._lifeInfo.textContent = `Iterations: ${this._noIterations}`
    this._noIterations++
  }

  _initParams () {
    this._ctx.beginPath()
    let selectors = this.shadowRoot.querySelector('#selWidth')
    this._ctx.lineWidth = selectors.options[selectors.selectedIndex].value
    this._ctx.lineJoin = 'round'
  }

  getWidthRequired () {
    return this._width
  }

  getHeightRequired () {
    return (this._height + this._configAreaSize)
  }

  _createArray (arr) {
    for (let i = 0; i < this._height; i++) {
      arr[i] = []
    }
  }

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

  _runLife () {
    // Reset interval
    clearInterval(this._intervalID)

    this._intervalID = setInterval(() => {
      this._stepForward()
    }, this._updateTime)
  }

  setContainerHeader (header) {
    this._containerHeader = header
    this._containerHeader.appendChild(this._headerTemplate)
  }

  _thisTakeSnapShot () {
    this._getPatternFromCanvas()
    this._snapShotURL = this._canvas.toDataURL('img/png')
    console.log(this._snapShotURL)
    this._canvas.style.background = 'black'
    setTimeout(() => {
      this._canvas.style.background = 'rgba(168, 218, 220, 1.00)'
      this._clearCanvas()
      this._drawPatternOnCanvas()
    }, 100)

    this.dispatchEvent(this._sendImageEvent)
  }

  getSnapShot () {
    return this._snapShotURL
  }

  setSnapShot (snapShot) {
    this._snapShotURL = snapShot
  }
}

export default LifeGame
