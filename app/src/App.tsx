import './App.css';
import { Login } from './components/Login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { RegisterParticipant } from './participants/RegisterParticipant';
import { CreateEvent } from './admins/CreateEvent';
import { Dashboard } from './admins/Dashboard';
import { ListUsers } from './admins/ListUsers';
import { ListEvents } from './admins/ListEvents';
import { ListTeams } from './admins/ListTeams';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Dashboard />,
  },
  {
    path: "/user/list",
    element: <ListUsers />,
  },
  {
    path: "/event/list",
    element: <ListEvents />,
  },
  {
    path: "/team/list",
    element: <ListTeams />,
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
