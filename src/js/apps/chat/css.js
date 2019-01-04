const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = /* html */ `

<style>
  :host {
    position:absolute;
    height: 100%;
    width:100%;
    padding: 0;
    margin: 0; 
  }

  html, body {
  }

#infoArea {
  width: 30%;
  height: 100%;
  left:0;
  bottom:0;
  top:0;
  position: absolute;
  border-right: solid black;
}

#chatArea{
  right:0;
  bottom:0;
  top:0;
  width:70%;
  height: 100%;
  position: absolute;
}

#chatHeader{
  position:absolute;
  top:0;
  left: 0;
  height:10%;
  width:100%;
  border-bottom: solid black;
}

#chatContent{
  position:absolute;
  overflow-wrap: break-word;
  overflow:scroll;
  
  padding:5px;
  bottom:0;
  height:88%;
  width:100%;
}

::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}

</style>
`

export default cssTemplate
