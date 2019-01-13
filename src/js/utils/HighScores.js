/**
 * Module for HighScores.
 *
 * @module src/js/utils/HighScores.js
 * @author Claes Weyde
 * @version 1.0.0
 */

/**
 * A class which handles high scores
 *
 * @class HighScores
 */
export default class HighScores {
  /**
   * Creates an instance of HighScores.
   *
   * @param {string} storageName, the name of the local storage
   *
   * @memberof HighScores
   * @constructor
   */
  constructor (storageName = 'highscores') {
    this._storageName = storageName
    this._highScores = {}
    this._currentObj = {}
    this._maxStore = 10
    this._maxIterat = 20
  }

  /**
   * Sets up the high scores
   *
   * @memberof HighScores
   */
  setHighScores (playerName, playerTotalTime, playerTries) {
    // construct the current object
    this._currentObj = { name: playerName, time: playerTotalTime, tries: playerTries }

    // load the current high scores saved in browser
    this._loadHighScores()

    // Add the current game object to the high scores
    // Using "Time" as key for the current object

    let key = playerTotalTime
    this._highScores[key] = this._currentObj
    // Retrieve the keys from the high scores
    let hsObjKeys = Object.keys(this._highScores)

    // Only keep a certain amount of high scores, use "iteration" to avoid infinite loop
    let iteration = 0
    while (hsObjKeys.length > this._maxStore && iteration < this._maxIterat) {
      // Find the maximum time and remove that high score
      let maxKey = Math.max(...hsObjKeys).toFixed(2)
      delete this._highScores[maxKey.toString()]

      // Update the variables
      iteration++
      hsObjKeys = Object.keys(this._highScores)
    }

    // Order the high scores from least amount of tries to most amount of tries
    // keep a temporary placeholder for scores
    let tempHS = {}
    let iterat = 0
    while (hsObjKeys.length > 0 && iterat < this._maxIterat) {
      // Find the minimum value, place in placeholder and remove from highscores
      let minKey = Math.min(...hsObjKeys).toFixed(2)
      tempHS[minKey] = this._highScores[minKey]

      // Delete and update values
      delete this._highScores[minKey]
      hsObjKeys = Object.keys(this._highScores)

      iterat++
    }

    this._highScores = tempHS
  }

  /**
   * A function which returns the high-scores as an object in the form
   * {tries:{name:name, time:time, tries:tries},...}
   *
   * @return {{obj}} highScores
   * @memberof HighScores
   */
  getHighScores () {
    return this._highScores
  }

  /**
   * A function which saves the current list of highscores on the local storage of
   * the browser
   *
   * @memberof HighScores
   */
  saveHighScores () {
    window.localStorage.setItem(this._storageName, JSON.stringify(this._highScores))
  }

  /**
   * A function which loads a list of high scores from the local storage of the browser
   *
   * @memberof HighScores
   */
  _loadHighScores () {
    if (window.localStorage.getItem(this._storageName)) {
      let result = window.localStorage.getItem(this._storageName)
      result = JSON.parse(result)
      this._highScores = result
    }
  }
}
