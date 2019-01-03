const htmlTemplate = document.createElement('template')
htmlTemplate.innerHTML = /* html */ `
<div id="memoryContainer">
  <template>
    <div class="memory">
      <a href="#"><img src="js/apps/memory/image/0.png" id="tile" /></a>
    </div>
  </template>
</div>
<div id="infoArea">
  <div id="timeArea">Time: 0 seconds </div>
  <div id="triesArea">Number of tries: 0 </div>
</div>

<template id= "headerTemplate">
  <div class="dropdown">
    <span>Configure</span>
    <div class="dropdown-content">
      <p id="dropdown-size" class="dropdown-element">Game size</p>
      <p id="dropdown-name" class="dropdown-element">Player name</p>
    </div>
  </div>
</template>
`
export default htmlTemplate
