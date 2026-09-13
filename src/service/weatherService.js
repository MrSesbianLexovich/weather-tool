import { getCityGeo, getForecast } from '../api/weatherClient.js';
import { createCache, getFromCache } from '../storage/cache.js';

export async function weatherService(args) {
  const days = args.days;
  const noCache = args.noCache;
  const cities = args.city.split(',');

  let data = [];

  if (noCache == false) {
    try {
      const cachedData = await getFromCache(cities, days);
      data = cachedData;
    } catch {
      const cityGeo = await getCityGeo(cities);
      const forecast = await getForecast(cityGeo, days);

      for (let i = 0; i < cities.length; i++) {
        let date = new Date();
        for (let d = 0; d < days; d++) {
          const result = {
            name: cityGeo[i].name,
            country: cityGeo[i].country,
            lat: cityGeo[i].lat,
            lon: cityGeo[i].lon,
            time: forecast[i].time[d],
            temperature_max: forecast[i].temperature_max[d],
            temperature_min: forecast[i].temperature_min[d],
            precipitation: forecast[i].precipitation[d],
          };
          await createCache(result, date);
          date.setDate(date.getDate() + 1);
          data.push(result);
        }
      }
    }
  } else {
    try {
      const cityGeo = await getCityGeo(cities);
      const forecast = await getForecast(cityGeo, days);

      for (let i = 0; i < cities.length; i++) {
        let date = new Date();
        for (let d = 0; d < days; d++) {
          const result = {
            name: cityGeo[i].name,
            country: cityGeo[i].country,
            lat: cityGeo[i].lat,
            lon: cityGeo[i].lon,
            time: forecast[i].time[d],
            temperature_max: forecast[i].temperature_max[d],
            temperature_min: forecast[i].temperature_min[d],
            precipitation: forecast[i].precipitation[d],
          };
          await createCache(result, date);
          date.setDate(date.getDate() + 1);
          data.push(result);
        }
      }
    } catch (error) {
      process.exit(1);
    }
  }
  return data;
}
