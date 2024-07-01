import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from '../../pages/SignUp/SignUp';
import SignIn from '../../pages/SignIn/SignIn';
import Account from '../../pages/Account/Account';

function App() {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/me"
          element={isAuthenticated ? <Account /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? '/me' : '/sign-in'} />}
        />
      </Routes>
    </>
  );
}

export default App;
