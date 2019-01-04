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
   
  }

  #configArea{
    border-top: solid black;
    margin-top: -5px;
    padding: 10px;
  }

  #clearButton {
  
  }

</style>
`

export default cssTemplate
