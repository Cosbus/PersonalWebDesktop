
import Pwindow from './p-window.js'

class SubWindow extends Pwindow {
  constructor (windowContent, size) {
    super()

    // Remove unused elements
    this.shadowRoot.querySelector('#expandBubble').remove()

    this._container.classList.add('subWindow')

    this._content = windowContent
    this._windowSize = size
    this._workSpace = this._container.querySelector('#workSpace')
    this._workSpace.appendChild(this._content)
  }

  connectedCallback () {
    this._container.addEventListener('click', e => {
      console.log('clicked')
      // Closebutton clicked
      if (e.target === this.shadowRoot.querySelector('#closeWindowButton')) {
        e.target.parentNode.parentNode.remove()
      }
    })
  }
}

export default SubWindow
