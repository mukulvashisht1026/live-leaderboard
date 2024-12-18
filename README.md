About the application:

I have built backend and frontend as seperate services. frontend is in react and backend is nodejs based. I have created APIs to insert trade data in the system. which functions can also be used in kafka consumer if there is any system which streams trade data to this system.

The frontend only displays top 10 user for particular symbol and date.




-------------------------------------------------------------------------------------------------



Steps to run the backend application.

Assumption:
- NodeJs is installed on your system.

1. Open terminal Navigate to the backend folder

cd backend

2. run below command to install all dependencies.

npm install

3. run below command to start the server.

npm run dev



-------------------------------------------------------------------------------------------------


Steps to start frontend server.

Assumption:
- NodeJs is installed on your system.

1. Open new terminal and Navigate to the defx-frontend folder

cd defx-frontend

2. run below command to install all dependencies.   

npm install

3. run below command to start the server. 

npm run dev




-----------------------------------------------------------------------------------------------------


Try the application by opening  http://localhost:5173/ in your browser. And wait for few seconds for data to load in dashboard.

mock data is only for past two dates so if you select date previous than that there will be no data.


-----------------------------------------------------------------------------------------------------

TESTS

To run tests navigate to the backend folder and run command

npm run test


-----------------------------------------------------------------------------------------------------
With this README file postman collection file is present to try the APIs. file name is Defx-leaderboard.postman_collection.json