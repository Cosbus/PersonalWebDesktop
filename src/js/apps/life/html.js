const htmlTemplate = document.createElement('template')
htmlTemplate.innerHTML = /* html */ `
 <link type="text/css" rel="stylesheet" href="/css.js" />
 <div id ="mainDiv" width="450" height="430">
  <canvas id="canvas" width="450" height="400">
  </canvas>
  <div id="configArea" width="450" height="30">
    <button id="clearButton"> Clear </button>
    Line Width <select id="selWidth">
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="9" selected="selected">9</option>
            <option value="11">11</option>
        </select>
    Shape <select id="selShape">
      <option value="Rectangle">Rectangle</option>    
      <option value="Circle"> Circle </option>
    </select>
    <button id="shapeButton">Draw shape</button>
  </div>
 </div>
`

export default htmlTemplate
