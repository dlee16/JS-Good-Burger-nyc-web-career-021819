document.addEventListener("DOMContentLoaded", () => {
  //Application state
  let allBurgers
  
  const BURGER_URL = "http://localhost:3000/burgers"
  const burgerMenu = document.querySelector("#burger-menu")
  fetch(BURGER_URL)
  .then(res => res.json())
  .then(function(burgers){
    allBurgers = burgers
    renderAllBurgers()
  })

  //add to order button 
  burgerMenu.addEventListener('click', function(e){
    if (e.target.dataset.burgerid){
      const burgerName = e.target.parentElement.querySelector('h3').innerText
      const yourOrder = document.querySelector('#order-list')
      yourOrder.innerHTML += `<li>${burgerName}</li>`
    }// end of if

  })


  //submit custom burger
  const burgerForm = document.querySelector("#custom-burger")
  burgerForm.addEventListener('submit', function(e){
    e.preventDefault();
    const burgerNameValue = document.querySelector("#burger-name").value
    const burgerDescValue = document.querySelector("#burger-description").value
    const burgerImageValue = document.querySelector("#burger-image").value

    fetch(BURGER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: burgerNameValue,
        description: burgerDescValue,
        image: burgerImageValue
      })
    }).then(res => res.json())
    .then(function(burger){
      debugger
      const orderMenu = document.querySelector("#order-list")
      burgerMenu.innerHTML += renderSingleBurger(burger)
      orderMenu.innerHTML += `<li>${burger.name}</li>`
    })
  }) // end of form 

//Helper methods
function renderSingleBurger(burger){
  return `
    <div class="burger">
      <h3 class="burger_title">${burger.name}</h3>
      <img src=${burger.image}>
        <p class="burger_description">
         ${burger.description}
        </p>
        <button class="button" data-burgerId="${burger.id}">Add to Order</button>
    </div>
  `
}

function renderAllBurgers(){
  burgerMenu.innerHTML += allBurgers.map(renderSingleBurger)
}


}) // end of DOM 
