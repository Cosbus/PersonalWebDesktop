
import Pwindow from './p-window.js'

class SubWindow extends Pwindow {
  constructor () {
    super()

    // Remove unused elements
    this.shadowRoot.querySelector('#expandBubble').remove()

    this._container.classList.add('subWindow')
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
