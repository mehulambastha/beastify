const hiddenClass = `body > :not(.beastify-image) {
  display: none;
}`

const listenForClicks = () => {
  document.addEventListener('click', (e) => {

    // return url for the beast name
    const returnBeastURL = (name) => {
      switch(name) {
        case 'Frog':
          return browser.runtime.getURL("assets/frog.jpeg") 
        case 'Turtle':
          return browser.runtime.getURL("assets/turtle.png") 
        case 'Snake':
          return browser.runtime.getURL("assets/snake.jpg") 
      }
    }

    // actually beastify the page
    const beastify = (tabs) => {
      browser.tabs.insertCSS({code: hiddenClass})
        .then(()=> {
          // getting the name front the target text of the element and finding out its URL
          const url = returnBeastURL(e.target.textContent)
          browser.tabs.sendMessage(tabs[0].id, {
            command: "beastify",
            beastURL: url
          }) 
        })
    }

    // reset button functionality
    const resetPage = (tabs) => {
      browser.tabs.removeCSS({code: hiddenClass})
        .then(()=>{
          browser.tabs.sendMessage(tabs[0].id, {
            command: "reset"
          })
        })
    }

    // error handling
    const errorLog = (error)=>{
      console.log("Error couldnt find image.\nLog: ", error)
    }

    // exit the event handler when it is not a valid button

    if (e.target.tagName !== "BUTTON" || !e.target.closest('#popup-content')){
      return 
    }


    // calling the findURL and beastify functions as required
    if (e.target.type == 'reset'){
      browser.tabs
        .query({ active: true})
        .then(resetPage)
        .catch((e)=>errorLog(e))

    } else {
      browser.tabs
        .query({ active: true})
        .then(beastify)
        .catch(errorLog)
    }
  })
}

const reportingScriptError = (error) => {
  document.getElementById('popup-content').classList.add('hidden')
  document.getElementById('error-content').classList.remove('hidden')
  console.log('Failed to inject script: ', error)
}

// FInally injecting the script
browser.tabs
  .executeScript({file: '/content_scripts/beastify.js'})
  .then(listenForClicks)
  .catch(reportingScriptError)