import cssTemplate from './css.js'
import htmlTemplate from './html.js'
import SubWindow from '../../pwindow/sub-window.js'
import ChannelView from './channelView/channel-view.js'
import Dragger from '../../utils/Dragger.js'
import WindowHandler from '../../utils/WindowHandler.js'
import UserNameView from '../../utils/usernameView/username-view.js'

class ChatApp extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._testDiv = this.shadowRoot.querySelector('#imageTest')

    this._importImage = null
    this._connected = false

    this._containerHeader = null

    this._headerTemplate = this.shadowRoot.querySelector('#headerTemplate')
      .content.cloneNode(true)

    this._container = this.shadowRoot.querySelector('#chatContainer')
    this._chatContent = this.shadowRoot.querySelector('#chatContent')
    this._toggleScrollButton = this.shadowRoot.querySelector('#toggleScrollButton')
    this._headerUserP = this.shadowRoot.querySelector('#headerUserP')
    this._headerChannelP = this.shadowRoot.querySelector('#headerChannelP')
    this._channelButton = this.shadowRoot.querySelector('#channelButton')

    this._chatTextArea = null
    this._clientName = null
    this._tempText = ''
    this._isFocused = true
    this._scrollerOff = true

    this._chatContent.classList.add('scrollerOff')

    this._serverURL = 'ws://vhost3.lnu.se:20080/socket/'
    this._webSocket = null
    this._userName = 'Claes'
    this._key = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    this._data = 'testMessage'
    this._type = 'message'
    this._channel = 'testChannel'

    this._height = 400
    this._width = 500

    this._subWindowOpen = false
    this._windowHandler = new WindowHandler(this._container)
    this._dragger = new Dragger(this._container, this._windowHandler)
  }

  connectedCallback () {
    this._initWebSocket()
    this._populateHeaderInfo()

    // Open user-name view
    this._openUserNameWindow()

    this.shadowRoot.addEventListener('click', event => {
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
      }
    })

    // this._chatContent.addEventListener('click', event => {
    // this._chatTextArea.focus()
    // })

    this._webSocket.addEventListener('message', event => {
      if (this._connected) {
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
      this._clientName = messageTemplate.querySelectorAll('#clientName')[messageTemplate.querySelectorAll('#clientName').length - 1]
      this._clientName.textContent = this._userName + ': '
      this._chatTextArea = messageTemplate.querySelectorAll('#chatTextArea')[messageTemplate.querySelectorAll('#chatTextArea').length - 1]
      this._chatContent.appendChild(messageTemplate)
      this._chatTextArea.value = this._tempText
      if (this._isFocused) {
        this._chatTextArea.focus()
      }

      if (this._chatContent.scrollHeight > this._chatContent.clientHeight) { // Overflow
        this._chatContent.scroll(0, this._chatContent.scrollHeight - 10)
      }

      this._chatTextArea.addEventListener('keydown', this._chatTextAreaEvent.bind(this))
    })
  }

  disconnectedCallback () {
    this._webSocket.close()
  }

  _chatTextAreaEvent (event) {
    if (event.keyCode === 13) {
      this._sendMessage(this._chatTextArea.value)
      this._chatTextArea.removeEventListener('keydown', this._chatTextAreaEvent)
      this._chatTextArea.value = ''
      this._chatTextArea.remove()
    }
  }

  _populateHeaderInfo () {
    this._headerChannelP.textContent = 'Channel: ' + this._channel
    this._headerUserP.textContent = 'User: ' + this._userName
  }

  _openChannelWindow () {
    let channelView = new ChannelView()
    let channelWindow = new SubWindow(channelView)
    this._windowHandler.addWindow(channelWindow, channelView.getWidthRequired(),
      channelView.getHeightRequired())
    this._dragger.startListening()
    console.log('openchannel')
    this._subWindowOpen = true
  }

  _openUserNameWindow () {
    let userNameView = new UserNameView()
    let userNameWindow = new SubWindow(userNameView)
    this._windowHandler.addWindow(userNameWindow, userNameView.getWidthRequired(),
      userNameView.getHeightRequired())
    this._dragger.startListening()

    this._subWindowOpen = true
  }

  _initWebSocket () {
    this._webSocket = new window.WebSocket(this._serverURL)
  }

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

  importImageURL (imageURL) {
    this._importImageURL = imageURL
  }

  pasteImage () {
    let element = document.createElement('img')
    element.src = this._importImageURL
    this._testDiv.appendChild(element)
  }

  getImage () {
    return this._importImage
  }

  getWidthRequired () {
    return this._width
  }

  getHeightRequired () {
    return this._height
  }

  setContainerHeader (header) {
    this._containerHeader = header
    this._containerHeader.appendChild(this._headerTemplate)
  }

  setFocusedTrue () {
    this._isFocused = true
  }

  setFocusedFalse () {
    console.log('lost focus')
    this._isFocused = false
  }
}

export default ChatApp
