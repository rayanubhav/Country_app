const CountryInput = document.getElementById('countryInput'),
    search = document.getElementById('search'),
    search_result = document.getElementById('search_result'),
    flag = document.getElementById('flag'),
    name = document.getElementById('name'),
    capital = document.getElementById('capital'),
    continent = document.getElementById('continent'),
    population = document.getElementById('population'),
    currency = document.getElementById('currency'),
    currency_short = document.getElementById('CurrencyShort'),
    language = document.getElementById('language'),
    loader = document.getElementById('loader'),
    toggleDarkMode = document.getElementById('toggleDarkMode'),
    toggleImage = document.getElementById('toggleImage');

// Search event listener
search.addEventListener('click', () => {
    let countryName = CountryInput.value;
    let finalUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    // Show loader before fetching data
    loader.style.display = 'block';
    search_result.style.display = 'none';
    search_result.classList.remove('show');

    fetch(finalUrl)
        .then((response) => response.json())
        .then((data) => {
            // Hide loader and display results
            loader.style.display = 'none';
            search_result.style.display = 'block';
            search_result.classList.add('show');

            countryData = data[0];
            flag.src = countryData.flags.svg;

            name.innerHTML = countryData.name.common;
            capital.innerHTML = countryData.capital;
            continent.innerHTML = countryData.continents;
            population.innerHTML = countryData.population;
            currency.innerHTML = countryData.currencies[Object.keys(countryData.currencies)].name;
            currency_short.innerHTML = Object.keys(countryData.currencies)[0];
            language.innerHTML = Object.values(countryData.languages).toString().split(',').join(',');
        })
        .catch(() => {
            loader.style.display = 'none';
            alert('Country not found. Please try again.');
        });
});

// Dark mode toggle with image switch
toggleDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Change image on toggle
    if (document.body.classList.contains('dark-mode')) {
        toggleImage.src = 'night-mode.png';
    } else {
        toggleImage.src = 'day-mode.png'; 
    }
});
