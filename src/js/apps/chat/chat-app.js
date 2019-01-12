import cssTemplate from './css.js'
import htmlTemplate from './html.js'
import SubWindow from '../../pwindow/sub-window.js'
import Dragger from '../../utils/Dragger.js'
import WindowHandler from '../../utils/WindowHandler.js'
import InputView from '../../utils/inputView/input-view.js'

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
    this._mainDropDownActive = false

    this._headerTemplate = this.shadowRoot.querySelector('#headerTemplate')
      .content.cloneNode(true)

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
    this._windowHandler = new WindowHandler(this._container)
    this._dragger = new Dragger(this._container, this._windowHandler)
  }

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

  disconnectedCallback () {
    window.localStorage.setItem(this._localStorageForChannels, JSON.stringify(this._channels))

    this._webSocket.close()

    this._webSocket.removeEventListener(this._receiveMessage)
  }

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

  _closeDropDown () {
    this._mainDropDownActive = false
    this._containerHeader.querySelector('.dropdown-content').style.display = 'none'
  }

  _populateChannelsArea () {
    // remove any possible content
    this._clearContainer(this._bottomChannelArea)
    let channelTemplate = this.shadowRoot.querySelector('#channelsTemplate')
      .content.cloneNode(true)
    this._bottomChannelArea.appendChild(channelTemplate)

    let firstItem = this._bottomChannelArea.querySelector('#channelName')
    // this._bottomChannelArea.appendChild(firstItem)

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

  _clearContainer (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
  }

  _receiveMessage (event) {
    if (this._channel === 'Echo-channel') {
      this._parseMessage(event)
    } else if (this._channel === JSON.parse(event.data).channel) {
      this._parseMessage(event)
    }
  }

  _parseMessage (event) {
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
    this._repopulateUserTextArea(messageTemplate)
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
    let channelView = new InputView('channel')
    let channelWindow = new SubWindow(channelView, false)
    this._windowHandler.addWindow(channelWindow, channelView.getWidthRequired(),
      channelView.getHeightRequired())
    this._dragger.startListening()
    this._subWindowOpen = true
    channelView.addEventListener('changeInput', this._channelAdded.bind(this))
  }

  _channelAdded (event) {
    this._channel = event.detail.getInput()
    this._channels.push(this._channel)
    this._channelChanged()
  }

  _channelChanged () {
    this._populateChannelsArea()
    this._headerChannelP.textContent = 'Channel: ' + this._channel

    let messageTemplate = this.shadowRoot.querySelector('#messageTemplate')
      .content.cloneNode(true)

    messageTemplate.querySelector('#userName').textContent = 'Chat-app:'
    messageTemplate.querySelector('#message').textContent = `You changed channel to "${this._channel}"`
    this._repopulateUserTextArea(messageTemplate)
  }

  _repopulateUserTextArea (messageTemplate) {
    this._clientName = messageTemplate.querySelectorAll('#clientName')[messageTemplate.querySelectorAll('#clientName').length - 1]
    this._clientName.textContent = this._userName + ': '
    this._chatTextArea = messageTemplate.querySelectorAll('#chatTextArea')[messageTemplate.querySelectorAll('#chatTextArea').length - 1]
    this._chatContent.appendChild(messageTemplate)
    this._chatTextArea.value = this._tempText

    if (this._isFocused && !this._userNameWindowOpen) {
      this._chatTextArea.focus()
    }
    if (this._chatContent.scrollHeight > this._chatContent.clientHeight) { // Overflow
      this._chatContent.scroll(0, this._chatContent.scrollHeight - 10)
    }

    this._chatTextArea.addEventListener('keydown', this._chatTextAreaEvent.bind(this))
  }

  _openUserNameWindow () {
    let userNameView = new InputView('username')
    let userNameWindow = new SubWindow(userNameView, false)
    this._windowHandler.addWindow(userNameWindow, userNameView.getWidthRequired(),
      userNameView.getHeightRequired())
    this._dragger.startListening()
    this._subWindowOpen = true
    userNameView.addEventListener('changeInput', e => {
      this._userName = userNameView.getInput()
      window.localStorage.setItem(this._localStorageForName, this._userName)
      this._headerUserP.textContent = 'User: ' + this._userName
      this._clientName.textContent = this._userName + ': '
      this._chatTextArea.focus()
    })

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
    this._isFocused = false
  }
}

export default ChatApp
