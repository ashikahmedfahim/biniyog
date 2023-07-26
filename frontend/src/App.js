import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from './pages/NotFound';
import Newsfeed from './pages/Newsfeed';
import NavbarWithDropdown from './components/NavbarWithDropdown';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import showNotification from './utilities/showNotification';
import { removeNotification } from './slices/notificationSlice';
import { useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';
import MyPosts from './pages/MyPosts';
import MyFollows from './pages/MyFollows';

function App() {
  const { notifications } = useSelector(state => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notifications.length) {
      notifications.forEach(notification => {
        showNotification(notification.type, notification.message);
        dispatch(removeNotification());
      });
    }
  }, [notifications]);

  return (
    <>
      <ToastContainer
        autoClose={5000}
        closeOnClick
      />
      <NavbarWithDropdown />
      <div className='container mx-auto p-2'>
        <Routes>
          <Route path="/" element={<PrivateRoute><Newsfeed /></PrivateRoute>} />
          {/* <Route path="/my-posts" element={<PrivateRoute><MyPosts /></PrivateRoute>} /> */}
          <Route path="/my-follows" element={<PrivateRoute><MyFollows /></PrivateRoute>} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-in" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
