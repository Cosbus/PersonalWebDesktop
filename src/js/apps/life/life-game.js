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
    this._clearButton = this.shadowRoot.querySelector('#clearButton')
    // this._rectangleButton = this.shadowRoot.querySelector('#rectangleButton')
    // this._circleButton = this.shadowRoot.querySelector('#circleButton')
    this._drawShapeButton = this.shadowRoot.querySelector('#shapeButton')

    this._mousePressed = false
    this._lastXPos = 0
    this._lastYPos = 0
    this._ctx = this._canvas.getContext('2d')
    //   this._ctx.lineWidth = 5
    this._ctx.strokeStyle = 'black'

    this._height = 400
    this._width = 450
  }

  connectedCallback () {
    this._canvas.addEventListener('mousedown', this._startDraw.bind(this))
    this._canvas.addEventListener('mouseup', this._endDraw.bind(this))
    this._canvas.addEventListener('mousemove', this._performDraw.bind(this))
    this._canvas.addEventListener('mouseleave', this._endDraw.bind(this))
    this._clearButton.addEventListener('click', this._clearCanvas.bind(this))
    this._drawShapeButton.addEventListener('click', this._drawShape.bind(this))
    //  this._rectangleButton.addEventListener('click', this._drawRectangle.bind(this))
  //  this._circleButton.addEventListener('click', this._drawCircle.bind(this))
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
    console.log(selection.options[selection.selectedIndex].value)
    switch (selection.options[selection.selectedIndex].value) {
      case 'Rectangle':
        this._drawRectangle()
        break
      case 'Circle':
        this._drawCircle()
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
    return this._height
  }
}

export default LifeGame
