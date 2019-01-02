import cssTemplate from './css.js'
import htmlTemplate from './html.js'
import Tile from './Tile.js'

class Memory extends window.HTMLElement {
  constructor (rows = 2, cols = 2) {
    super()

    this.attachShadow({ mode: 'open' })

    let a
    this._tiles = []
    this.getPictureArray(cols, rows)
    this._firstTurnedTile = null
    this._secondTurnedTile = null
    // this._lastTile = null
    this._pairs = 0
    this._cols = cols
    this._rows = rows
    this._tries = 0
    this._firstClick = true

    this._intervalID = null
    this._updateTime = 100
    this._time = 0

    this._tileSize = 60
    this._spacer = this._tileSize * 0.1
    this._infoAreaSize = 50

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._container = this.shadowRoot.querySelector('#memoryContainer')
    this._infoArea = this.shadowRoot.querySelector('#infoArea')
    this._triesArea = this.shadowRoot.querySelector('#triesArea')
    this._timeArea = this.shadowRoot.querySelector('#timeArea')
    let templateDiv = this.shadowRoot.querySelectorAll('#memoryContainer template')[0]
      .content.firstElementChild

    let div = document.importNode(templateDiv, false)

    this._tiles.forEach((tile, index) => {
      a = document.importNode(templateDiv.firstElementChild, true)
      div.appendChild(a)

      a.firstElementChild.setAttribute('data-brickNumber', index)

      if ((index + 1) % cols === 0) {
        div.appendChild(document.createElement('br'))
      }
    })

    div.addEventListener('click', event => {
      event.preventDefault()
      let img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
      let index = parseInt(img.getAttribute('data-brickNumber'))
      if (!isNaN(index)) {
        this._tiles[index].setImageNode(img)
        this.turnBrick(this._tiles[index])
      }
    })

    this._container.appendChild(div)
  }

  turnBrick (tile) {
    if (this._firstClick) {
      this._startTimer()
    }
    if (this._secondTurnedTile) {
      return
    }

    tile.getImageNode().src = tile.getFrontImage() // './js/apps/memory/image/' + tile + '.png'
    if (!this._firstTurnedTile) {
      // First brick is clicked
      this._firstTurnedTile = tile
      // this._lastTile = tile
    } else {
      if (tile.getRemoved()) { // This tile is already removed
        return
      }
      // Second brick is clicked
      // if (this._secondTurnedTile.getFrontImage() === this._firstTurnedTile.getFrontImage()) {
      //   return
      // }

      this._tries += 1
      this._triesArea.textContent = `Number of tries: ${this._tries}`
      this._secondTurnedTile = tile

      if (this._secondTurnedTile.getFrontImage() === this._firstTurnedTile.getFrontImage()) {
        // Found a pair
        this._pairs += 1

        // Finished game
        if (this._pairs === (this._cols * this._rows) / 2) {
          clearInterval(this._intervalID)
        }

        window.setTimeout(() => {
          this._firstTurnedTile.getImageNode().parentNode.classList.add('removed')
          this._secondTurnedTile.getImageNode().parentNode.classList.add('removed')
          this._firstTurnedTile.setRemovedTrue()
          this._secondTurnedTile.setRemovedTrue()

          this._firstTurnedTile = null
          this._secondTurnedTile = null
        }, 300)
      } else {
        window.setTimeout(() => {
          this._firstTurnedTile.getImageNode().src = this._firstTurnedTile.getBackImage()
          this._secondTurnedTile.getImageNode().src = this._firstTurnedTile.getBackImage()
          // './js/apps/memory/image/0.png'

          this._firstTurnedTile = null
          this._secondTurnedTile = null
        }, 1000)
      }
    }
  }

  getPictureArray (rows, cols) {
    for (let i = 1; i <= (rows * cols) / 2; i += 1) {
      // let tile = new Tile(i)
      this._tiles.push(new Tile(i))
      this._tiles.push(new Tile(i))
    }

    for (let i = this._tiles.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = this._tiles[i]
      this._tiles[i] = this._tiles[j]
      this._tiles[j] = temp
    }
  }

  getWidthRequired () {
    return (this._tileSize + this._spacer) * this._cols
  }

  getHeightRequired () {
    return (this._tileSize + this._spacer) * this._rows + this._infoAreaSize
  }

  _startTimer () {
    // Clear previous intervalID and set time-limit for current interval
    clearInterval(this._intervalID)

    this._intervalID = setInterval(() => {
      this._time += (this._updateTime / 1000)
      this._timeArea.textContent = `Time: ${Math.round(this._time)} seconds`
    }, this._updateTime)
  }
}

export default Memory
