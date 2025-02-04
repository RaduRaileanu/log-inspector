import writeToReportFile from './writer.js';
import checkTaskDuration from './task-processor.js';

/**
 * Finishes the warning/error report. Goes through the remaining entries in the entries object and adds them to the report file
 * @param {Object} entries              The object containg the tasks for which a start or time has not beed identified yet. At this time, it is comprised only of tasks that have either an START or END entry
 * @param {String} firstLogEntryTime    The time of the first task mentioned in the log file
 * @param {*} lastLogEntryTime          The time of the last task mentioned in the log file
 */
const finishReport = async (entries, firstLogEntryTime, lastLogEntryTime) => {
    
    // iterate over each of the tasks and check their duration with respect to the time first or last entry in the log file
    // the checkTaskDuration function will eliminate all the tasks that are longer than the warning threshold from the entries object
    Object.keys(entries).forEach(pid => {
        // if the task is and START task, check its duration with respect to the time of the last entry in the log
        if(entries[pid].startAt){
            checkTaskDuration(pid, entries, entries[pid].startAt, lastLogEntryTime, true);
        }
        // if the task is a END task, check its duration with respect to the first entry in the log file
        else {
            checkTaskDuration(pid, entries, firstLogEntryTime, entries[pid].endAt, true);
        }
        
    });

    // iterate over each of the remaining task and add them to the report mentioning that it is impossible to check if they exceeded the warning or error thresholds
    if(Object.keys(entries).length){

        // then add a line to the report for each of the remaining tasks
        Object.keys(entries).forEach(pid => {

            const reportLine = entries[pid].startAt ?
                                 `Potential WARNING/ERROR: ${pid} - ${entries[pid].description}. Started at ${entries[pid].startAt} but didn't finish by the time the log stopped.\n` : 
                                 `Potential WARNING/ERROR: ${pid} - ${entries[pid].description}. Ended at ${entries[pid].endAt} but started before the log began.\n`;
            writeToReportFile(reportLine);
        });


    }

}

/**
 * Enters information of a specific task in the report
 * @param {String} pid                      The PID of the task
 * @param {Object} entries                  The object containg the tasks for which a start or time has not beed identified yet
 * @param {String} startTime                The time at which the task was logged as starting or the time of the first entry in the log file
 * @param {String} endTime                  The time at which the task was logged as ending or the time of the last entry in the log file
 * @param {Integer} taskDuration            The duration of the task in seconds
 * @param {String} status                   The status of the task. Can be either WARNING or ERROR
 * @param {Boolean} checkRemainingEntry     A flag indicating if the task remained in the entries object after the log was finished parsing
 */
const reportTask = async (pid, entries, startTime, endTime, taskDuration, status, checkRemainingEntry) => {
    // add the time at which the task ended to the entries object corresponding to the task
    entries[pid]['endAt'] =  endTime;
    // add the status, depending on the threshold it exceeded
    entries[pid]['status'] = status;
    
    // prepare the report line, based on wether this is a line that remained in the entries object after the log was finished parsing
    let reportLine;
    if(checkRemainingEntry){
        if(!entries[pid].startAt){
            reportLine = `${entries[pid]['status']}: task ${pid} - ${entries[pid].description} took at least ${taskDuration} seconds to complete. Task began before the log was generated and ended at ${entries[pid].endAt}\n`;
        }
        else {
            reportLine = `${entries[pid]['status']}: task ${pid} - ${entries[pid].description} took at least ${taskDuration} seconds to complete. Task started at ${entries[pid]['startAt']} but did not finish by the time the log was generated\n`;
        }
        
    }
    else{
        reportLine = `${entries[pid]['status']}: task ${pid} - ${entries[pid].description} took ${taskDuration} seconds to complete. Task started at ${entries[pid]['startAt']} and ended at ${entries[pid]['endAt']}\n`;
    }

    writeToReportFile(reportLine);
}

export {finishReport, reportTask};