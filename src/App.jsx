import { Outlet, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Header from './components/Header';
import './App.css';

export default function App() {
  return (
    <>
      <header>
        <Header>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/exchange">Exchange Rates</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
        </Header>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
