function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const $ = document.querySelector.bind(document)

class Cocktail {
    constructor(data) {
        this.data = data
        this.instructions = data.strInstructions
        this.image = data.strDrinkThumb
        this.name = data.strDrink
        this.glass = data.strGlass
        this.ingredients = []
        for (let i=1;i<=15;i++) {
            let currentIngredient = data[`strIngredient${i}`]
            let currentMeasurement = data[`strMeasure${i}`]
            if (currentIngredient && currentMeasurement) {
                this.ingredients.push(currentMeasurement + ' of ' + currentIngredient)
            }
            else if (currentIngredient && currentMeasurement == '1') {
                this.ingredients.push(currentMeasurement + ' ' + currentIngredient)
            }
        }
    }


}

let cocktailList = []
$('#submit').addEventListener('click', submitSearch)


function submitSearch() {
    let search = $('#search').value
    getCocktails(search)
}

function getCocktails(search) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (drink of data.drinks) {
            cocktailList.push(new Cocktail(drink))
        }
        cocktailList.forEach((drink, i) => {
            setTimeout(
                function(){
                    updateView(drink)
                }, i * 8000)
            })
  });
  console.log(cocktailList)
  
}
//UI UPDATES
function updateView(drink) {
    console.log(drink)
    $('#drinkName').innerHTML = drink.name
    $('#drinkImage').src = drink.image
    $('#drinkInstructions').innerHTML = drink.instructions
    let ingredientsHTML = ''
    drink.ingredients.forEach((ingredient) => {
            console.log(ingredient)
            ingredientsHTML += `<li>${ingredient}</li>`
        })
    console.log(ingredientsHTML)
    $('#ingredients').innerHTML = ingredientsHTML
}
