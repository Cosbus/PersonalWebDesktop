import cssTemplate from './css.js'
import htmlTemplate from './html.js'

class Memory extends window.HTMLElement {
  constructor (rows = 2, cols = 2) {
    super()

    this.attachShadow({ mode: 'open' })

    let a
    this._tiles = []
    this._tiles = this.getPictureArray(cols, rows)
    this.turn1 = null
    this.turn2 = null
    this.lastTile = null
    this.pairs = 0
    this.cols = cols
    this.rows = rows
    this.tries = 0
    this._tileSize = 60
    this._spacer = this._tileSize * 0.1

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._container = this.shadowRoot.querySelector('#memoryContainer')
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
      this.turnBrick(this._tiles[index], img)
    })

    this._container.appendChild(div)
  }

  turnBrick (tile, img) {
    if (this.turn2) {
      return
    }

    img.src = './js/apps/memory/image/' + tile + '.png'
    if (!this.turn1) {
      // First brick is clicked
      this.turn1 = img
      this.lastTile = tile
    } else {
      // Second brick is clicked
      if (img === this.turn1) {
        return
      }

      this.tries += 1
      this.turn2 = img

      if (tile === this.lastTile) {
        // Found a pair
        this.pairs += 1

        if (this.pairs === (this.cols * this.rows) / 2) {
          console.log('won')
          console.log(this.tries + ' number of tries')
        }

        window.setTimeout(() => {
          this.turn1.parentNode.classList.add('removed')
          this.turn2.parentNode.classList.add('removed')

          this.turn1 = null
          this.turn2 = null
        }, 300)
      } else {
        window.setTimeout(() => {
          this.turn1.src = './js/apps/memory/image/0.png'
          this.turn2.src = './js/apps/memory/image/0.png'

          this.turn1 = null
          this.turn2 = null
        }, 1000)
      }
    }
  }

  getPictureArray (rows, cols) {
    let arr = []
    let i

    for (i = 1; i <= (rows * cols) / 2; i += 1) {
      arr.push(i)
      arr.push(i)
    }

    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr
  }

  getWidthRequired () {
    return (this._tileSize + this._spacer) * this.cols
  }

  getHeightRequired () {
    return (this._tileSize + this._spacer) * this.rows
  }
}

export default Memory
