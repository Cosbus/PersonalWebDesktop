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
`
export default htmlTemplate
