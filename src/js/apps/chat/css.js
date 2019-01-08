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


#infoArea {
  width: 30%;
  height: 100%;
  left:0;
  bottom:0;
  top:0;
  position: absolute;
  border-right: solid black;
}

#channelButton{
  position: absolute;
  top: 10px;
  left: 10px;
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

#chatHeaderInfo{
  position: absolute;
  width: 60%;
  height: 100%;
  margin:0;
  padding: 0;
}

#headerUserP{
  position: absolute;
  top:3px;
  left: 5px;
  padding: 0;
  margin: 0;
}

#headerChannelP{
  position: absolute;
  bottom: 3px;
  left: 5px;
  padding: 0;
  margin: 0;
}
  

#toggleScrollButton{
  position: absolute;
  width:35%;
  right: 5px;
  top: 20%;
  height: 60%;
  bottom: 20%;
}

#userTempInputArea{
  width: 95%;
  
  margin:5px;
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
  margin:5px;
  
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
  
  background-color:#696666;
  border-left: 1px black solid;
  border-top: 1px black solid;
  padding: 0px;
  top:10%;
  height:90%;
  width:100%;
  
}

.scrollerOff{
  overflow-x:hidden;
  overflow-y:hidden;
}

.scrollerOn {
  overflow-x:hidden;
  overflow-y:scroll;
}

</style>
`

export default cssTemplate
