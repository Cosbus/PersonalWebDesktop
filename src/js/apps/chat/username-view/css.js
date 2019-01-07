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
  #usernameInput{
    position: absolute;
    width: 100%;
  }

  #inputButton{
    position: absolute;
    top:20%;
    height:10%;
    width: 100%;
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
