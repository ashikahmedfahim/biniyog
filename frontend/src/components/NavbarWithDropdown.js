import { Dropdown, Navbar } from 'flowbite-react';
import { Avatar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { addNotification } from '../slices/notificationSlice';
import { logoutUser } from '../slices/authSlice';


export default function NavbarWithDropdown() {
  const { accessToken, user } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data: response } = await axiosInstance.get('/users/logout');
      dispatch(addNotification({ type: "success", message: response.message }));
      dispatch(logoutUser());
      navigate('/log-in');
    } catch (err) {
      dispatch(addNotification({ type: "error", message: err.response.data.message }));
    }
  };

  const goToMyPosts = () => {
    navigate(`/my-posts`);
  };

  return (
    <Navbar
      fluid
      rounded
      className='container mx-auto'
    >
      <Navbar.Toggle />
      <Navbar.Brand className='cursor-default'>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Goodread
        </span>
      </Navbar.Brand>
      <div className="flex items-center">
        <Navbar.Collapse className='mr-5'>
          <Link to="/">
            Newsfeed
          </Link>
          {
            !accessToken &&
            <>
              <Link to="/log-in">
                Log In
              </Link>
              <Link to="/sign-in">
                Sign In
              </Link>
            </>
          }
        </Navbar.Collapse>
        {
          accessToken &&
          <Dropdown
            inline
            label={
              <p className='bg-blue-400 py-1 px-3 rounded-full text-white text-2xl'>
                {user.first_name[0].toUpperCase()}
              </p>
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {user.first_name} {user.last_name}
              </span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={goToMyPosts}>
              My Posts
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate(`/my-follows`)}>
              My Follows
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        }
      </div>
    </Navbar>
  )
}


