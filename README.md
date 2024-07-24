First Clone the project into your local repository
use node 22 version (nvm use 22)
Run the following steps:
npm intsall
cd frontend
npm install
cd ..
cd backend
npm install
cd ..

Now create a .env file immediatley inside backend folder (outside of src and inside backend folder)
PORT=3200
MONGO_DB_URI=mongodb+srv://chetan:chetan@e-commerce.ouplu7d.mongodb.net/vooshi?retryWrites=true&w=majority&appName=e-commerce
JWT_SECRET=4eQ72l8L4jGk57dQkq8hP2jP6h9vZ1mT2rH6dR7nW8xC3bQ9jT1wV4tG2yX8kS5e

( env variables are not be shared, sharing it only for u to test it and allwing to work it wihtout any disrupancy)

In the root folder run the followind command:
npm run dev
This single commadn will start backedn and frontend simultaneously.


WORKING

You will be redirected to login page after frontend opens, if you have account login else go to sign up page.
Signup with your details and it will be redirected to login.
login using your credentials- you will be redirected to tasks page.
Then u can work on adding tasks and etc operations.
