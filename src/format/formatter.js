function printTable(headers, rows) {
  const widths = headers.map((h, i) =>
    Math.max(String(h).length, ...rows.map((r) => String(r[i]).length))
  );

  const line = (char = '-') => '+' + widths.map((w) => char.repeat(w + 2)).join('+') + '+';

  const formatRow = (row) =>
    '| ' + row.map((cell, i) => String(cell).padEnd(widths[i])).join(' | ') + ' |';

  console.log(line());
  console.log(formatRow(headers));
  console.log(line('='));
  rows.forEach((r) => console.log(formatRow(r)));
  console.log(line());
}

export function format(data, days, rawCities) {
  const cities = rawCities.split(',');
  const headers = [
    'Дата',
    'Максимальная температура',
    'Минимальная температура',
    'Суммарные осадки',
  ];
  let k = 0;
  for (const city of cities) {
    console.log('Город:', data[k].name);
    console.log('Страна:', data[k].country);
    console.log('Широта: ', data[k].lat);
    console.log('Долгота: ', data[k].lon);
    let rows = [];
    for (let i = 0; i < days; i++) {
      const row = [
        data[k + i].time,
        data[k + i].temperature_max,
        data[k + i].temperature_min,
        data[k + i].precipitation,
      ];
      rows.push(row);
    }
    printTable(headers, rows);
    k += days;
  }
}
