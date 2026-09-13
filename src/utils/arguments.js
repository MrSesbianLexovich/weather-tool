export function parseArguments(args) {
  const result = {
    city: null,
    days: 3,
    noCache: false,
  };

  if (args.includes('--city') == false) {
    console.log('Аргумент --city является обязательным');
    process.exit(1);
  }

  for (let i = 2; i < args.length; i++) {
    const arg = args[i];

    if (arg.slice(0, 2) == '--') {
      if (arg == '--city') {
        if (i + 1 == args.length) {
          console.log('Ошибка, необходимо указать город');
          process.exit(1);
        }
        result.city = args[i + 1];
      }

      if (arg == '--days') {
        if ((args[i + 1] < 1) | (args[i + 1] > 7)) {
          console.log('Количество дней должно быть от 1 до 7');
          process.exit(1);
        }
        if (Number.isNaN(parseInt(args[i + 1]))) {
          console.log('Ошибка, аргумент --days принимает только численные значения');
          process.exit(1);
        }

        result.days = parseInt(args[i + 1]);
      }

      if (arg == '--no-cache') {
        result.noCache = true;
      }
    }
  }

  return result;
}
