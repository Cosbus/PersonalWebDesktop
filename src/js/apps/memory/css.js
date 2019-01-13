const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = /* html */ `

<style>
  :host {
    position:absolute;
    width:100%;
    height:100%;
    margin:0;
  }
  

.memory img {
  width: 60px;
}

.memory .removed {
  visibility: hidden;
}

.memContainer{
  display: flex;
  justify-content: center;
  align-items: center;
  position:absolute;
  height: 65%;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  margin: 0;
  padding:0;
  bottom: 30%;
}

.highContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  
  height: 65%;
  left: 0;
  right: 0;
  top:0;
  margin: 0;
  padding:0;
  bottom: 30%;
}


#infoArea{
  height:35%;
  width:100%;
  display:grid;
  grid-template-rows: 1fr 1fr 1fr;
  position: absolute;
  bottom:0;
  border-top:black solid;
  
  margin: 0;
  padding:0;
}


.info {
  margin: 2px;
}

#highScore{
  margin:0;
  padding:0;  
}

#collectionTitle{
  margin: auto;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
 
}

.highscoreContainer {
  display: grid;
  grid-template-columns: 3fr 1fr 3fr;
  margin:0;
  padding:0;
}

#firstItem {
  grid-column: 1;  
  justify-self: center;
}

#secondItem {
  grid-column: 2;
  justify-self: center;
}

#thirdItem {
  grid-column: 3;
  justify-self: center;
}



</style>
`

export default cssTemplate
