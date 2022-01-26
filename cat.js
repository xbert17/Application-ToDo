let catButton = document.getElementById('give-cat');
catButton.addEventListener("click", evt => {
    let catDiv =document.getElementById('cat-pic');
    
    fetch('https://api.thecatapi.com/v1/images/search?')
    .then(res => res.json())
    .then(cats => {
        cats.forEach(cat => {
            catDiv.innerHTML = `<h3 align = "center"> Here is a cat wishing you the best day! </h3>
            <img width = "600" src="${cat.url}" alt = "kitty" class="center-img" />`;
        });
    });
})
