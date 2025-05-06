import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import NotFound from '../pages/NotFound'; 
import Home from '../pages/Home.jsx';
import CurrencyConverter from '../pages/CurrencyConverter.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'exchange',
        element: <CurrencyConverter/>,
      }
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
