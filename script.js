let weather = {
    apiKey: "ec0314d6786bb5a21a5bafc4a2de5637",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
        )
        .then((response) => {
            if(!response.ok){
                alert("No weather found.");
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    onSuccess : function onSuccess(position){
        const {latitude, longitude} = position.coords;
        const url =  "https://api.openweathermap.org/data/2.5/weather?" +
        `lat=${latitude}&lon=${longitude}` +
        "&units=metric&appid=" + "ec0314d6786bb5a21a5bafc4a2de5637";
        // this.apiKey;
        console.log(url);
        fetch(url)
        .then((data) => {
            console.log(data);
            weather.displayWeather(data);
        })
        .catch(err => console.log("ERROR = " + err.toString()));
    },
    
    onError: function onError(error){
        infoTxt.innerText = error.message;
        infoTxt.classList.add("error");
    },

    displayWeather: function(data){
        if(data.status >= 300){
            throw new Error("Wrong Status code -> " + data.status);
        }
        const {name} = data;
        const{icon, description} = data.weather[0];
        const{temp,humidity} = data.main;
        const{speed}=data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src= "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innertext = "Wind Speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
    
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.getElementById("locationBtn").addEventListener("click", () =>{
    if(navigator.geolocation){ 
        console.log(navigator.geolocation);
        navigator.geolocation.getCurrentPosition(weather.onSuccess);
    }else{
        alert("Your browser not support geolocation api");
    }
});

document.querySelector(".search button").addEventListener("click",function(){
    weather.search();
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Gurugram");