(()=>{
  if(window.hasRun){
    return
  }
  window.hasRun = true

  // inserting the beast images
  const insertBeast = (imgUrl) => {
    const image = document.createElement('img')
    image.setAttribute('src', imgUrl)
    image.style.height = "100vh"
    image.className = 'beastify-image'
    document.body.appendChild(image)
  }

  // removing the beast images (on reset)
  const resetBeast = () => {
    const beasts = document.querySelectorAll('.beastify-image')

    for (const beast of beasts){
      beast.remove()
    }
  }

  // triggering run of these hhaahahah
  browser.runtime.onMessage.addListener(message => {
    if (message.command == 'beastify'){
      insertBeast(message.beastURL)
    } else if (message.command == 'reset') {
      resetBeast()
    }
  })



})()