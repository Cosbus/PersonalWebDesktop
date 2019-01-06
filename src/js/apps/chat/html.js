const htmlTemplate = document.createElement('template')
htmlTemplate.innerHTML = /* html */ `
 <link type="text/css" rel="stylesheet" href="/css.js" />
 <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
<div id="chatContainer">
  <div id="infoArea">
    <button id="channelButton">Channel +</button>
  </div>
  <div id="chatArea">
    <div id="chatHeader">
      <div id="chatHeaderInfo">
        <p id="headerUserP">Username:</p>
        <p id="headerChannelP">Channel:</p>
      </div>
      <button id="toggleScrollButton">Toggle scroll</button>
    </div>
    
    <div id="chatContent">
    <div id="imageTest">
    </div>
  </div>
</div>

<template id="messageTemplate">
  <div id="messageArea">
    <div id="userName"></div>
    <div id="message"></div>
  </div>
  <br>
  <div id="userTempInputArea">
    <div id="clientName"></div>
    <textarea id="chatTextArea"></textarea> 
  </div>
</template>

<template id="headerTemplate">
  <div class="dropdown">
    <span>Configure</span>
    <div class="dropdown-content">
      <p id="dropdown-about" class="dropdown-element">About</p>
      <p id="dropdown-name" class="dropdown-element"></p>
    </div>
  </div>
</template>

`

export default htmlTemplate