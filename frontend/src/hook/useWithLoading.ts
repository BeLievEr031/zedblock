import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/slice/authSlice';
import { whoami } from '../https/apis';
export function useLoadingWithRefresh() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
   console.log(45);
   
      (async () => {
        try {
         const res = await whoami();
          console.log(res)
          dispatch(setAuth(res.data.data));
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      })();
    }, []);
  
    return { loading };
  }
  