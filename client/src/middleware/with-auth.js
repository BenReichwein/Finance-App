import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../actions/api'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function WithAuth({children}) {
  const [loading, setLoading] = useState(true)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    api.get('check-token', {
      params: {token: cookies.get('token')}
    })
    .then(res => {
      if (res.status === 200) {
        setLoading(false)
      } else {
        console.log(res.error)
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      setLoading(false)
      setRedirect(true)
    });
  })
  if (loading) {
    return null;
  }
  if (redirect) {
    window.location.href='/login'
    return <Link to="/login" />;
  }
  return children
}