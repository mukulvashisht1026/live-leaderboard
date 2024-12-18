import { AddNewBucketForDate } from './tradeModel.js';

let currentDateBucket = '';

export const UpdateCurrentDateBucket = (currentDate) => {
  currentDateBucket = currentDate;
  AddNewBucketForDate(currentDateBucket);
};

export const GetCurrentDateBucket = () => currentDateBucket;
