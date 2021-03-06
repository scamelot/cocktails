const $ = document.querySelector.bind(document)

class Cocktail {
    constructor(data) {

        //all knowledge
        this.data = data

        // What are we drinking?
        this.name = data.strDrink
        
        this.instructions = data.strInstructions

        // what does it look like?
        this.image = data.strDrinkThumb

        //get a fresh glass
        this.glass = data.strGlass

        //mix up a cocktail with ingredients!
        this.ingredients = []
        for (let i=1;i<=15;i++) {

            // get amount and the goods
            let currentMeasurement = data[`strMeasure${i}`]
            let currentIngredient = data[`strIngredient${i}`]

            // if theres a measurement:
            if (currentIngredient && currentMeasurement) {
                this.ingredients.push(currentMeasurement + ' ' + currentIngredient)
            }
            else if (currentIngredient) {
            // just the goods
             this.ingredients.push(currentIngredient)   
            }
    }
    }

}

//set up button and initialize list
let cocktailList = []
let timeOutList = []
$('#submit').addEventListener('click', submitSearch)
$('#search').addEventListener('keydown', function enterSearch(e) {
    if (e.key === 'Enter') {
        console.log('pressed enter!')
        submitSearch()
    }
})

//push the button
function submitSearch() {
    let search = $('#search').value
    search.split(' ').join('%20')
    console.log(search)
    cocktailList = []
    timeOutList.forEach(timer => {
        window.clearTimeout(timer)
    })
    getCocktails(search)
}

function getCocktails(search) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`+ encodeURIComponent(search))
    .then(response => response.json())
    .then(data => {
        console.log(data.drinks)
        //were any found?
        if (data.drinks) {
            for (drink of data.drinks) {
                cocktailList.push(new Cocktail(drink))
            }
            $('#drinksFound').innerHTML = `${cocktailList.length} found:`
        } else {
            $('#drinksFound').innerHTML = 'No cocktails found. Try searching for something else.'
        }

        //Start the carousel
        cocktailList.forEach((drink, i) => {
            timeOutList[i] = setTimeout(
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
