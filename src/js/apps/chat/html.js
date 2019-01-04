const htmlTemplate = document.createElement('template')
htmlTemplate.innerHTML = /* html */ `
 <link type="text/css" rel="stylesheet" href="/css.js" />
 <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
 <div id="infoArea">
 </div>
 <div id="chatArea">
  <div id="chatHeader">
  </div>
  
  <div id="chatContent">
  <div id="imageTest">
  </div>
</div>

<template id="messageTemplate">
  <span id="userName"></span>
  <span id="message"></span>
  <br>
  <br>
  <span id="clientName"></span> <input id="chatInput" />
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
