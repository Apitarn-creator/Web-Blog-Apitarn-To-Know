import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn, getStoredUser } from '../utils/auth';

type Props = {
  requireAdmin?: boolean;
};

// ถ้าไม่ได้ login → ไป /login
// ถ้า requireAdmin=true แต่ไม่ใช่ admin → ไป /
function ProtectedRoute({ requireAdmin = false }: Props) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin) {
    const user = getStoredUser();
    if (user?.role !== 'admin') {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}

export default ProtectedRoute;
