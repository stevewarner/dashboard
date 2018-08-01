(function () {

	// time & date
    function addZero(i) {
        return (i < 10) ? "0" + i : i;
    }

    function startTime() {
        let today = new Date(),
            h = addZero(today.getHours()),
            m = addZero(today.getMinutes()),
            s = addZero(today.getSeconds()),
            day = addZero(today.getDate()),
            month = addZero(today.getMonth()+1),
            year = today.getFullYear(); 
        let AMPM = (h < 12) ? ' AM' : ' PM';
        h = (h > 12) ? h-12 : h && (h == 0) ? h=12 : h;
        let time = h + ":" + m + ":" + s + AMPM;
        let date = day +' / '+ month +' / '+ year;
        document.getElementById('time').innerHTML = time;
        document.getElementById('date').innerHTML = date;
        t = setTimeout(function () {
            startTime()
        }, 500);
    }
    startTime();

    // location
    const ipinfo = "https://ipinfo.io/json";
    let zip ;

    fetch(ipinfo)
		.then(res => res.json())
		.then((out) => {
		  console.log('ip info: ', out);
		  document.getElementById('location').innerHTML = out.city + ', <strong>' + out.region + '</strong>';
		  zip = out.postal +','+ out.country;
		  getWeather(zip);
		})
		.catch(err => { throw err });

    // weather
    function getWeather(zipcode) {
    const weatherapi = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=imperial&appid=782436f1efbf9653921657dfc46b0564`;

    fetch(weatherapi)
		.then(res => res.json())
		.then((out) => {
		  console.log('Weather: ', out);
		  let f = Math.round(out.main.temp),
		  	fmin = Math.round(out.main.temp_min),
		  	fmax = Math.round(out.main.temp_max),
		  	icon = out.weather[0].icon,
		  	iconURL = "images/icons/" + icon + ".svg";

		  document.getElementById('icon').innerHTML = "<img class='svg' src='" + iconURL  + "'>";
		  document.getElementById('weather').innerHTML = f + '° F';
		  document.getElementById('description').innerHTML = out.weather[0].description;
		  document.getElementById('range').innerHTML = fmin + ' - ' + fmax + '° F';
		  document.getElementById('wind').innerHTML = 'wind: '+out.wind.speed+' mph';
		})
		.catch(err => { throw err });

    }

})();