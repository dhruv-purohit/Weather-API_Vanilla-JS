window.addEventListener('load', ()=> {
	let long;
	let lat;
	let temperatureDegree = document.querySelector('.temperature-degree');
	let temperatureDescription = document.querySelector('.temperature-description');
	let locationTimezone = document.querySelector('.location-timezone');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			// console.log(position);
		long = position.coords.longitude;
		lat = position.coords.latitude;

		const proxy = "http://cors-anywhere.herokuapp.com/";
		const api = `${proxy}https://api.darksky.net/forecast/b32919efd3242a8de56f1525fc4d8900/${lat},${long}`;
		
		fetch(api)
			.then(response =>{
				return response.json();
			})
			.then(data => {
				// console.log(data);
				const {temperature, summary, icon}= data.currently; //shorten ur syntax with {} to save from typing data.currently.temrature

				//Set DOM elements from the API
				temperatureDegree.textContent = temperature;
				temperatureDescription.textContent = summary;
				locationTimezone.textContent = data.timezone;
				//set icons
				setIcons(icon, document.querySelector(".icon"));

			});
	});

	}

	function setIcons(icon,iconID){
		const skycons = new Skycons({ color: "white"});
		const currentIcon = icon.replace(/./g, "_").toUpperCase();  //it will look for every line and replace it with underscore "_"
		skycons.play();
		return skycons.set(iconID, skycons[currentIcon]);
	}

});