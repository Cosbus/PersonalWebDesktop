/**
 * Module for AppContainer.
 *
 * @module src/js/apps/app-container.js
 * @author Claes Weyde
 * @version 1.0.0
 */

import cssTemplate from './css.js'
import htmlTemplate from './html.js'

/**
 * A class which contains an application, it may contain several instances of the application.
 *
 * @class AppContainer
 * @extends window.HTMLElement
 */
class AppContainer extends window.HTMLElement {
  /**
   * Creates an instance of AppContainer.
   *
   * @param {Application} Application, the application being contained by the current instance of
   *                                   the appContainer.
   * @param {String} appiconURL, an URL to the image for the icon.
   * @param {String} name, the name of the application.
   * @param {varargs} args, any possible arguments to be sent to the application being contained.
   *
   * @memberof AppContainer
   * @constructor
   */
  constructor (Application, appiconURL, name, ...args) {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._appButton = this.shadowRoot.querySelector('button')
    this._btnImage = this.shadowRoot.querySelector('#icon')

    this._Application = Application
    this._applicationInstances = []
    this._args = args
    this._name = name
    this._iconURL = appiconURL
    this._appButton.style.backgroundImage = `url(${appiconURL})`
    // this._btnImage.style.backgroundImage = `url(${appiconURL})`
  }

  /**
   * A function which is called when the object is added to the global window.
   *
   * @memberof AppContainer
   */
  connectedCallback () {
    this.style.visibility = 'hidden'
  }

  /**
   * A function which returns the URL of the icon.
   *
   * @return {String} the URL to the image of the icon.
   *
   * @memberof AppContainer
   */
  getIconURL () {
    return this._iconURL
  }

  /**
   * A function which returns the instance of the application corresponding to the index given.
   *
   * @param {number} index, the index of the application instance.
   * @return {Application} the application instance corresponding to the index.
   *
   * @memberof AppContainer
   */
  getApplication (index) {
    if (index < this._applicationInstances.length) {
      return this._applicationInstances[index]
    } else {
      return 'No application for that index'
    }
  }

  /**
   * A function which returns the all application instances.
   *
   * @return {[Application]} an array containing the application instances.
   *
   * @memberof AppContainer
   */

  getAllApplications () {
    return this._applicationInstances
  }

  /**
   * A function which instantiates a new application and returns it.
   *
   * @return {Application} the instantiated application instance.
   *
   * @memberof AppContainer
   */
  getNewApplication () {
    let application = new this._Application(...this._args)
    this._applicationInstances.push(application)
    return application
  }

  /**
   * A function which returns the number of application instances.
   *
   * @return {number} the number of applications.
   *
   * @memberof AppContainer
   */
  getNoOfApplicationInstances () {
    return this._applicationInstances.length
  }

  /**
   * A function which returns the top property of the application button element.
   *
   * @return {number} the top property of the button element of the application.
   *
   * @memberof AppContainer
   */
  getTopPosition () {
    return this._appButton.style.top
  }

  /**
   * A function which sets the top property of the application button element.
   *
   * @param {number} pos, the top property of the button element of the application.
   *
   * @memberof AppContainer
   */
  setTopPosition (pos) {
    this._appButton.style.top = pos + 'px'
  }

  /**
   * A function which returns the bottom property of the application button element.
   *
   * @return {number} the bottom property of the button element of the application.
   *
   * @memberof AppContainer
   */
  getBottomPosition () {
    return this._appButton.style.bottom
  }

  /**
   * A function which sets the bottom property of the application button element.
   *
   * @param {number} pos, the bottom property of the button element of the application.
   *
   * @memberof AppContainer
   */
  setBottomPosition (pos) {
    this._appButton.style.bottom = pos + 'px'
  }

  /**
   * A function which returns the left property of the application button element.
   *
   * @return {number} the left property of the button element of the application.
   *
   * @memberof AppContainer
   */
  getLeftPosition () {
    return this._appButton.style.left
  }

  /**
   * A function which sets the left property of the application button element.
   *
   * @param {number} pos, the left property of the button element of the application.
   *
   * @memberof AppContainer
   */
  setLeftPosition (pos) {
    this._appButton.style.left = pos + 'px'
  }

  /**
   * A function which returns the name of the application.
   *
   * @return {String} the name of the application.
   *
   * @memberof AppContainer
   */
  getName () {
    return this._name
  }
}

export default AppContainer
