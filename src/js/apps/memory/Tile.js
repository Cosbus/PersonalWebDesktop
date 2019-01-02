class Tile {
  constructor (index, back = './js/apps/memory/image/0.png') {
    this._frontImage = './js/apps/memory/image/' + index + '.png'
    this._backImage = back
    this._removed = false
    this._index = index
    this._imgNode = null
  }

  setImageNode (img) {
    this._imgNode = img
  }

  getImageNode () {
    return this._imgNode
  }

  setFrontImage (img) {
    this._frontImage = img
  }

  getFrontImage () {
    return this._frontImage
  }

  setBackImage (img) {
    this._backImage = img
  }

  getBackImage () {
    return this._backImage
  }

  setIndex (index) {
    this._index = index
  }

  getIndex () {
    return this._index
  }

  setRemovedTrue () {
    this._removed = true
  }

  setRemovedFalse () {
    this._removed = false
  }

  getRemoved () {
    return this._removed
  }
}

export default Tile
