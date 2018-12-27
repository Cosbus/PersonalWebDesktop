const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = /* html */ `

<style>
  :host {
    
  }

  .selectAppDivClass {
    position: absolute;
    border-radius: 0 30px 0 0;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 30px;
    background: aqua;
    border: 1px solid blue;
  }

  .selectAppDivClass:hover {
    width: 50%;
    height: 50%;
  }

  </style>
`

export default cssTemplate
