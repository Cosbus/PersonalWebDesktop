const htmlTemplate = document.createElement('template')
htmlTemplate.innerHTML = /* html */ `
<div id="mainContainer">
  <div id="memoryContainer" class="memContainer">
    <template>
      <div class="memory">
        <a href="#"><img src="js/apps/memory/image/0.png" id="tile" /></a>
      </div>
    </template>
  </div>
  <div id="infoArea">
    <div id="playerNameArea" class="info">Name:</div>
    <div id="timeArea" class="info">Time: 0 s </div>
    <div id="triesArea" class="info">Number of tries: 0 </div>
    <button id="restartButton">Restart</button>
  </div>
</div>

<template id="headerTemplate">
  <div class="dropdown">
    <span id="configure">Configure</span>
    <div class="dropdown-content">
      <br>
      <div id="dropdown-size" class="dropdown-element">
        <span id="gameSize">Game size</span>
          <div class="dropdown-sub1-content"> 
            <div id="twox2" class="dropdown-element">2x2</div>
            <div id="twox4" class="dropdown-element">2x4</div>
            <div id="fourx2" class="dropdown-element">4x2</div>
            <div id="fourx4" class="dropdown-element">4x4</div>
          </div>
      </div>
      <hr>
      <div id="dropdown-name" class="dropdown-element">Player name</div>
      <br>  
    </div>
  </div>
</template>

<template id="highscoreTemplate">
  <div id="highScore">
    <div id="collectionTitle"><h4>High Scores</h4></div>
    <div id="item1" class="highscoreContainer">
      <div id="firstItem">
        Name
      </div>
      <div id="secondItem">
        Tries
      </div>
      <div id="thirdItem">
        Time
      </div>
    </div>
  </div>
</template>

`
export default htmlTemplate
