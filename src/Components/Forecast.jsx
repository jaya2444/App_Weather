import React from 'react';
import moment from 'moment';
import './Forecast.css';

const Forecast = ({ forecastData }) => {
  if (!forecastData) {
    return <div>Loading...</div>;
  }

  const { timezone } = forecastData.city;

  return (
    <div className="forecast">
      <div className="daily">Five Days Forecast</div>
      <div className="dailydata">
        <span className="name">{forecastData.city.name}</span>
        <br />
        <span className="citydate">
          {moment
            .utc(new Date().setTime(forecastData.list[0].dt * 1000))
            .add(timezone, "seconds")
            .format("dddd, MMMM Do YYYY")}
        </span>
      </div>
      <div className="dailyweather">
        {[7, 15, 23, 31, 39].map((index, i) => (
          <div key={i} className="day">
            <span className="wday">
              {moment(new Date().setTime(forecastData.list[index].dt * 1000)).format("ddd")}
            </span>
            <br />
            <span className="head">Temp</span>{" "}
            <span className="val">
              {forecastData.list[index].main.temp.toFixed(1)} C&deg;{" "}
            </span>
            <br />
            <br />
            <span className="head">Feel like</span>{" "}
            <span className="val">
              {forecastData.list[index].main.feels_like.toFixed(1)} C&deg;
            </span>
            <br />
            <br />
            <span className="head">Moist</span>{" "}
            <span className="val">
              {forecastData.list[index].main.humidity.toFixed()} %
            </span>
            <br />
            <br />
            <span className="head">{forecastData.list[index].weather[0].main}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
