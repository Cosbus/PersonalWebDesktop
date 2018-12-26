
import Pwindow from './p-window.js'

class SubWindow extends Pwindow {
  constructor () {
    super()
    console.log('i subwindow')
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
