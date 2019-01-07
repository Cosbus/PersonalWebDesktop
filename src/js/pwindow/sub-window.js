
import Pwindow from './p-window.js'

class SubWindow extends Pwindow {
  constructor (windowContent) {
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
    this._content.setContainerHeader(this._containerHeader)

    this._closeWindowEvent = null
  }

  connectedCallback () {
    this._closeWindowEvent = new window.CustomEvent('closeWindow', { detail: this._container })
    this._container.addEventListener('click', e => {
      // Closebutton clicked
      if (e.target === this.shadowRoot.querySelector('#closeWindowButton')) {
        this.dispatchEvent(this._closeWindowEvent)
        //  e.target.parentNode.parentNode.remove()
      }
    })
  }

  isFocused () {
    this._content.setFocusedTrue()
  }

  isNotFocused () {
    this._content.setFocusedFalse()
  }
}

export default SubWindow
