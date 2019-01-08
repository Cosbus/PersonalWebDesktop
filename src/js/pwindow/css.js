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
    border: black;
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

  .workSpaceMainWindow {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
  }
  
  .workSpaceSubWindow {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top:20px;
    width: 100%;
    bottom:0;
  }

  .subWindow {
    border-radius:2.5%;
    -webkit-box-shadow: 10px 10px 30px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 30px -6px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 30px -6px rgba(0,0,0,0.75);
    overflow: hidden;
    background-color: rgba(168, 218, 220, 1.00);
  }

  .subWindow:active {
    
    background-color: rgba(168, 218, 220, 1.00);
  }

  .subWindow:hover {
    cursor: pointer;
  }


  .defaultSetting {
    
    border-style: solid;
    
    background-color: rgba(168, 218, 220, 1.00);
    position: absolute;
    
  }

  .headerClass {
    position: absolute;
    top: 0;
    height: 20px;
    width: 100%;
    background: #787878;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: solid black;
  }

  .headerClass:hover {
    cursor: move;
  }

  .closeWindowClass {
    position:absolute;
    right: 0px;
    height: 100%;
    background:#787878;
    color: #F8F8F8;
    border: none;
    padding-left: 5px;
  }

  .closeWindowClass:hover{
    background: red;
  }

  
.dropdown {
  position: absolute;
  padding-left: 10px;
  padding-right: 5px;
  left: 0px;
  color:#F8F8F8;
  display: inline-block;
}

.dropdown-content {
  display: none;
  border: solid black;
  position: absolute;
  background-color: #303030;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-sub1-content {
  display: none;
  border: solid black;
  position: absolute;
  background-color: #303030;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 2;
}

.dropdown-element {
  color: #F8F8F8;
  text-align: center;
}

.dropdown-element:hover {
  background-color: #00BFFF;
}

.dropdown:hover {
  cursor: default;
  background-color: #00BFFF;
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
