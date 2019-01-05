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

#userTempInputArea{
  width: 95%;
  left:0;
}

#clientName {
  width: 100%;
  left:0;
  top:0;
  color:#FFD700;
}

#chatTextArea {
  outline: none;
  background: #696666;
  border: none;
  color:#86e2d5;
  width:100%;
  }

#messageArea{
  width: 95%;
  left: 0;
  color:#baf73c;
}

#userName{
  width: 100%;
  left: 0;
  color: #FFD700;
}

#message {
  width: 100%;
  left: 0;
}

#chatContent{
  position:absolute;
  overflow-wrap: break-word;
  overflow:scroll;
  
  background-color:#696666;
  border-left:1px black solid;
  
  padding:5px;
  bottom:10px;
  height:85%;
  width:100%;

  
}

::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}

</style>
`

export default cssTemplate
