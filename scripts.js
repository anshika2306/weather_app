console.log("working");

function fetchweather(){
    let city = document.getElementById("inputCity").value;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" + "ec0314d6786bb5a21a5bafc4a2de5637";
    fetch(url).then((response) => {
        if(!response.ok){
            alert("No Weather Found!");
        }
        return response.json();
    })
    .then((data)=> {
        console.log(data);
        encapObject.displayWeather(data)});
}



const success=(position)=>{
    const {latitude, longitude} = position.coords;
    const url2 =  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ec0314d6786bb5a21a5bafc4a2de5637`;

    fetch(url2).then((response) => {
        if(!response.ok){
            alert("No Weather Found!");
        }
        return response.json();
    })
    .then((data)=> {
        console.log(data);
        encapObject.displayWeather(data)});
}

const error = (error)=>{
    alert(error.message);
}


let encapObject = {
    displayWeather: function(data){
        console.log("here");
        console.log(data);
        document.getElementById("cityData").innerHTML = "Weather in " + data.name;
        document.getElementById("cityTemp").innerHTML = data.main.temp+"°C";
        document.getElementById("cityIcon").src= "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
        document.getElementById("cityDes").innerHTML = data.weather[0].description;
        document.getElementById("cityHumidity").innerHTML = data.main.humidity+"%";
        document.getElementById("cityWind").innerHTML = data.wind.speed +"km/h";
    },

}

document.getElementById("sbtn").addEventListener("click",fetchweather);
document.getElementById("locationBtn").addEventListener("click", () =>{
    if(navigator.geolocation){ // if browser support geolocation api
        navigator.geolocation.getCurrentPosition(success, error);
    }else{
        alert("Your browser not support geolocation api");
    }
});