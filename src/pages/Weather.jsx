import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NavigationButton from "../components/NavigationButton";

const weatherApiKey = "ff9b41622f994b1287a73535210809";

const getLocation = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

const Weather = () => {
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    prepareWeatherData();
  }, []);

  const prepareWeatherData = async () => {
    try {
      const location = await getLocation();
      const locationStr = `${location.coords.latitude},${location.coords.longitude}`;
      const weatherResponse = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${locationStr}&days=3`
      );
      setWeatherData(weatherResponse?.data);
    } catch (error) {
      toast.error(error?.message || "Error fetching weather information!");
    }
  };

  return (
    <div className="m-auto flex flex-col w-full items-center gap-y-5">
      <div className="bg-white shadow rounded-lg p-5 dark:bg-gray-800 max-w-full">
        <h2 className="font-bold text-gray-800 text-lg dark:text-gray-400">
          {format(new Date(), "PPPP")}
        </h2>

        {!weatherData ? (
          <div className="animate-pulse">
            <div className="flex mt-4 mb-5">
              <div className="flex-1">
                <div className="rounded h-2 mb-1.5 bg-gray-200 w-1/2"></div>
                <div className="bg-gray-200 rounded h-4"></div>
                <div className="rounded h-2 mt-1.5 bg-gray-200 w-1/2"></div>
              </div>
              <div className="w-24">
                <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto"></div>
              </div>
            </div>

            <div className="flex space-x-2 justify-between border-t h-32 dark:border-gray-500">
              <div className="flex-1 text-center pt-4 border-r px-5 dark:border-gray-500">
                <div className="rounded h-2 mb-2 bg-gray-200 w-1/2 mx-auto"></div>
                <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2"></div>
                <div className="rounded h-3 mt-1 bg-gray-200 mt-1.5 mx-auto"></div>
                <div className="rounded h-2 mt-1 bg-gray-200 w-1/2 mx-auto"></div>
              </div>
              <div className="flex-1 text-center pt-4 px-5">
                <div className="rounded h-2 mb-2 bg-gray-200 w-1/2 mx-auto"></div>
                <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2"></div>
                <div className="rounded h-3 mt-1 bg-gray-200 mt-1.5 mx-auto"></div>
                <div className="rounded h-2 mt-1 bg-gray-200 w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex mt-4 mb-2">
              <div className="flex-1">
                <div className="text-gray-600 text-sm dark:text-gray-400">
                  {weatherData.location.name +
                    ", " +
                    weatherData.location.region}
                </div>
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-300">
                  {`${weatherData.current.temp_c}`} &deg;C
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {weatherData.current.condition.text}
                </div>
              </div>
              <div className="w-24">
                <img src={weatherData.current.condition.icon} loading="lazy" />
              </div>
            </div>

            <div className="flex space-x-2 justify-between border-t dark:border-gray-500">
              {weatherData.forecast.forecastday
                .splice(1)
                .map((forecast, key) => (
                  <div className="flex-1 text-center pt-3" key={key}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{`${
                      forecast.date.split("-")[2]
                    }/${forecast.date.split("-")[1]}/${
                      forecast.date.split("-")[0]
                    }`}</div>
                    <img
                      src={forecast.day.condition.icon}
                      loading="lazy"
                      className="mx-auto"
                    />
                    <div className="font-semibold text-gray-800 mt-1.5 dark:text-gray-300">
                      {`${forecast.day.maxtemp_c}`} &deg;C
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {forecast.day.condition.text}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <NavigationButton />
    </div>
  );
};

export default Weather;
