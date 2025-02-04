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

        //call function to handle adding the task information in the report file
        reportTask(pid, entries, endTime, taskDuration, status);
    }

    // if the task finished before the warning threshold delete the entry, as it is certait it must not be included in the warning/error report
    delete entries[pid];
}

export default checkTaskDuration;