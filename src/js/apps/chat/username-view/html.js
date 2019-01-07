const htmlTemplate = document.createElement('template')
htmlTemplate.innerHTML = /* html */ `
 <link type="text/css" rel="stylesheet" href="/css.js" />
 <div id="container">
  <div>Please give your username</div>
  <input id="usernameInput"></div>
  <button id="inputButton" disabled class="disabled"></div>
 </div> 
 
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
