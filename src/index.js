import { parseArguments } from './utils/arguments.js';
import { weatherService } from './service/weatherService.js';
import { checkDirectory } from './storage/cache.js';

async function main() {
  const args = parseArguments(process.argv);
  checkDirectory();
  const data = await weatherService(args);
}

main();
