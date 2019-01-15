/**
 * Module for Tile.
 *
 * @module src/js/apps/memory/Tile.js
 * @author Claes Weyde
 * @version 1.0.0
 */

/**
 * A class which handles memory bricks or tiles.
 *
 * @class Tile
 **/
class Tile {
  /**
   * Creates an instance of Tile.
   *
   * @param {number} index, the index of the Tile.
   * @param {String} back, an URL to the image representing the back of the Tile.
   *
   * @memberof Tile
   * @constructor
   */
  constructor (index, back = './js/apps/memory/image/0.png') {
    this._frontImage = './js/apps/memory/image/' + index + '.png'
    this._backImage = back
    this._removed = false
    this._index = index
    this._imgNode = null
  }

  /**
   * A function which sets the node of the Tile.
   *
   * @param {HTMLElement} img, the HTML-node of the Tile.
   *
   * @memberof Tile
   */
  setImageNode (img) {
    this._imgNode = img
  }

  /**
   * A function which returns the node of the Tile.
   *
   * @return {HTMLElement} the HTML-node of the Tile.
   *
   * @memberof Tile
   */
  getImageNode () {
    return this._imgNode
  }

  /**
   * A function which sets the URL to the front image of the Tile.
   *
   * @param {String} img, the URL to the front image of the Tile.
   *
   * @memberof Tile
   */
  setFrontImage (img) {
    this._frontImage = img
  }

  /**
   * A function which returns the URL to the front image of the Tile.
   *
   * @return {String} the URL to the front image of the Tile.
   *
   * @memberof Tile
   */
  getFrontImage () {
    return this._frontImage
  }

  /**
   * A function which sets the URL to the back image of the Tile.
   *
   * @param {String} img, the URL to the back image of the Tile.
   *
   * @memberof Tile
   */
  setBackImage (img) {
    this._backImage = img
  }

  /**
   * A function which returns the URL to the front image of the Tile.
   *
   * @return {String} the URL to the front image of the Tile.
   *
   * @memberof Tile
   */
  getBackImage () {
    return this._backImage
  }

  /**
   * A function which sets the index of the Tile.
   *
   * @param {number} index, the index of the Tile.
   *
   * @memberof Tile
   */
  setIndex (index) {
    this._index = index
  }

  /**
   * A function which returns the index of the Tile.
   *
   * @return {number} the index of the Tile.
   *
   * @memberof Tile
   */
  getIndex () {
    return this._index
  }

  /**
   * A function which sets that the Tile is removed.
   *
   * @memberof Tile
   */
  setRemovedTrue () {
    this._removed = true
  }

  /**
   * A function which sets that the Tile is not removed.
   *
   * @memberof Tile
   */
  setRemovedFalse () {
    this._removed = false
  }

  /**
   * A function which returns the removal status of the Tile.
   *
   * @return {boolean} whether the Tile is removed or not.
   *
   * @memberof Tile
   */
  getRemoved () {
    return this._removed
  }
}

export default Tile
