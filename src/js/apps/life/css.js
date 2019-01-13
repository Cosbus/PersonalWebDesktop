const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = /* html */ `

<style>
  :host {
    height: 100%;
    width: 100%;
    margin: 0; 
  }

  html, body {
    
  }

  #mainDiv {
   }

  #canvas {
    border-bottom: solid black;
    border-top: solid black;
  }

  #configArea{
    border-top: solid black;
    margin-top: -5px;
    padding: 10px;
    display: grid;
    grid-template-rows: 2fr 1fr 2fr;
  }

  #topConfig{
    grid-row:1;
    justify-self: center;
  }

  #bottomConfig{
    
    justify-self: center;
    grid-row:3;
  }

  #clearButton {
  
  }

</style>
`

export default cssTemplate
