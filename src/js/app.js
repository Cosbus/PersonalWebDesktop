import Pwindow from './pwindow/p-window.js'
import MainWindow from './pwindow/main-window.js'
import SubWindow from './pwindow/sub-window.js'
import AppContainer from './apps/app-container.js'
import Memory from './apps/memory/memory-game.js'
import LifeGame from './apps/life/life-game.js'
import ChatApp from './apps/chat/chat-app.js'
import ChannelView from './apps/chat/channelView/channel-view.js' // Flytta dessa?
import UserNameView from './apps/chat/username-view/username-view.js' // Kanske flytta dessa?

// Registering the custom elements here
window.customElements.define('p-window', Pwindow)
window.customElements.define('main-window', MainWindow)
window.customElements.define('sub-window', SubWindow)
window.customElements.define('app-container', AppContainer)
window.customElements.define('memory-game', Memory)
window.customElements.define('life-game', LifeGame)
window.customElements.define('chat-app', ChatApp)
window.customElements.define('channel-view', ChannelView)
window.customElements.define('username-view', UserNameView)

let mainwin = new MainWindow()
document.querySelector('body').appendChild(mainwin)

let app1 = new AppContainer(Memory, 'none', 'memory', 4, 4)
let app2 = new AppContainer(LifeGame, 'none', 'life')
let app3 = new AppContainer(ChatApp, 'none', 'chat')
mainwin.addApplication(app1)

mainwin.addApplication(app2)
mainwin.addApplication(app3)
/*
let pwindow = new Pwindow()
pwindow.makeMainWindow()
document.querySelector('body').appendChild(pwindow)

let pwindow2 = new Pwindow()

let pwindow3 = new Pwindow()
pwindow.addWindow(pwindow2)
pwindow.addWindow(pwindow3)s

// pwindow.makeMainWindow() */
