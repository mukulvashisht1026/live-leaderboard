import { UpdateCurrentDateBucket } from '../models/bucketModel.js';
import { GetTodaysDate } from '../utils/dateUtils.js';

import cron  from 'node-cron';

// Function to perform your daily task
export const performDailyTask = () => {
  console.log('Performing the daily task...');
  UpdateCurrentDateBucket(GetTodaysDate())
 
};

// Define the cron job to run every 24 hours
export const task = cron.schedule('0 0 * * *', () => {
  console.log('Running a task every 24 hours at midnight');
  performDailyTask();
}, {
  scheduled: true, 
  timezone: 'UTC', 
});

