import fs from 'fs';

const REPORT_FILE_NAME = 'report.txt';

/**
 * Writes a line in the report file
 * @param {String} line         The line that needs to be added to the report file
 */
const writeToReportFile = async (line) => {

    return new Promise((resolve) => {
        fs.appendFile(REPORT_FILE_NAME, line, handleWriteReportError);

        resolve();
    });

    
}

/**
 * Handles an error that might appear while writing to the file
 * @param {*} err 
 */
const handleWriteReportError = (err) => {
    if(err) {
        console.log(err);
    }
}

export default writeToReportFile;