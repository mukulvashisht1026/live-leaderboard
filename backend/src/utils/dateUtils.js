import { format } from 'date-fns';


export const GetTodaysDate = () => {
    const date = new Date();
    const formattedDate = format(date, 'dd-MM-yyyy');
    return formattedDate;
}


export const GetDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = format(date, 'dd-MM-yyyy');
    return formattedDate;
}

