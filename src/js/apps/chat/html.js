const htmlTemplate = document.createElement('template')
htmlTemplate.innerHTML = /* html */ `
 <link type="text/css" rel="stylesheet" href="/css.js" />
 <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
<div id="chatContainer">
  <div id="channelArea">
    <div id="topChannelArea">
      <button id="channelButton">Add channel</button>
      <button id="clearChannelsButton">Clear all channels</button>
    </div>
    <div id="bottomChannelArea" class="scrollerOff">
      
    </div>
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
    <span id="configure">Configure</span>
    <div class="dropdown-content">
      <p id="dropdown-name" class="dropdown-element">User name</p>
    </div>
  </div>
</template>

<template id="channelsTemplate">
  <h4>Channel</h4>
  <div id="channelName"></div>
</template>

`

export default htmlTemplate
