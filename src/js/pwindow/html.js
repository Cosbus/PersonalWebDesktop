const htmlTemplate = document.createElement('template')
htmlTemplate.innerHTML = /* html */ `
 <link type="text/css" rel="stylesheet" href="/css.js" />
 <div id="mainContainer" class="defaultSetting">
  <div id="containerHeader" class="headerClass">
    <button id="closeWindowButton" class="closeWindowClass">
  </div>
  <div id="workSpace">
    <div id="expandBubble" class="expandBubbleClass">
    </div>
  </div>
 </div>
`

export default htmlTemplate
