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
    position:absolute;
    height:100%;
    margin:0;
    width:100%;
  }

  #text{
    position:absolute;
    width: 100%;
    height:30%;
    margin:0;
    top:0;
  }

  #inputField{
    position: absolute;
    width: 100%;
    height:30%;
    margin:0;
    top:31%;
  }

  #inputButton{
    position: absolute;
    width: 100%;
    height:30%;
    margin:0;
    bottom:0;
  }

  .disabled{
    background-color: red;
  }

  .enabled{
    background-color: green;
  }


</style>
`

export default cssTemplate
