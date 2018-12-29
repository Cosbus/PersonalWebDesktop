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
    border: red;
    border-style: solid;
    background: url("../image/Tarfala.svg") no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover; 
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }

  #workSpace {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    height: 90%;
    width: 100%;
  }


  .subWindow {;
  }

  .subWindow:active {
    background-color: rgba(168, 218, 220, 1.00);
  }

  .subWindow:hover {
    cursor: pointer;
  }


  .defaultSetting {
    
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
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .headerClass:hover {
    cursor: move;
    border-width: 20px;
  }

  .closeWindowClass {
    position:absolute;
    right: 2px;
    height: 90%;
    background: green;
  }

  #mainContainer {
 
    
  }

  .expandBubbleClass {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 30px;
    background: aqua;
    border: 1px solid blue;
    
  }

  


  h1 {
    color: yellow;
  }
</style>
`

export default cssTemplate
