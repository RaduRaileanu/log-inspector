import writeToReportFile from './writer.js';

/**
 * Enters information of a specific task in the report
 * @param {String} pid                      The PID of the task
 * @param {Object} entries                  The object containg the tasks for which a start or time has not beed identified yet
 * @param {String} endTime                  The time at which the task was logged as ending or the time of the last entry in the log file
 * @param {Integer} taskDuration            The duration of the task in seconds
 * @param {String} status                   The status of the task. Can be either WARNING or ERROR
 */
const reportTask = async (pid, entries, endTime, taskDuration, status) => {
    // add the time at which the task ended to the entries object corresponding to the task
    entries[pid]['endAt'] =  endTime;
    // add the status, depending on the threshold it exceeded
    entries[pid]['status'] = status;
    
    const reportLine = `${entries[pid]['status']}: task ${pid} - ${entries[pid].description} took ${taskDuration} seconds to complete. Task started at ${entries[pid]['startAt']} and ended at ${entries[pid]['endAt']}\n`;

    writeToReportFile(reportLine);
}

export { reportTask };