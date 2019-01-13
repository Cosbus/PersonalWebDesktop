const htmlTemplate = document.createElement('template')
htmlTemplate.innerHTML = /* html */ `
 <link type="text/css" rel="stylesheet" href="/css.js" />
 <div id ="mainDiv">
  <canvas id="canvas" height="400px" width="450px">
  </canvas>
  <div id="configArea">
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
      <option value="Triangle"> Triangle </option>
      <option value="Random"> Random </option>
    </select>
    <button id="shapeButton">Draw shape</button>
    <br>  
    <br>
    <button id="stepButton"> Step </button>
    <button id="runButton"> Run Life! </button>
    <span id="lifeInfo">Iterations: 0</span>
    <button id="stopButton"> Stop </button>
    <button id="snapshotButton"> Download snapshot! </button>
  </div>
 </div>

 <template id= "headerTemplate">
  <div class="headerContainer">
    <img id="iconImg"  />
    <div class="dropdown">
      <span>Configure</span>
      <div class="dropdown-content">
        <p id="dropdown-about" class="dropdown-element">About</p>
        <p id="dropdown-name" class="dropdown-element"></p>
      </div>
    </div>
  </div>
</template>
`

export default htmlTemplate
