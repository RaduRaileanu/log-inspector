import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

//get the path to logs.log file
const __filename = fileURLToPath(import.meta.url);
const filePath = path.join(path.dirname(__filename), 'inbox', 'logs.log');

// check if logs.log exists
if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found at ${filePath}`);
    process.exit(1);
}

// read the file as a stream and parse it using the custom made parser
const stream = fs.createReadStream(filePath);