import { Navigate } from 'react-router-dom';

function unProtectedRoutes({children}) {
    const token=localStorage.getItem('userToken');
    if(!token){
      return children;
    }
  return <Navigate to='/Login'  replace/>

}

export default unProtectedRoutes