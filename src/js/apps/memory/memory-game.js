/**
 * Module for Memory.
 *
 * @module src/js/apps/memory/memory-game.js
 * @author Claes Weyde
 * @version 1.0.0
 */

import cssTemplate from './css.js'
import htmlTemplate from './html.js'
import Tile from './Tile.js'
import HighScores from '../../utils/HighScores.js'
import InputView from '../../utils/inputView/input-view.js'
import SubWindow from '../../pwindow/sub-window.js'
import WindowHandler from '../../utils/WindowHandler.js'
import Dragger from '../../utils/Dragger.js'

/**
 * A class which handles a memory game.
 *
 * @class Memory
 * @extends window.HTMLElement
 **/
class Memory extends window.HTMLElement {
  /**
   * Creates an instance of Memory.
   *
   * @param {number} rows, the number of rows of the game.
   * @param {number} cols, the number of cols of the game.
   * @param {String} playername, the name of the player.
   *
   * @memberof Memory
   * @constructor
   */
  constructor (rows = 2, cols = 2, playername = 'Noname') {
    super()

    this._maxCols = 4
    this._maxRows = 4
    this._cols = cols
    this._rows = rows
    this._highScoreStorageName = `MemoryHighScores${this._cols}${this._rows}`
    this._playerName = playername
    this._mainDropDownActive = false
    this._sizeDropDownActive = false
    this._firstStart = true

    this._isFocused = true

    this._intervalID = null
    this._updateTime = 10
    this._time = 0
    this._dec = 2

    this._tileSize = 60
    this._spacer = this._tileSize * 0.1
    this._infoAreaSize = 35 * this._maxRows
    this._icon = ''

    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._container = this.shadowRoot.querySelector('#memoryContainer')
    this._infoArea = this.shadowRoot.querySelector('#infoArea')
    this._triesArea = this.shadowRoot.querySelector('#triesArea')
    this._timeArea = this.shadowRoot.querySelector('#timeArea')
    this._playerNameArea = this.shadowRoot.querySelector('#playerNameArea')
    this._templateDiv = this.shadowRoot.querySelectorAll('#memoryContainer template')[0]
      .content.firstElementChild
    this._restartButton = this.shadowRoot.querySelector('#restartButton')
    this._mainContainer = this.shadowRoot.querySelector('#mainContainer')

    this._windowHandler = new WindowHandler(this._mainContainer)
    this._dragger = new Dragger(this._mainContainer, this._windowHandler)

    this._headerTemplate = this.shadowRoot.querySelector('#headerTemplate')
      .content.cloneNode(true)
    this._highScoreTemplate = this.shadowRoot.querySelector('#highscoreTemplate')
      .content.cloneNode(true)

    this._containerHeader = null

    this._div = document.importNode(this._templateDiv, false)
  }

  /**
   * A function which is called when the game object is placed on the global window.
   *
   * @memberof Memory
   */
  connectedCallback () {
    this._setupNewGame(this._rows, this._cols)
    this._setupMemoryListeners()

    this._containerHeader.addEventListener('click', this._dropDownClick.bind(this))
    this._mainContainer.addEventListener('click', this._mainContainerClick.bind(this))
    this._mainContainer.addEventListener('windowRemoved', e => {
      this._userNameWindowOpen = false
    })
  }

  /**
   * A function which is called when the main container is clicked.
   *
   * @memberof Memory
   */
  _mainContainerClick (event) {
    switch (event.target) {
      case this._restartButton:
        if (this._mainDropDownActive) {
          this._closeDropDown()
        }
        this._setupNewGame(this._rows, this._cols)
        break
      default:
        if (this._mainDropDownActive) {
          this._closeDropDown()
        }
        break
    }
  }

  /**
   * A function which is called when the dropdown menu is clicked.
   *
   * @memberof Memory
   */
  _dropDownClick (event) {
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
        this._closeDropDown()
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
      case this._containerHeader.querySelector('#dropdown-name'):
        this._closeDropDown()
        if (!this._userNameWindowOpen) {
          let userNameView = new InputView('username')
          let userNameWindow = new SubWindow(userNameView, false)
          this._windowHandler.addWindow(userNameWindow, userNameView.getWidthRequired(),
            userNameView.getHeightRequired())
          this._dragger.startListening()
          this._userNameWindowOpen = true
          userNameView.addEventListener('changeInput', e => {
            this._playerName = userNameView.getInput()
            this._playerNameArea.textContent = 'Name: ' + this._playerName
          })
        }
    }
  }

  /**
   * A function which clears the highlight of the active dropdowns columns.
   *
   * @memberof Memory
   */
  _clearActiveDropdownElements () {
    this._containerHeader.querySelector('#twox2').classList.remove('elementActive')
    this._containerHeader.querySelector('#twox4').classList.remove('elementActive')
    this._containerHeader.querySelector('#fourx2').classList.remove('elementActive')
    this._containerHeader.querySelector('#fourx4').classList.remove('elementActive')
  }

  /**
   * A function which closes the drop down menu.
   *
   * @memberof Memory
   */
  _closeDropDown () {
    this._mainDropDownActive = false
    this._sizeDropDownActive = false
    this._containerHeader.querySelector('.dropdown-sub1-content').style.display = 'none'
    this._containerHeader.querySelector('.dropdown-content').style.display = 'none'
  }

  /**
   * A function which sets up listeners for the memory game.
   *
   * @memberof Memory
   */
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

  /**
   * A function which starts a new memory game.
   *
   * @memberof Memory
   */
  _setupNewGame (rows, cols) {
    this._intervalID = null
    this._userNameWindowOpen = false

    if (!this._container.classList.contains('memContainer')) {
      this._container.classList.add('memContainer')
      this._container.classList.remove('highContainer')
    }

    if (!this._firstStart) {
      this._clearContainer(this._container)
      this._clearContainer(this._div)
      clearInterval(this._intervalID)
      this._mainDropDownActive = false
      this._sizeDropDownActive = false
      this._headerTemplate = this.shadowRoot.querySelector('#headerTemplate')
        .content.cloneNode(true)
      this._highScoreTemplate = this.shadowRoot.querySelector('#highscoreTemplate')
        .content.cloneNode(true)
    }
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
    this._highScoreStorageName = `MemoryHighScores${this._cols}${this._rows}`

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
    this._playerNameArea.textContent = 'Name: ' + this._playerName
    this._triesArea.textContent = 'Number of tries: 0'

    this._setupMemoryListeners()
    this._firstStart = false
  }

  /**
   * A function which clears a given container from HTML-elements.
   *
   * @param {HTMLElement} container, the given container to clear.
   *
   * @memberof Memory
   */
  _clearContainer (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
  }

  /**
   * A function which clears all HTML-elements from the current shadowroot.
   *
   * @memberof Memory
   */
  _clearAll () {
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild)
    }
  }

  /**
   * A function which handles the logic of the turning of a given tile.
   *
   * @param {Tile} tile, the current Tile-object being turned.
   *
   * @memberof Memory
   */
  turnBrick (tile) {
    if (this._firstClick) {
      this._startTimer()
      this._firstClick = false
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
          this._showHighScores()
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

  /**
   * A function which handles the logic and shows the highscore for the game.
   *
   * @memberof Memory
   */
  _showHighScores () {
    // Clear the memoryContainer and populate with high-score-template
    this._clearContainer(this._container)
    this._container.classList.remove('memContainer')
    this._container.classList.add('highContainer')
    this._container.appendChild(this._highScoreTemplate)

    // Set up the high scores
    this._highScores = new HighScores(this._highScoreStorageName)
    this._highScores.setHighScores(this._playerName, this._cropTime(this._time, this._dec), this._tries)

    // First get the template for the list-item and clone it
    let firstItem = this._container.querySelector('#item1')
    let collection = this._container.querySelector('#highScore')

    // Style the first row
    this._container.querySelector('#item1').style.borderBottom = 'solid black'

    // Then loop through the objects
    let objKeys = Object.keys(this._highScores.getHighScores())
    let objValues = Object.values(this._highScores.getHighScores())

    for (let i = 0; i < objKeys.length; i++) {
      let item = firstItem.cloneNode(true)
      item.style.borderBottom = 'none'
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

  /**
   * A function which returns a shuffled picture array given the number of rows and columns.
   *
   * @param {number} rows, the number of rows.
   * @param {number} cols, the number of columns.
   * @return {[Tile]} an array containing shuffled tiles.
   *
   * @memberof Memory
   */
  getPictureArray (rows, cols) {
    let arr = []
    for (let i = 1; i <= (rows * cols) / 2; i += 1) {
      // let tile = new Tile(i)
      arr.push(new Tile(i))
      arr.push(new Tile(i))
    }

    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr
  }

  /**
   * A function which returns the widht required for the memory game.
   *
   * @return {number} the width required in px.
   *
   * @memberof Memory
   */
  getWidthRequired () {
    return (this._tileSize + this._spacer) * this._maxCols
  }

  /**
   * A function which returns the height required for the memory game.
   *
   * @return {number} the height required in px.
   *
   * @memberof Memory
   */
  getHeightRequired () {
    return (this._tileSize + this._spacer) * this._maxRows + this._infoAreaSize
  }

  /**
   * A function which starts a timer for the current game of memory.
   *
   * @memberof Memory
   */
  _startTimer () {
    // Clear previous intervalID and set time-limit for current interval
    clearInterval(this._intervalID)

    this._intervalID = setInterval(() => {
      this._time += (this._updateTime / 1000)
      this._timeArea.textContent = `Time: ${this._cropTime(this._time, this._dec)} s`
    }, this._updateTime)
  }

  /**
   * A function which returns the header template for the memory window.
   *
   * @return {HTMLElement} the header template for the memory window.
   *
   * @memberof Memory
   */
  getHeaderTemplate () {
    return this._headerTemplate
  }

  /**
   * A function which sets the header template for the memory window.
   *
   * @param {HTMLElement} header, the header template for the memory window.
   *
   * @memberof Memory
   */
  setContainerHeader (header) {
    this._containerHeader = header
    this._containerHeader.appendChild(this._headerTemplate)
  }

  /**
   * A function which sets the icon URL for the memory window.
   *
   * @param {String} icon, the icon URL for the memory window.
   *
   * @memberof Memory
   */
  setIcon (icon) {
    this._icon = icon
    this._containerHeader.querySelector('#iconImg').src = icon
  }

  /**
   * A function which sets that the memory window is focused.
   *
   * @memberof Memory
   */
  setFocusedTrue () {
    this._isFocused = true
  }

  /**
   * A function which sets that the memory window is not focused.
   *
   * @memberof Memory
   */
  setFocusedFalse () {
    this._isFocused = false
  }

  /**
   * A function which crops a given time value.
   *
   * @param {number} time, the value to crop.
   * @param {number} decimals, the number of decimals to keep.
   *
   * @memberof Memory
   */
  _cropTime (time, decimals) {
    return parseFloat(Math.round(time * 1000) / 1000).toFixed(decimals)
  }
}

export default Memory
