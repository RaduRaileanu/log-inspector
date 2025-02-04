import { parseStream } from "fast-csv";

const parseCSV = async (stream) => {

    // initialize the dictionary that will hold the entries that might be included in the report 
    const entries = {};

    // initialize the array that will hold the promisses returned by the function that processes the log entries
    const currentJobs = [];

    let firstLogEntryTime = null;
    let lastLogEntryTime = null;

    parseStream(stream)
        .on('error', error => console.log(error))
        .on('data', row => {
                // save the time of the first entry in the log file
                firstLogEntryTime = firstLogEntryTime ?? row[0];
                // save the time of the last entry in the log file
                lastLogEntryTime = row[0];
                // process log entry logic

            }) 
        .on('end', async () => {
                // wait to finish processing all rows then finish the report
                await Promise.all(currentJobs);
                // finish report logic
                
            });

    
}

export default parseCSV;