import checkTaskDuration from "./task-processor.js";

/**
 * Checks a log entry
 * @param {Array} entry         An array consisting of each value in a csv file line
 * @param {Object} entries      The object containg the tasks for which a start or time has not beed identified yet
 */
const checkLogEntry = async (entry, entries, firstLogEntryTime) => {

    const [time, description, type, pid] = entry;

    // if the current task is not in the entries object, add it there
    if(!(pid in entries)){
        entries[pid] = {time: time,
                        description: description};
       
        // if the entry represents the start of a task, add the start time for the task in the entries object
        if(type.trim() === 'START'){
            entries[pid]['startAt'] = time;
        }
        // otherwise, add the end time for the task in the entries object
        else {
            entries[pid]['endAt'] = time;
        }
    }
    // if the task is already in the entries object
    // check its duration and decide if it should be kept (because it exceeds the warning or error thresholds)
    // or if it should be deleted because it ended in a reasonable time
    else {
        // check task duration logic
        checkTaskDuration(pid, entries, entries[pid].startAt, time);
    }
    
}

export default checkLogEntry;