import { Outlet } from 'react-router-dom';
import Header from '../components/ui/header';

export default function GlobalLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
