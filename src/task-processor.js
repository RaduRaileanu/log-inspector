import moment from "moment";
import { reportTask } from "./reporter.js";

// set the time format used by moment
const TIME_FORMAT = 'HH:mm:ss';

// set the thresholds for the durations of the tasks. 
// the warning threshold is set for 5 minute, the error threshold for 10 minutes
const WARNING_THRESHOLD = 60 * 5;
const ERROR_THRESHHOLD = 60 * 10;


/**
 * Checks task duration and either deletes or reports task
 * @param {String} pid                      The PID of the task
 * @param {Object} entries                  The object containg the tasks for which a start or time has not beed identified yet
 * @param {String} endTime                  The time used to calculate the task's duration
 * @param {Boolean} checkRemainingEntry     A flag used to decide how the task should be included in the final report
 */
const checkTaskDuration = async (pid, entries, startTime, endTime, checkRemainingEntry = false) => {

    // calculate the duration of the task in seconds
    const endTimeObj = moment(endTime, TIME_FORMAT);
    const startTimeObj = moment(startTime, TIME_FORMAT);
    const taskDuration = endTimeObj.diff(startTimeObj, 'seconds');
    const status = taskDuration > ERROR_THRESHHOLD ? 'ERROR' : 'WARNING';

    // if the task duration exceeded the warning threshold
    if (taskDuration >= WARNING_THRESHOLD) {

        reportTask(pid, entries, startTime, endTime, taskDuration, status, checkRemainingEntry);

        // since the entry was processed, remove it from the object that holds tasks for which only the start time is mentioned
        delete entries[pid];
    }

    // if the task finished before the warning threshold and its record is processed while the log file is being parsed (i.e there are both a start and end entries for it in log file)
    // delete the entry, as it is certait it must not be included in the warning/error report
    if(!checkRemainingEntry){
        delete entries[pid];
    }
}

export default checkTaskDuration;