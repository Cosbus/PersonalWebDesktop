/**
 * Module for MainWindow.
 *
 * @module src/js/pwindow/main-window.js
 * @author Claes Weyde
 * @version 1.0.0
 */
import Pwindow from './p-window.js'
import SubWindow from './sub-window.js'
import Dragger from '../utils/Dragger.js'
import WindowHandler from '../utils/WindowHandler.js'

/**
 * A class which handles a HTML-window containing content.
 *
 * @class MainWindow
 * @extends Pwindow
 */
class MainWindow extends Pwindow {
  constructor () {
  /**
   * Creates an instance of MainWindow.
   *
   * @memberof MainWindow
   * @constructor
   */
    super()

    // Variables for keeping track of the subWindows
    this._windows = []
    this._highestZindex = 0
    this._activeWindow = this
    this._firstWindowStartingTopPos = 20
    this._firstWindowStartingLeftPos = 20
    this._nextWindowTopOffset = 20
    this._nextWindowLeftOffset = 20
    this._headerSize = 20

    // Variables for the application buttons
    this._applications = []
    this._buttonWidth = 40
    this._buttonHeight = 40
    this._buttonSpacer = 5

    // Remove elements which should not be there for main window
    this.shadowRoot.querySelector('#closeWindowButton').remove()
    this.shadowRoot.querySelector('#containerHeader').remove()

    // Remove and add classes
    this._container.classList.remove('defaultSetting')
    this._container.classList.add('mainWindow')
    this._workSpace.style.height = '100%'
    this._workSpace.classList.add('workSpaceMainWindow')

    // Add Apps
    this._AppContainer = this.shadowRoot.querySelector('#expandBubble')
    this._AppContIdleHeight = '30px'
    this._AppContIdleWidth = '30px'

    // Add misc utilities
    this._windowHandler = new WindowHandler(this._workSpace)
    this._dragger = new Dragger(this._container, this._windowHandler)
  }

  /**
   * A function which is called when the object is added to the global window.
   *
   * @memberof MainWindow
   */
  connectedCallback () {
    this._container.addEventListener('click', e => {
      for (let application of this._applications) {
        if (e.target === application) {
          this._windowHandler.addWindow(new SubWindow(application.getNewApplication(), true, application.getIconURL()),
            application.getApplication(application.getNoOfApplicationInstances() - 1).getWidthRequired(),
            application.getApplication(application.getNoOfApplicationInstances() - 1).getHeightRequired() + this._headerSize)
          this._dragger.startListening()
          let app = application.getApplication(application.getNoOfApplicationInstances() - 1)
          // If application is life-game, set eventlistener
          if (application.getName() === 'life') {
            app.addEventListener('sentimage', e => {
              let imgURL = app.getSnapShot()
              for (let application2 of this._applications) {
                if (application2.getName() === 'chat') {
                  application2.getAllApplications().forEach(function (element) {
                    element.importImageURL(imgURL)
                    element.pasteImage()
                  })
                }
              }
            })
          }
        }
      }
    })

    this._AppContainer.addEventListener('mouseover', e => {
      // Make sure element moves to front
      this._windowHandler.incrementZindex()
      this._windowHandler.unfocusAllWindows()
      this._AppContainer.style.zIndex = this._windowHandler.getHighestZindex()
      this._applications.forEach((element) => {
        element.style.visibility = 'visible'
      })

      // And change size of bubble
      this._AppContainer.style.width = `${this._applications.length * (this._buttonWidth + this._buttonSpacer) +
      2 * this._buttonSpacer}px`
      this._AppContainer.style.height = `${this._buttonHeight + 2 * this._buttonSpacer}px`
    })
    this._AppContainer.addEventListener('mouseout', e => {
      this._applications.forEach((element) => {
        element.style.visibility = 'hidden'
      })
      this._AppContainer.style.width = this._AppContIdleWidth
      this._AppContainer.style.height = this._AppContIdleHeight
    })
  }

  /**
   * A function which adds a given application to the window.
   *
   * @param {Application} application, instance of the Application object to be added
   * @memberof MainWindow
   */
  addApplication (application) {
    if (this._applications.length > 0) {
      application.setLeftPosition(`${parseInt(this._applications[this._applications.length - 1].getLeftPosition(), 10) +
      this._buttonWidth + this._buttonSpacer}`)
    } else {
      application.setLeftPosition(5)
    }
    this._applications.push(application)
    this._AppContainer.appendChild(application)
  }
}

export default MainWindow
