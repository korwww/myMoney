import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layout/Layout';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import CreateReview from '@/pages/CreateReview';
import ReviewList from '@/pages/ReviewList';
import MyPage from '@/pages/MyPage';
import Login from '@/pages/Login';

const routerData = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/create',
    element: <CreateReview />,
  },
  {
    path: '/list',
    element: <ReviewList />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export const router = createBrowserRouter(
  routerData.map(({ path, element }) => ({
    path,
    element: <Layout>{element}</Layout>,
  })),
);

// errorElement: "오류 컴포넌트"
