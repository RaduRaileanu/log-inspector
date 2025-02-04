# log-inspecter #

## Description ##
A node.js app that reads a log file and determines which tasks took more than 5 or more than 10 minutes to complete and generates a report that includes information about them.

For the tasks that began before the time of the first entry in the log, or ended after the time of the last entry in the log, the app logs a potential warning/error message if their duration is not certain to have exceeded 5 minutes.

### Report structure ###
Tasks for which both the start and end time have been included in the log, will be included in the report following this pattern:

[WARNING/ERROR] task <PID] - <description] took <duration in seconds] to complete. Task started at <start time] and ended at <end time]

Tasks for which either the start or end date have not been included in the log, but for which their duration is ceratain to exceed 5 or 10 minutes, will be included in report following this pattern:

[WARNING/ERROR] task [PID] - [description] took at least [duration in seconds] to complete. [Task started at [start time] but did not finish by the time the log was generated / Task began before the log was generated and ended at [end time]]

Tasks for which either the start or end date have not been included in the log, but for which it is impossible to determine if the duration exceeded 5 or 10 minutes, will be included in report following this pattern:

[Potential WARNING/ERROR]: [PID] - [description]. [Started at [start time] but didn't finish by the time the log stopped / Ended at [end time] but started before the log began.]

## Instalation and usage ##

Ensure you have Node.js installed

Clone the repository

Install the dependencies: **run npm install** in the same directory as the root directory of the cloned repository

Copy your log in the **inbox** folder. The log must be in cvs format. Each log entry must follow the structure [time, description, type, pid]

Run the app with **node log-inspector.js**

Open the **report.txt** file generated in the root directory of the cloned repository

## Testing ##

Tests have been prepared for the code in the writer.js and log-entry-processor.js files.

To run the tests enter **npm test**

## To-DO / Future improvement

Add tests to cover more of the codebase

Present the report in a visually appealing format.
