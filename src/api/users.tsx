import {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import Axios, { AxiosResponse } from 'axios';
import { useHistory } from 'react-router-dom';
import { message } from 'antd'
import { LoginReqEntity, UsersResEntity, DaysResEntity } from '../model/users';

const baseURL = 'http://localhost:3001';

const ax = Axios.create() // export this and use it in all your component
ax.defaults.withCredentials = true // 跨域cookie设置

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
        return response
      }
      if (response.data.err === -998) {
        historys.push('/');
      }
      message.error(response.data.msg)
      return Promise.reject(response.data.msg)
    },
    error: (error: any) => {
      dec()
      message.error(error)
      return Promise.reject(error)
    },
  }), [inc, dec]); // create the interceptors

  useEffect(() => {
    // add request interceptors
    const ax1 = ax.interceptors.request.use(interceptors.request, interceptors.error);
    // add response interceptors
    const ax2 = ax.interceptors.response.use(interceptors.response, interceptors.error);
    return () => {
      // remove all intercepts when done
      ax.interceptors.request.eject(ax1);
      ax.interceptors.response.eject(ax2);
    };
  }, [interceptors]);

  return counter > 0;
};

export const usersLogin = (params: LoginReqEntity): Promise<UsersResEntity> => {
  const promise = new Promise<UsersResEntity>((resolve, reject) => {
    try {
      ax.post<UsersResEntity>(`${baseURL}/users/login`, params)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err)
        })
    } catch (ex) {
      reject(ex);
    }
  });
  return promise;
};

export const usersLogout = (): Promise<UsersResEntity> => {
  const promise = new Promise<UsersResEntity>((resolve, reject) => {
    try {
      ax.get<UsersResEntity>(`${baseURL}/users/logout`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err)
        });
    } catch (ex) {
      reject(ex);
    }
  });
  return promise;
};

export const getDaysList = (): Promise<DaysResEntity> => {
  const promise = new Promise<DaysResEntity>((resolve, reject) => {
    try {
      ax.get<DaysResEntity>(`${baseURL}/days`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err)
        });
    } catch (ex) {
      reject(ex);
    }
  });
  return promise;
};
