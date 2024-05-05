import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/Home';
import Search from '@/pages/Search';
import CreateReview from '@/pages/CreateReview';
import ReviewList from '@/pages/ReviewList';
import MyPage from '@/pages/MyPage';
import Login from '@/pages/Login';
import JoinStep1Email from '@/pages/Join/JoinStep1Email';
import JoinStep2Nickname from '@/pages/Join/JoinStep2Nickname';
import JoinStep3Password from '@/pages/Join/JoinStep3Password';
import ResetPassword from '@/pages/ResetPassword';
import AdminLogin from '@/pages/Admin/AdminLogin';
import ReportedUsersDashboard from '@/pages/Admin/ReportedUsersDashboard';
import UnverifiedReviewsDashboard from '@/pages/Admin/UnverifiedReviewsDashboard';

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
  { path: '/join', element: <JoinStep1Email /> },
  {
    path: '/join/step1',
    element: <JoinStep1Email />,
  },
  {
    path: '/join/step2',
    element: <JoinStep2Nickname />,
  },
  {
    path: '/join/step3',
    element: <JoinStep3Password />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/myMoney-admin',
    element: <AdminLogin />,
  },
  {
    path: '/myMoney-admin/report-user',
    element: <ReportedUsersDashboard />,
  },
  {
    path: '/myMoney-admin/unverified-reviews',
    element: <UnverifiedReviewsDashboard />,
  },
];

export const router = createBrowserRouter(
  routerData.map(({ path, element }) => ({
    path,
    element,
  })),
);

// errorElement: "오류 컴포넌트"
