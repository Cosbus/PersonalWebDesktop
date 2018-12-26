const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = /* html */ `

<style>
  :host {
    height: 100%;
    margin: 0; 
    
  }

  html, body {
    
  }

  .mainWindow {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
  }

  .defaultSetting {
    border: red;
    border-style: solid;
    background: blue;
    position: absolute;
    top: 25%;
    left: 25%;
    height: 30%;
    width: 30%;
  }

  .headerClass {
    position: absolute;
    top: 0;
    height: 10%;
    width: 100%;
    background: red;
  }

  .closeWindowClass {
    position:absolute;
    right:0;
    top:10%;
    width: 5%;
    height: 80%;
    background: green;
  }

  #mainContainer {
 
    
  }

  h1 {
    color: yellow;
  }
</style>
`

export default cssTemplate
