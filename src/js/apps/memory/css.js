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

#memoryContainer{
  padding:5px;
  text-align: center;
  
}

#infoArea{
  height:50px;
  padding:5px;
  border-top:solid black;
}



</style>
`

export default cssTemplate
