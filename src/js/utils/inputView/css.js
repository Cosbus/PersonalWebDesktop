const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = /* html */ `

<style>
  :host {
    position:absolute;
    height: 100%;
    width:100%;
    margin: 0;
  }

  html, body {
  }

  #container{
    height: 100%;
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    align-items: center;
    
  }

  /*#text{
    position:absolute;
    width: 100%;
    height:30%;
    margin:0;
    top:0;
  }*/

  #text{
  }

  #inputField{
    width: 75%;
  }
  /*#inputField{
    position: absolute;
    width: 100%;
    height:30%;
    margin:0;
    top:31%;
  }*/ 

  #inputButton{
    width: 75%;
   }
  /*
  #inputButton{
    position: absolute;
    width: 100%;
    height:30%;
    margin:0;
    bottom:0;
  }*/

  .disabled{
    background-color: #529191;
    
    color: white;
  }

  .enabled{
    background-color: #063b3b;
    
    color: white;
  }


</style>
`

export default cssTemplate
