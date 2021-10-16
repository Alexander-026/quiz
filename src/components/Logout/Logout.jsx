import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { AuthContext } from '../../pages/Auth/container/AuthContext';

const Logout = () => {
   const {exportLogout} = useContext(AuthContext)

   useEffect(() => {
      console.log('avnasjkvnas')
      exportLogout()
   }, [])

   return (
      <Redirect to={'/'} />
   );
};

export default Logout;