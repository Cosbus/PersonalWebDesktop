import cssTemplate from './css.js'
import htmlTemplate from './html.js'
import Tile from './Tile.js'
import HighScores from '../../utils/HighScores.js'

class Memory extends window.HTMLElement {
  constructor (rows = 2, cols = 2) {
    super()

    this._maxCols = 4
    this._maxRows = 4
    this._cols = cols
    this._rows = rows
    this._highScores = new HighScores('MemoryHighScores')
    this._playerName = 'testNamn!!'
    this._mainDropDownActive = false
    this._sizeDropDownActive = false

    this._isFocused = true

    this._intervalID = null
    this._updateTime = 100
    this._time = 0
    this._dec = 2

    this._tileSize = 60
    this._spacer = this._tileSize * 0.1
    this._infoAreaSize = 35 * this._maxRows

    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._container = this.shadowRoot.querySelector('#memoryContainer')
    this._infoArea = this.shadowRoot.querySelector('#infoArea')
    this._triesArea = this.shadowRoot.querySelector('#triesArea')
    this._timeArea = this.shadowRoot.querySelector('#timeArea')
    this._templateDiv = this.shadowRoot.querySelectorAll('#memoryContainer template')[0]
      .content.firstElementChild
    this._restartButton = this.shadowRoot.querySelector('#restartButton')
    this._mainContainer = this.shadowRoot.querySelector('#mainContainer')

    this._headerTemplate = this.shadowRoot.querySelector('#headerTemplate')
      .content.cloneNode(true)
    this._highScoreTemplate = this.shadowRoot.querySelector('#highscoreTemplate')
      .content.cloneNode(true)

    this._containerHeader = null

    this._div = document.importNode(this._templateDiv, false)
  }

  connectedCallback () {
    this._setupNewGame(this._rows, this._cols)
    this._setupMemoryListeners()

    // this._containerHeader.querySelector('.dropdown').addEventListener('click', event => {
    //   this._containerHeader.querySelector('.dropdown-content').style.display = 'block'
    // })

    // this._containerHeader.querySelector('.dropdown').addEventListener('click', this._dropDownClick.bind(this))

    // this._containerHeader.querySelector('#dropdown-size').addEventListener('click', event => {
    //  this._containerHeader.querySelector('.dropdown-sub1-content').style.display = 'inline-block'
    //  this._containerHeader.addEventListener('click', this._dropDownClick.bind(this))
    // })
    this._containerHeader.addEventListener('click', this._dropDownClick.bind(this))
    this._mainContainer.addEventListener('click', this._mainContainerClick.bind(this))

    // this._restartButton.addEventListener('click', e => {
    //   this._setupNewGame(this._rows, this._cols)
    // })
  }

  _mainContainerClick (event) {
    switch (event.target) {
      case this._restartButton:
        this._setupNewGame(this._rows, this._cols)
        break
      default:
        if (this._mainDropDownActive) {
          this._closeDropDown()
        }
        break
    }
  }

  _dropDownClick (event) {
    // if (!this._mainDropDownActive) {
    // this._mainDropDownActive = true
    // this._containerHeader.querySelector('.dropdown-content').style.display = 'block'
    // } else if (!this._sizeDropDownActive) {
    // this._sizeDropDownActive = true
    // this._containerHeader.querySelector('.dropdown-sub1-content').style.display = 'inline-block'
    // } else {
    console.log(event.target)
    switch (event.target) {
      case this._containerHeader.querySelector('#configure'):
        if (!this._mainDropDownActive) {
          this._mainDropDownActive = true
          this._containerHeader.querySelector('.dropdown-content').style.display = 'block'
        } else {
          this._closeDropDown()
        }
        break
      case this._containerHeader.querySelector('#gameSize'):
        if (!this._sizeDropDownActive) {
          this._sizeDropDownActive = true
          this._containerHeader.querySelector('.dropdown-sub1-content').style.display = 'inline-block'
        } else {
          this._sizeDropDownActive = false
          this._containerHeader.querySelector('.dropdown-sub1-content').style.display = 'none'
        }
        break
      case this._containerHeader.querySelector('#twox2'):
        this._clearActiveDropdownElements()
        this._containerHeader.querySelector('#twox2').classList.add('elementActive')
        this._closeDropDown(2)
        this._setupNewGame(2, 2)
        break
      case this._containerHeader.querySelector('#twox4'):
        this._clearActiveDropdownElements()
        this._containerHeader.querySelector('#twox4').classList.add('elementActive')
        this._closeDropDown()
        this._setupNewGame(2, 4)
        break
      case this._containerHeader.querySelector('#fourx2'):
        this._clearActiveDropdownElements()
        this._containerHeader.querySelector('#fourx2').classList.add('elementActive')
        this._closeDropDown()
        this._setupNewGame(4, 2)
        break
      case this._containerHeader.querySelector('#fourx4'):
        this._clearActiveDropdownElements()
        this._containerHeader.querySelector('#fourx4').classList.add('elementActive')
        this._closeDropDown()
        this._setupNewGame(4, 4)
        break
    }
  }

  _clearActiveDropdownElements () {
    this._containerHeader.querySelector('#twox2').classList.remove('elementActive')
    this._containerHeader.querySelector('#twox4').classList.remove('elementActive')
    this._containerHeader.querySelector('#fourx2').classList.remove('elementActive')
    this._containerHeader.querySelector('#fourx4').classList.remove('elementActive')
  }

  _closeDropDown () {
    this._mainDropDownActive = false
    this._sizeDropDownActive = false
    this._containerHeader.querySelector('.dropdown-sub1-content').style.display = 'none'
    this._containerHeader.querySelector('.dropdown-content').style.display = 'none'
  }

  _setupMemoryListeners () {
    this._div.addEventListener('click', event => {
      event.preventDefault()
      let img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
      let index = parseInt(img.getAttribute('data-brickNumber'))
      if (!isNaN(index)) {
        this._tiles[index].setImageNode(img)
        this.turnBrick(this._tiles[index])
      }
    })
  }

  _setupNewGame (rows, cols) {
    this._clearContainer()
    clearInterval(this._intervalID)

    if (!this._container.classList.contains('memContainer')) {
      this._container.classList.add('memContainer')
      this._container.classList.remove('highContainer')
    }

    this._mainDropDownActive = false
    this._sizeDropDownActive = false

    this._a = null
    this._tiles = []
    this._firstTurnedTile = null
    this._secondTurnedTile = null
    this._pairs = 0
    this._cols = cols
    this._rows = rows
    this._tries = 0
    this._firstClick = true
    this._time = 0
    this._infoAreaSize = 35 * this._rows

    this._div = document.importNode(this._templateDiv, false)

    this._tiles = this.getPictureArray(this._cols, this._rows)
    this._tiles.forEach((tile, index) => {
      this._a = document.importNode(this._templateDiv.firstElementChild, true)
      this._div.appendChild(this._a)

      this._a.firstElementChild.setAttribute('data-brickNumber', index)

      if ((index + 1) % this._cols === 0) {
        this._div.appendChild(document.createElement('br'))
      }
    })

    this._container.appendChild(this._div)

    this._timeArea.textContent = `Time:  0 s`

    this._setupMemoryListeners()
  }

  _clearContainer () {
    while (this._container.firstChild) {
      this._container.removeChild(this._container.firstChild)
    }
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
      if (tile.getImageNode() === this._firstTurnedTile.getImageNode()) { // same brick
        return
      }

      this._tries += 1
      this._triesArea.textContent = `Number of tries: ${this._tries}`
      this._secondTurnedTile = tile

      if (this._secondTurnedTile.getFrontImage() === this._firstTurnedTile.getFrontImage()) {
        // Found a pair
        this._pairs += 1

        // Finished game
        if (this._pairs === (this._cols * this._rows) / 2) {
          clearInterval(this._intervalID)
          this._showHighScores()
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

  _showHighScores () {
    // Clear the memoryContainer and populate with high-score-template
    this._clearContainer()
    this._container.classList.remove('memContainer')
    this._container.classList.add('highContainer')
    this._container.appendChild(this._highScoreTemplate)

    // Set up the high scores
    this._highScores.setHighScores(this._playerName, this._cropTime(this._time, this._dec), this._tries)

    // First get the template for the list-item and clone it
    let firstItem = this._container.querySelector('#item1')
    let collection = this._container.querySelector('#highScore')

    console.log(firstItem)
    console.log(this._highScores)
    // Then loop through the objects
    let objKeys = Object.keys(this._highScores.getHighScores())
    let objValues = Object.values(this._highScores.getHighScores())

    for (let i = 0; i < objKeys.length; i++) {
      let item = firstItem.cloneNode(true)
      item.querySelector('#firstItem').textContent = objValues[i].name
      item.querySelector('#secondItem').textContent = objValues[i].tries
      item.querySelector('#thirdItem').textContent = objValues[i].time

      // item.querySelector('#firstItem').innerHTML = objValues[i].name
      // item.querySelector('#secondItem').innerHTML = objValues[i].time
      collection.appendChild(item)
    }

    // Save the high-score list
    this._highScores.saveHighScores()

    this._container.appendChild(collection)
  }

  getPictureArray (rows, cols) {
    let arr = []
    for (let i = 1; i <= (rows * cols) / 2; i += 1) {
      // let tile = new Tile(i)
      arr.push(new Tile(i))
      arr.push(new Tile(i))
    }

    for (let i = this._tiles.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }

    return arr
  }

  getWidthRequired () {
    return (this._tileSize + this._spacer) * this._maxCols
  }

  getHeightRequired () {
    return (this._tileSize + this._spacer) * this._maxRows + this._infoAreaSize
  }

  _startTimer () {
    // Clear previous intervalID and set time-limit for current interval
    clearInterval(this._intervalID)

    this._intervalID = setInterval(() => {
      this._time += (this._updateTime / 1000)
      this._timeArea.textContent = `Time: ${this._cropTime(this._time, this._dec)} s`
    }, this._updateTime)
  }

  getHeaderTemplate () {
    return this._headerTemplate
  }

  setContainerHeader (header) {
    this._containerHeader = header
    this._containerHeader.appendChild(this._headerTemplate)
  }

  setFocusedTrue () {
    this._isFocused = true
  }

  setFocusedFalse () {
    this._isFocused = false
  }

  _cropTime (time, decimals) {
    return parseFloat(Math.round(time * 1000) / 1000).toFixed(decimals)
  }
}

export default Memory
