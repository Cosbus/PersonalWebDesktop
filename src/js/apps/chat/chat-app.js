/**
 * Module for ChatApp.
 *
 * @module src/js/apps/chat/chat-app.js
 * @author Claes Weyde
 * @version 1.0.0
 */

import cssTemplate from './css.js'
import htmlTemplate from './html.js'
import SubWindow from '../../pwindow/sub-window.js'
import Dragger from '../../utils/Dragger.js'
import WindowHandler from '../../utils/WindowHandler.js'
import InputView from '../../utils/inputView/input-view.js'

/**
 * A class which handles a chat-app.
 *
 * @class ChatApp
 * @extends window.HTMLElement
 **/
class ChatApp extends window.HTMLElement {
  /**
   * Creates an instance of ChatApp.
   *
   * @memberof ChatApp
   * @constructor
   */
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._testDiv = this.shadowRoot.querySelector('#imageTest')

    this._importImage = null
    this._connected = false

    this._containerHeader = null
    this._mainDropDownActive = false

    this._headerTemplate = this.shadowRoot.querySelector('#headerTemplate')
      .content.cloneNode(true)
    this.icon = ''

    this._container = this.shadowRoot.querySelector('#chatContainer')
    this._chatContent = this.shadowRoot.querySelector('#chatContent')
    this._toggleScrollButton = this.shadowRoot.querySelector('#toggleScrollButton')
    this._headerUserP = this.shadowRoot.querySelector('#headerUserP')
    this._headerChannelP = this.shadowRoot.querySelector('#headerChannelP')
    this._channelButton = this.shadowRoot.querySelector('#channelButton')
    this._clearChannelsButton = this.shadowRoot.querySelector('#clearChannelsButton')
    this._bottomChannelArea = this.shadowRoot.querySelector('#bottomChannelArea')

    this._chatTextArea = null
    this._clientName = null
    this._tempText = ''
    this._isFocused = true
    this._scrollerOff = true

    this._chatContent.classList.add('scrollerOff')

    this._serverURL = 'ws://vhost3.lnu.se:20080/socket/'
    this._webSocket = null
    this._userName = ''
    this._localStorageForName = 'ChatName'
    this._key = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    this._data = ''
    this._type = 'message'
    this._channel = 'Echo-channel'
    this._channels = []
    this._localStorageForChannels = 'ChatChannels'

    this._userNameWindowOpen = false

    this._height = 400
    this._width = 500

    this._subWindowOpen = false
    this._subWindow = ''
    this._windowHandler = new WindowHandler(this._container)
    this._dragger = new Dragger(this._container, this._windowHandler)
  }

  /**
   * A function which is called when the chat object is placed on the global window.
   *
   * @memberof ChatApp
   */
  connectedCallback () {
    if (window.localStorage.getItem(this._localStorageForName)) {
      this._userName = window.localStorage.getItem(this._localStorageForName)
    } else {
      // Open user-name view
      this._openUserNameWindow()
    }

    if (window.localStorage.getItem(this._localStorageForChannels)) {
      this._channels = JSON.parse(window.localStorage.getItem(this._localStorageForChannels))
    } else {
      // No channels saved
      this._channels.push(this._channel)
    }

    this._initWebSocket()
    this._populateHeaderInfo()
    this._populateChannelsArea()

    this._container.addEventListener('windowRemoved', e => {
      this._userNameWindowOpen = false
    })

    this._containerHeader.addEventListener('click', this._dropDownClick.bind(this))

    this.shadowRoot.addEventListener('click', event => {
      if (this._mainDropDownActive) {
        this._closeDropDown()
      }
      switch (event.target) {
        case this._toggleScrollButton:
          if (this._scrollerOff) {
            this._chatContent.classList.remove('scrollerOff')
            this._chatContent.classList.add('scrollerOn')
            this._scrollerOff = false
          } else {
            this._chatContent.classList.remove('scrollerOn')
            this._chatContent.classList.add('scrollerOff')
            this._scrollerOff = true
          }
          this._chatTextArea.focus()
          break
        case this._chatContent:
          this._chatTextArea.focus()
          break
        case this._channelButton:
          this._openChannelWindow()
          break
        case this._clearChannelsButton:
          this._channels = []
          this._channels.push(this._channel)
          window.localStorage.removeItem(this._localStorageForChannels)
          this._populateChannelsArea()
          break
        default:
          let channels = this._bottomChannelArea.querySelectorAll('#channelName')
          for (let i = 0; i <= this._channels.length; i++) {
            if (event.target === channels[i]) {
              this._channel = channels[i].textContent
              this._channelChanged()
            }
          }
          break
      }
    })

    this._webSocket.addEventListener('message', this._receiveMessage.bind(this))
  }

  /**
   * A function which is called when the chat object is removed from the global window.
   *
   * @memberof ChatApp
   */
  disconnectedCallback () {
    window.localStorage.setItem(this._localStorageForChannels, JSON.stringify(this._channels))

    this._webSocket.close()
  }

  /**
   * A function which is called when the drop-down menu is clicked.
   *
   * @param {event} event, the clicking event.
   *
   * @memberof ChatApp
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
      case this._containerHeader.querySelector('#dropdown-name'):
        this._closeDropDown()
        if (!this._userNameWindowOpen) {
          this._openUserNameWindow()
        }
        break
      default:
        this._closeDropDown()
        break
    }
  }

  /**
   * A function which closed the drop-down menu.
   *
   * @memberof ChatApp
   */
  _closeDropDown () {
    this._mainDropDownActive = false
    this._containerHeader.querySelector('.dropdown-content').style.display = 'none'
  }

  /**
   * A function which populates the channel area with channels and buttons.
   *
   * @memberof ChatApp
   */
  _populateChannelsArea () {
    // remove any possible content
    this._clearContainer(this._bottomChannelArea)
    let channelTemplate = this.shadowRoot.querySelector('#channelsTemplate')
      .content.cloneNode(true)
    this._bottomChannelArea.appendChild(channelTemplate)

    let firstItem = this._bottomChannelArea.querySelector('#channelName')

    for (let i = 0; i < this._channels.length; i++) {
      let item = firstItem.cloneNode(true)
      item.textContent = this._channels[i]
      this._bottomChannelArea.appendChild(item)
    }
    if (this._bottomChannelArea.scrollHeight > this._bottomChannelArea.clientHeight) { // Overflow
      if (this._bottomChannelArea.classList.contains('scrollerOff')) {
        this._bottomChannelArea.classList.remove('scrollerOff')
        this._bottomChannelArea.classList.add('scrollerOn')
      }
    } else {
      if (this._bottomChannelArea.classList.contains('scrollerOn')) {
        this._bottomChannelArea.classList.remove('scrollerOn')
        this._bottomChannelArea.classList.add('scrollerOff')
      }
    }
  }

  /**
   * A function which clears a given container from HTML-elements.
   *
   * @param {HTMLElement} container, the container to clear.
   *
   * @memberof ChatApp
   */
  _clearContainer (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
  }

  /**
   * A function handling the starting point of receiving messages from the server.
   *
   * @param {event} event, the message event.
   *
   * @memberof ChatApp
   */
  _receiveMessage (event) {
    if (this._channel === 'Echo-channel') {
      this._parseMessage(event)
    } else if (this._channel === JSON.parse(event.data).channel) {
      this._parseMessage(event)
    }
  }

  /**
   * A function which parses the messages received.
   *
   * @param {event} event, the message event.
   *
   * @memberof ChatApp
   */
  _parseMessage (event) {
    if (JSON.parse(event.data).username === 'The Server' &&
    JSON.parse(event.data).data === '') {
      return
    } else if (this._connected) {
      this._tempText = this._chatTextArea.value
      this._chatTextArea.remove()
      this._clientName.remove()
    } else if (JSON.parse(event.data).username === 'The Server' &&
    JSON.parse(event.data).data === 'You are connected!') {
      this._connected = true
    }

    let messageTemplate = this.shadowRoot.querySelector('#messageTemplate')
      .content.cloneNode(true)

    messageTemplate.querySelector('#userName').textContent = JSON.parse(event.data).username + ':'
    messageTemplate.querySelector('#message').textContent = JSON.parse(event.data).data
    this._repopulateUserTextArea(messageTemplate)
  }

  /**
   * A function which handles events in the chat-text-area (where the user writes messages)
   *
   * @param {event} event, the chat text event.
   *
   * @memberof ChatApp
   */
  _chatTextAreaEvent (event) {
    if (event.keyCode === 13) {
      this._sendMessage(this._chatTextArea.value)
      this._chatTextArea.removeEventListener('keydown', this._chatTextAreaEvent)
      this._chatTextArea.value = ''
      this._chatTextArea.remove()
    }
  }

  /**
   * A function which fills the header of the informational area with pertinent information.
   *
   * @memberof ChatApp
   */
  _populateHeaderInfo () {
    this._headerChannelP.textContent = 'Channel: ' + this._channel
    this._headerUserP.textContent = 'User: ' + this._userName
  }

  /**
   * A function which opens an inputView for change of channel.
   *
   * @memberof ChatApp
   */
  _openChannelWindow () {
    if (this._subWindowOpen) {
      return
    }
    let channelView = new InputView('channel')
    let channelWindow = new SubWindow(channelView, false)
    this._subWindowOpen = true
    this._subWindow = channelWindow
    channelWindow.addEventListener('closeWindow', e => {
      this._subWindowOpen = false
    })
    this._windowHandler.addWindow(channelWindow, channelView.getWidthRequired(),
      channelView.getHeightRequired())
    this._dragger.startListening()
    this._subWindowOpen = true
    channelView.addEventListener('changeInput', this._channelAdded.bind(this))
  }

  /**
   * A function which handles events when a new channel is added.
   *
   * @param {event} event, the event leading to the channel being added.
   *
   * @memberof ChatApp
   */
  _channelAdded (event) {
    this._channel = event.detail.getInput()
    this._channels.push(this._channel)
    this._channelChanged()
  }

  /**
   * A function which handles the event of the user changing the channel.
   *
   * @memberof ChatApp
   */
  _channelChanged () {
    this._populateChannelsArea()
    this._headerChannelP.textContent = 'Channel: ' + this._channel

    let messageTemplate = this.shadowRoot.querySelector('#messageTemplate')
      .content.cloneNode(true)

    messageTemplate.querySelector('#userName').textContent = 'Chat-app:'
    messageTemplate.querySelector('#message').textContent = `You changed channel to "${this._channel}"`
    this._repopulateUserTextArea(messageTemplate)
  }

  /**
   * A function which populates the user text are.
   *
   * @param {HTMLElement} messageTemplate, a template containing the chat format and info.
   *
   * @memberof ChatApp
   */
  _repopulateUserTextArea (messageTemplate) {
    this._clientName = messageTemplate.querySelectorAll('#clientName')[messageTemplate.querySelectorAll('#clientName').length - 1]
    this._clientName.textContent = this._userName + ': '
    this._chatTextArea = messageTemplate.querySelectorAll('#chatTextArea')[messageTemplate.querySelectorAll('#chatTextArea').length - 1]
    this._chatContent.appendChild(messageTemplate)
    this._chatTextArea.value = this._tempText

    if (this._isFocused) {
      if (this._subWindowOpen) {
        this._subWindow.focus()
      } else {
        this._chatTextArea.focus()
      }
    }
    if (this._chatContent.scrollHeight > this._chatContent.clientHeight) { // Overflow
      this._chatContent.scroll(0, this._chatContent.scrollHeight - 10)
    }

    this._chatTextArea.addEventListener('keydown', this._chatTextAreaEvent.bind(this))
  }

  /**
   * A function which opens a new inputView for the user to input a new name.
   *
   * @memberof ChatApp
   */
  _openUserNameWindow () {
    if (this._subWindowOpen) {
      return
    }
    let userNameView = new InputView('username')
    let userNameWindow = new SubWindow(userNameView, false)
    userNameWindow.addEventListener('closeWindow', e => {
      this._subWindowOpen = false
    })
    this._windowHandler.addWindow(userNameWindow, userNameView.getWidthRequired(),
      userNameView.getHeightRequired())
    this._dragger.startListening()
    this._subWindowOpen = true
    this._subWindow = userNameWindow
    userNameView.addEventListener('changeInput', e => {
      this._userName = userNameView.getInput()
      window.localStorage.setItem(this._localStorageForName, this._userName)
      this._headerUserP.textContent = 'User: ' + this._userName
      this._clientName.textContent = this._userName + ': '
      this._chatTextArea.focus()
    })

    this._subWindowOpen = true
  }

  /**
   * A function which initiates a new web socket.
   *
   * @memberof ChatApp
   */
  _initWebSocket () {
    this._webSocket = new window.WebSocket(this._serverURL)
  }

  /**
   * A function which is called to send a message to the server.
   *
   * @param {String} message, the message to be sent.
   *
   * @memberof ChatApp
   */
  _sendMessage (message) {
    let sendData = {
      'type': this._type,
      'data': message,
      'username': this._userName,
      'channel': this._channel,
      'key': this._key
    }
    this._webSocket.send(JSON.stringify(sendData))
  }

  /**
   * A function which returns the width required for the Chat App window.
   *
   * @return {number} the required width in px.
   *
   * @memberof ChatApp
   */
  getWidthRequired () {
    return this._width
  }

  /**
   * A function which returns the height required for the Chat App window.
   *
   * @return {number} the required height in px.
   *
   * @memberof ChatApp
   */
  getHeightRequired () {
    return this._height
  }

  /**
   * A function which sets the header of the Chat App window.
   *
   * @param {HTMLElement} header, the header of the Chat App window.
   *
   * @memberof ChatApp
   */
  setContainerHeader (header) {
    this._containerHeader = header
    this._containerHeader.appendChild(this._headerTemplate)
  }

  /**
   * A function which sets the icon URL of the Chat App window.
   *
   * @param {String} icon, the icon URL of the Chat App window.
   *
   * @memberof ChatApp
   */
  setIcon (icon) {
    this._icon = icon
    this._containerHeader.querySelector('#iconImg').src = icon
  }

  /**
   * A function which sets the focus of the ChatApp window to true.
   *
   * @memberof ChatApp
   */
  setFocusedTrue () {
    this._isFocused = true
  }

  /**
   * A function which sets the focus of the ChatApp window to false.
   *
   * @memberof ChatApp
   */
  setFocusedFalse () {
    this._isFocused = false
  }
}

export default ChatApp
