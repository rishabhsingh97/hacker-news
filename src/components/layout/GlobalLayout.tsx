import Header from '../ui/header';
import { Outlet } from 'react-router-dom';

interface GlobalLayputProps {
}

export default function GlobalLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
