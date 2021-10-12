const getId = (id, content) => {
    const get = document.getElementById(id);
    get.innerText = content;
}


const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function(){
    const searchInput = document.querySelector("input");
    fetch(`https://restcountries.com/v3.1/name/${searchInput.value}`)
    .then(res => {
        if (!res.ok) {
            const message = "Please type the valid country name.";
            throw new Error(message);
        }
        else{
            const resultSection = document.getElementById("result-section");
            setTimeout(() => {
                resultSection.style.display = 'grid';
            }, 1000);
            return res.json();
        }
    })
    .then(res => {
        getId("country", res[0].name.common)
        document.getElementById("svg").src = res[0].flags.svg;
        getId("official-name", res[0].name.official);
        getId("capital", res[0].capital)
        getId("area", res[0].area)
        getId("languages", res[0].languages)
        getId("population", res[0].population)
        getId("region", res[0].region);
        getId("subcontinent", res[0].subregion);
        const languages = res[0].languages
        let txt = "";
            for (let x in languages) {
            txt += languages[x] + " ";
            };
            getId("languages", txt)

            console.log(res[0])
            const to = Object.values(res[0].currencies)
            to.forEach(x => {
                getId("currencies", x.name)
                getId("currencies-symb", x.symbol)
            })
    })
    .catch(err => {
        alert(err);
    })
})




