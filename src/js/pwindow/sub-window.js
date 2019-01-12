
import Pwindow from './p-window.js'

class SubWindow extends Pwindow {
  constructor (windowContent, header = true) {
    super()

    // Remove unused elements
    this.shadowRoot.querySelector('#expandBubble').remove()

    this._container.classList.add('subWindow')

    this._content = windowContent
    // this._headerTemplate = headerTemplate
    this._workSpace = this._container.querySelector('#workSpace')

    this._workSpace.classList.add('workSpaceSubWindow')
    this._workSpace.appendChild(this._content)
    // this._containerHeader.appendChild(this._headerTemplate)
    if (header) {
      this._content.setContainerHeader(this._containerHeader)
    }
    this._closeWindowEvent = null
  }

  connectedCallback () {
    this._closeWindowEvent = new window.CustomEvent('closeWindow', { detail: this._container })
    this._container.addEventListener('click', this._containerClicked.bind(this))
    this._content.addEventListener('closeView', e => {
      this.dispatchEvent(this._closeWindowEvent)
    })
  }

  disconnectedCallback () {
    this._container.removeEventListener('click', this._containerClicked)
  }

  _containerClicked (event) {
  // Closebutton clicked
    if (event.target === this.shadowRoot.querySelector('#closeWindowButton')) {
      this.dispatchEvent(this._closeWindowEvent)
    }
  }

  isFocused () {
    this._content.setFocusedTrue()
  }

  isNotFocused () {
    this._content.setFocusedFalse()
  }
}

export default SubWindow
