import {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { message } from 'antd'

export const baseURL = 'http://localhost:3001';// baseURL

export const axios = Axios.create() // export this and use it in all your component
axios.defaults.withCredentials = true // 跨域cookie设置

// axios拦截器hooks 负责判断spinLoader的状态和是未登录跳转到登录界面
export const useAxiosLoader = () => {
  const historys = useHistory();
  const [counter, setCounter] = useState(0);

  // add to counter
  const inc = useCallback(() => setCounter((counter) => counter + 1), [setCounter]);
  // remove from counter
  const dec = useCallback(() => setCounter((counter) => counter - 1), [setCounter]);

  const interceptors = useMemo(() => ({
    request: (config: any) => { inc(); return config },
    response: (response: any) => {
      dec()
      if (response.data.err === 0) {
        message.success(response.data.msg)
        return response
      }
      if (response.data.err === -998) {
        historys.push('/');
      }
      message.error(response.data.msg)
      return Promise.reject(response.data.msg)
    },
    error: (error: Error) => {
      dec()
      message.error(error.message)
      return Promise.reject(error)
    },
  }), [inc, dec, historys]); // create the interceptors

  useEffect(() => {
    // add request interceptors
    const ax1 = axios.interceptors.request.use(interceptors.request, interceptors.error);
    // add response interceptors
    const ax2 = axios.interceptors.response.use(interceptors.response, interceptors.error);
    return () => {
      // remove all intercepts when done
      axios.interceptors.request.eject(ax1);
      axios.interceptors.response.eject(ax2);
    };
  }, [interceptors]);

  return counter > 0;
};
