const container = document.querySelector(".container");
const search = document.querySelector(".search_bar button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-detail");
const err404 = document.querySelector(".not-found");
const APIkey = '59261fec5296c6e0e66097f4399e1191';

search.addEventListener('click', ()=>{
    
    const city = document.querySelector('.search_bar input').value;
    
    if(city ===``){
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(
        json => {
            console.log(json.cod);
            if(json.cod ==='404'){
                container.style.height = '500px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                err404.style.display = 'block';
                err404.classList.add('fadeIn');
                return;

            }

            err404.style.display = 'none';
            err404.classList.remove('fadeIn');
            
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-detail .humidity span');
            const wind = document.querySelector('.weather-detail .wind span');
            const location = document.querySelector(".weather-box .position");
            console.log(json.weather[0]);
            console.log(json);
            console.log(json.weather[0].description);
            console.log(typeof(json.weather[0].description));
            switch (json.weather[0].main){
                case 'Clear':
                    image.src = 'img/clear-sky.png';
                    break;
                
                case 'Clouds':
                    image.src = 'img/cloudy.png';
                    break;

                case 'Rain':
                    image.src = 'img/rainny.png';
                    break;
                
                case 'Haze':
                    image.src = 'img/haze.png';
                    break;

                case 'Sunny':
                    image.src = 'img/sunny.png';
                    break;
                    
                default:
                    image.src = '';
            }

            location.innerHTML = json.name + `, ` + json.sys.country;
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML =  `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseFloat(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '580px';
        }
    )
});

//get user location

let sth;// for checking something later
const successCallback = (position) => {
    console.log(position);
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIkey}`;
    
    fetch(apiUrl).then(response => response.json()).then(
        json => {
            sth = json;
            console.log(json.name);
            if(json.cod ==='404'){
                container.style.height = '500px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                err404.style.display = 'block';
                err404.classList.add('fadeIn');
                return;

            }

            err404.style.display = 'none';
            err404.classList.remove('fadeIn');
            
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-detail .humidity span');
            const wind = document.querySelector('.weather-detail .wind span');
            const location = document.querySelector(".position");

            console.log(json.weather[0]);
            console.log(json);
            console.log(json.weather[0].description);
            console.log(typeof(json.weather[0].description));
            switch (json.weather[0].main){
                case 'Clear':
                    image.src = 'img/clear-sky.png';
                    break;
                
                case 'Clouds':
                    image.src = 'img/cloudy.png';
                    break;

                case 'Rain':
                    image.src = 'img/rainny.png';
                    break;
                
                case 'Haze':
                    image.src = 'img/haze.png';
                    break;

                case 'Sunny':
                    image.src = 'img/sunny.png';
                    break;
                    
                default:
                    image.src = '';
            }
            
            location.innerHTML = json.name + `, ` + json.sys.country;
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML =  `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseFloat(json.wind.speed)}Km/h`;
            
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '580px';
        }
    )
    
    
};
  
const errorCallback = (error) => {
    console.log(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

const here = document.getElementById("location_dot");
//add event listener to here when being clicked
// on it will trigger the function below
here.addEventListener("click", ()=>{
    console.log("here");
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    });