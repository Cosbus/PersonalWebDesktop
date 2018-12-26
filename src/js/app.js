import Pwindow from './pwindow/p-window.js'
import MainWindow from './pwindow/main-window.js'
import SubWindow from './pwindow/sub-window.js'

// Registering the custom elements here
window.customElements.define('p-window', Pwindow)
window.customElements.define('main-window', MainWindow)
window.customElements.define('sub-window', SubWindow)

let mainwin = new MainWindow()
document.querySelector('body').appendChild(mainwin)

let subwin1 = new SubWindow()
let subwin2 = new SubWindow()
mainwin.addSubWindow(subwin1)
mainwin.addSubWindow(subwin2)
/*
let pwindow = new Pwindow()
pwindow.makeMainWindow()
document.querySelector('body').appendChild(pwindow)

let pwindow2 = new Pwindow()

let pwindow3 = new Pwindow()
pwindow.addWindow(pwindow2)
pwindow.addWindow(pwindow3)s

// pwindow.makeMainWindow() */
