import { useLogoutMutation } from '../services/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth, selectUser } from '../features/auth/authSlice';
import { clearProactiveRefresh } from '../features/auth/tokenScheduler';
import Button from '../components/Button/Button';
import { useNavigate } from 'react-router';

export default function DashboardPage() {
    const [doLogout] = useLogoutMutation();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    const onLogout = async () => {
        try {
            await doLogout().unwrap();
        } catch (err) {
            console.log(err);
        } finally {
            clearProactiveRefresh();
            dispatch(clearAuth());
            window.__tabSync?.notifyLogout?.();
            navigate('/login');
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Hello {user?.name || 'there'} 👋</p>
            <Button variant="primary" onClick={onLogout} label={'Log Out'} />
        </div>
    );
}
