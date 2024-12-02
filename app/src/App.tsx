import './App.css';
import { Login } from './components/Login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { RegisterParticipant } from './participants/RegisterParticipant';
import { CreateEvent } from './admins/CreateEvent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/create-event",
    element: <CreateEvent  />,
  },
  {
    path: "/register",
    element: <RegisterParticipant />,
  },
  {
    path: "/recover-password",
    element: <div>Hola desde pocoyo</div>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
