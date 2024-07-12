
// displayFoods function Start
const displayFoods = (foods) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.classList.remove("d-none");

    cardContainer.innerHTML = '';

    const div = document.createElement("div");
    div.classList.add("row");
    foods.forEach(food => {
        const foodCard = `
            <div data-mealid="${food.idMeal}" class="card bg-card mx-auto my-2 col-12 col-md-4 col-lg-4 col-xl-4" style="width: 22rem;">
                <img src="${food.strMealThumb}" class="card-img-top" alt="">
                <div class="card-body">
                    <h3 class="card-text">${food.strMeal}</h3>
                </div>
            </div>
        `;
        div.innerHTML += foodCard;
    });
    cardContainer.appendChild(div);

    div.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        if (card) {
            const mealId = card.getAttribute('data-mealid');
            singleFood(mealId);
        }
    });
};
// displayFoods function end

// singleFood function start
const singleFood = (mealId) => {
    const errorShow = document.getElementById("errorShow");
    console.log(mealId);
    
    errorShow.innerHTML = '';
    errorShow.style.display = 'block';

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    fetch(apiUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            showFood(data.meals);
            
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            errorShow.classList.add("bg-second");
            errorShow.innerHTML = 'Error fetching data';
            setTimeout(() => {
                errorShow.style.display = 'none';
            }, 3000);
        });
};
// singleFood function end


// showFood Function Start
const showFood = (foods) => {
    console.log("food is: ",foods);

    const cardAfterClick = document.getElementById("cardAfterClick");
    cardAfterClick.classList.remove("d-none");

    cardAfterClick.innerHTML = '';

    foods.forEach(food => {

        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            let ingredient = food[`strIngredient${i}`];
            if (ingredient) {
                ingredients.push(ingredient);
            }
        }
        const foodCard = `
            <div class="card bg-card" style="width: 23rem;">
                <img src="${food.strMealThumb}" class="card-img-top" alt="${food.strMeal}">
                <div class="card-body">
                    <h4 class="card-title">${food.strMeal}</h4>
                    <p class="card-text">${food.strArea} food</p>
                    <h5 class="card-title text-center mt-2 mb-0">Ingredients</h5>
                </div>
                
                <ul class="list-group list-group-flush bg-card">
                    ${ingredients.map(ingredient => `<li class="list-group-item">${ingredient}</li>`).join('')}
                </ul>
            
            </div>
        `;
        cardAfterClick.innerHTML += foodCard;
    });

};
// Show Food function end


document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");

    // Search button onClick listner Start
    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        
        const searchInput = document.getElementById("searchInput");
        const searchVal = searchInput.value.trim();

        const errorShow = document.getElementById("errorShow");

        errorShow.innerHTML = '';
        errorShow.style.display = 'block';

        if (!searchVal) {
            errorShow.classList.add("bg-second");
            errorShow.innerHTML = 'Please enter a search term';
            setTimeout(() => {
                errorShow.style.display = 'none';
            }, 3000);
            return;
        }

        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchVal}`;

        fetch(apiUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok ' + res.statusText);
                }
                return res.json();
            })
            .then(data => {
                // console.log(data);
                displayFoods(data.meals);
                
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                errorShow.classList.add("bg-second");
                errorShow.innerHTML = 'Error fetching data';
                setTimeout(() => {
                    errorShow.style.display = 'none';
                }, 3000);
            });
    });
    // Search button onClick listner end
    
});
