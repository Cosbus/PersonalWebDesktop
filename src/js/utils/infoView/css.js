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
    display:grid;
    grid-template-rows: 1fr 9fr;
  }

  #titleText{
    grid-row: 1;
    padding-top: 10px;
    justify-self: center;
    
    
  }

  #mainText{
    grid-row: 2;
    padding: 10px;
    outline: none;
    border: none;
    background-color: #B2E1E1;
  }

  <div id="container">
  <div id="titleText"></div>
  <div id="mainText"></div>
</div> 

</style>
`

export default cssTemplate
