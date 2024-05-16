import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import Search from '@/pages/Search';
import CreateReview from '@/pages/CreateReview';
import ReviewList from '@/pages/ReviewList';
import MyPage from '@/pages/MyPage';
import Login from '@/pages/Login';
import JoinStep1Email from '@/pages/Join/JoinStep1Email';
import JoinStep2Nickname from '@/pages/Join/JoinStep2Nickname';
import JoinStep3Password from '@/pages/Join/JoinStep3Password';
import AdminLogin from '@/pages/Admin/AdminLogin';
import ReportedUsersDashboard from '@/pages/Admin/ReportedUsersDashboard';
import UnverifiedReviewsDashboard from '@/pages/Admin/UnverifiedReviewsDashboard';
import NotFoundError from './components/Error/NotFoundError';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/create" element={<CreateReview />} />
        <Route path="/list" element={<ReviewList />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        {/* 관리자 페이지 */}
        <Route path="/admin">
          <Route index element={<AdminLogin />} />
          <Route path="report-user" element={<ReportedUsersDashboard />} />
          <Route
            path="unverified-reviews"
            element={<UnverifiedReviewsDashboard />}
          />
        </Route>
        {/* 회원가입 */}
        <Route path="/join">
          <Route index element={<JoinStep1Email />} />
          <Route path="step1" element={<JoinStep1Email />} />
          <Route path="step2" element={<JoinStep2Nickname />} />
          <Route path="step3" element={<JoinStep3Password />} />
        </Route>
        <Route path="*" element={<NotFoundError />} />
      </Routes>
    </BrowserRouter>
  );
}
