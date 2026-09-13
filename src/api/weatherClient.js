import { TIMEOUT, BASE_URL_GEOCODING, BASE_URL_FORECAST } from '../utils/envParser.js';

async function fetchWIthTimeout(url, timeout = TIMEOUT) {
  const controller = new AbortController();

  const timeoutid = setTimeout(() => controller.abort(), timeout);

  let response;

  try {
    response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutid);
  } catch (error) {
    clearTimeout(timeoutid);
    if (error.name === 'AbortError') {
      throw new Error('Превышен таймаут запроса');
    }
    if (error.name === 'TypeError') {
      throw new Error('Нет подключения к сети');
    }
  }

  if (response.ok != true) {
    const status = response.status;
    if (status >= 400 && status < 500) {
      throw new Error(`Ошибка ${status}`);
    }
    if (status >= 500) {
      throw new Error(`Ошибка ${status}`);
    }
  }

  try {
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCityGeo(cities) {
  let urls = cities.map(
    (city) => `${BASE_URL_GEOCODING}/search?name=${city}&count=1&language=ru&format=json`
  );
  const requests = urls.map((url) => fetchWIthTimeout(url));

  let citiesData = [];

  await Promise.allSettled(requests).then((responses) =>
    responses.forEach((response) => {
      if (response.value.results == undefined) {
        throw new Error('Ошибка, нет данных');
      }
      const data = {
        name: response.value.results[0].name,
        country: response.value.results[0].country,
        lat: response.value.results[0].latitude,
        lon: response.value.results[0].longitude,
      };
      citiesData.push(data);
    })
  );
  return citiesData;
}

export async function getForecast(coordinates, days) {
  let urls = coordinates.map(
    (city) =>
      `${BASE_URL_FORECAST}?latitude=${city.lat}&longitude=${city.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=${days}&timezone=auto`
  );
  const requests = urls.map((url) => fetchWIthTimeout(url));

  let forecastData = [];

  await Promise.allSettled(requests).then((responses) =>
    responses.forEach((response) => {
      if (response.value == undefined) {
        throw new Error('Ошибка, нет данных');
      }
      //console.log(response.value)
      const data = {
        time: response.value.daily.time,
        temperature_max: response.value.daily.temperature_2m_max,
        temperature_min: response.value.daily.temperature_2m_min,
        precipitation: response.value.daily.precipitation_sum,
      };
      forecastData.push(data);
    })
  );
  return forecastData;
}
