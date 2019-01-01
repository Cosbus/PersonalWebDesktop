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
    position: absolute;
    height:100%;
    width:100%;
    margin:0;
  }

  #canvas {
   border:solid 2px;
   top: 0;
    position:absolute;
  }

  #configArea{
    bottom: 0;
    width:100%;
    border-top: solid 2px;
    position:absolute;
  }

  #clearButton {
  
  }

</style>
`

export default cssTemplate
