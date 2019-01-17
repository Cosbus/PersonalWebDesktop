/**
 * Module for app.
 *
 * The starting point of the application
 *
 * @module src/app.js
 * @author Claes Weyde
 * @version 1.0.0
 */

import Pwindow from './pwindow/p-window.js'
import MainWindow from './pwindow/main-window.js'
import SubWindow from './pwindow/sub-window.js'
import AppContainer from './apps/app-container.js'
import Memory from './apps/memory/memory-game.js'
import LifeGame from './apps/life/life-game.js'
import ChatApp from './apps/chat/chat-app.js'
import InputView from './utils/inputView/input-view.js'
import InfoView from './utils/infoView/info-view.js'

// Registering the custom elements here
window.customElements.define('p-window', Pwindow)
window.customElements.define('main-window', MainWindow)
window.customElements.define('sub-window', SubWindow)
window.customElements.define('app-container', AppContainer)
window.customElements.define('memory-game', Memory)
window.customElements.define('life-game', LifeGame)
window.customElements.define('chat-app', ChatApp)
window.customElements.define('input-view', InputView)
window.customElements.define('info-view', InfoView)

let mainwin = new MainWindow()
document.querySelector('body').appendChild(mainwin)

let app1 = new AppContainer(Memory, '../image/MemoryIcon.svg', 'memory', 2, 2)
let app2 = new AppContainer(LifeGame, '../image/LifeIcon.svg', 'life')
let app3 = new AppContainer(ChatApp, '../image/ChatIcon.svg', 'chat')
mainwin.addApplication(app1)

mainwin.addApplication(app2)
mainwin.addApplication(app3)
