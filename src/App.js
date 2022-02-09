import React, { useState } from "react";

const api = {
	key: "28ba66a8a0ec4a630fcc6599af227b2c",
	base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState({});

	const search = event => {
		if (event.key === "Enter") {
			fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
				.then(res => res.json())
				.then(result => {
					setWeather(result);
					setQuery("");
					console.log(result);
				});
		}
	};

	const dateBuilder = d => {
		let months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};

	return (
		<div
			className={
				typeof weather.main != "undefined"
					? weather.main.temp > 16
						? "App warm"
						: "App"
					: "App"
			}
		>
			<main>
				<div className="search-box">
					<input
						type="text"
						className="search-bar"
						placeholder="Search.."
						onChange={e => setQuery(e.target.value)}
						value={query}
						onKeyPress={search}
					/>
				</div>
				{typeof weather.main != "undefined" ? (
					<div className="wrapper">
						<div className="location-box">
							<div className="location">
								{weather.name}{" "}
								<span>{weather.sys.country}</span>
							</div>
							<div className="date">
								{dateBuilder(new Date())}
							</div>
						</div>
						<div className="weather-box">
							<div className="temp">
								{Math.round(weather.main.temp)}°C
								<p>
									Feels Like :{" "}
									{Math.round(weather.main.feels_like)}°C
								</p>
							</div>
							<div className="weather">
								<img
									className="city-icon"
									src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
									alt={weather.weather[0].description}
								/>
								<p>{weather.weather[0].description}</p>
							</div>
						</div>
					</div>
				) : (
					""
				)}
			</main>
		</div>
	);
}

export default App;
