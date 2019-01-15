/**
 * Module for InputView.
 *
 * @module src/js/utils/inputView/input-view.js
 * @author Claes Weyde
 * @version 1.0.0
 */

import cssTemplate from './css.js'
import htmlTemplate from './html.js'

/**
 * A class which handles a view for inputting simple information in a separate window.
 *
 * @class InputView
 * @extends window.HTMLElement
 */
class InputView extends window.HTMLElement {
  /**
   * Creates an instance of InputView.
   *
   * @param {string} inputTypeString, a string containing information regarding the type of input.
   *
   * @memberof InputView
   * @constructor
   */
  constructor (inputTypeString) {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._containerHeader = null
    this._input = ''
    this._container = this.shadowRoot.querySelector('#container')
    this.shadowRoot.querySelector('#inputText').textContent = `Input ${inputTypeString}:`
    this._inputField = this.shadowRoot.querySelector('#inputField')
    this._inputButton = this.shadowRoot.querySelector('#inputButton')
    this._inputButton.disabled = true

    this._isFocused = true

    this._width = 150
    this._height = 150
  }

  /**
   * A function which is called when the object is added to the global window.
   *
   * @memberof InputView
   */
  connectedCallback () {
    this._inputField.focus()

    this._closeViewEvent = new window.CustomEvent('closeView')
    this._changeInputEvent = new window.CustomEvent('changeInput', { detail: this })
    this._inputButton.addEventListener('click', e => {
      this._input = this._inputField.value
      this.dispatchEvent(this._changeInputEvent)
      this.dispatchEvent(this._closeViewEvent)
    })
    this._inputField.addEventListener('input', e => {
      if (this._inputField.value.length > 0) {
        if (this._inputButton.disabled) {
          this._inputButton.classList.remove('disabled')
          this._inputButton.classList.add('enabled')
          this._inputButton.disabled = false
        }
      } else {
        if (!this._inputButton.disabled) {
          this._inputButton.classList.remove('enabled')
          this._inputButton.classList.add('disabled')
          this._inputButton.disabled = true
        }
      }
    })
    this._inputField.addEventListener('keydown', e => {
      if ((!this._inputButton.disabled) && e.keyCode === 13) {
        this._input = this._inputField.value
        this.dispatchEvent(this._changeInputEvent)
        this.dispatchEvent(this._closeViewEvent)
      }
    })
  }

  /**
   * A function which returns the input given to the view.
   *
   * @return {String} the input given to the view.
   *
   * @memberof InputView
   */
  getInput () {
    return this._input
  }

  /**
   * A function which sets the header of the container.
   *
   * @param {HTMLElement} header, a header to be used by the view.
   *
   * @memberof InputView
   */
  setContainerHeader (header) {
    this._containerHeader = header
    this._containerHeader.appendChild(this._headerTemplate)
  }

  /**
   * A function which returns the width of the inputview.
   *
   * @return {number} the width in px of the inputview.
   *
   * @memberof InputView
   */
  getWidthRequired () {
    return this._width
  }

  /**
   * A function which returns the height of the inputview.
   *
   * @return {number} the height in px of the inputview.
   *
   * @memberof InputView
   */
  getHeightRequired () {
    return this._height
  }

  /**
   * A function which sets the focus value of the inputview to true.
   *
   * @memberof InputView
   */
  setFocusedTrue () {
    this._isFocused = true
  }

  /**
   * A function which sets the focus value of the inputview to false.
   *
   * @memberof InputView
   */
  setFocusedFalse () {
    this._isFocused = false
  }
}

export default InputView
