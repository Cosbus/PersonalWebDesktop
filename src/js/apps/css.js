const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = /* html */ `

<style>
  :host {
    height: 100%;
    margin: 0; 
  }

  button {
    position:absolute;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 12px;
    height:40px;
    width:40px;
    display:flex;
    align-items: center;
    justify-content: center;
  }

  /*button img {
    display: block;
    height: 30px;  
    width: 30px
  }*/

  button:hover {
    background-color:  #4CAF50; /* Green */
    color: white;
  }
</style>
`

export default cssTemplate
