import {
  useState, useCallback, useMemo, useRef, useEffect,
} from 'react';
import Axios, { AxiosResponse } from 'axios';
import { LoginReqEntity, UsersResEntity, DaysResEntity } from '../model/users';


const baseURL = 'http://localhost:3001';

const ax = Axios.create() // export this and use it in all your component
ax.defaults.withCredentials = true // 跨域cookie设置
export const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);

  // add to counter
  const inc = useCallback(() => setCounter((counter) => counter + 1), [setCounter]);
  // remove from counter
  const dec = useCallback(() => setCounter((counter) => counter - 1), [setCounter]);

  const interceptors = useMemo(() => ({
    request: (config: any) => { inc(); return config },
    response: (response: any) => { dec(); return response },
    error: (error: any) => { dec(); return Promise.reject(error) },
  }), [inc, dec]); // create the interceptors

  useEffect(() => {
    // add request interceptors
    const ax1 = ax.interceptors.request.use(interceptors.request, interceptors.error);
    // add response interceptors
    const ax2 = ax.interceptors.response.use(interceptors.response, interceptors.error);
    return () => {
      // remove all intercepts when done
      // ax.interceptors.request.eject(interceptors.request);
      // ax.interceptors.request.eject(interceptors.error);
      // ax.interceptors.response.eject(interceptors.response);
      // ax.interceptors.response.eject(interceptors.error);
      ax.interceptors.request.eject(ax1);
      ax.interceptors.response.eject(ax2);
    };
  }, [interceptors]);

  return counter > 0;
};

// // 添加请求拦截器
// Axios.interceptors.request.use((config) => {
//   console.log(config)
//   return config
// },
// (error) => Promise.reject(error));

// // 添加响应拦截器
// Axios.interceptors.response.use((response) => {
//   console.log(response)
//   return response
// }, (error) => Promise.reject(error));

// export const getList = (params:Params): Promise<UserEntity[]> => {
//   const promise = new Promise<UserEntity[]>((resolve, reject) => {
//     try {
//       Axios.get<UserEntity>(`${baseURL}/find`, { params }).then((response) => {
//         resolve([response.data]);
//       });
//     } catch (ex) {
//       reject(ex);
//     }
//   });
//   return promise;
// };

// const mapListAllApiToModel = ({
//   data,
// }: AxiosResponse<any[]>): UserEntity[] => data.map((list) => ({
//   id: list.id,
//   name: list.name,
//   money: list.money,
// }));

// export const getListAll = (): Promise<UserEntity[]> => {
//   const promise = new Promise<UserEntity[]>((resolve, reject) => {
//     try {
//       Axios.get<UserEntity[]>(`${baseURL}/findAll`).then((response) => {
//         resolve(mapListAllApiToModel(response));
//       });
//     } catch (ex) {
//       reject(ex);
//     }
//   });
//   return promise;
// };

export const usersLogin = (params: LoginReqEntity): Promise<UsersResEntity> => {
  const promise = new Promise<UsersResEntity>((resolve, reject) => {
    try {
      ax.post<UsersResEntity>(`${baseURL}/users/login`, params).then((response) => {
        resolve(response.data);
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
      ax.get<DaysResEntity>(`${baseURL}/days`).then((response) => {
        resolve(response.data);
      });
    } catch (ex) {
      reject(ex);
    }
  });
  return promise;
};

// export const deleteUser = (params:Params): Promise<ResopnseStatusEntity> => {
//   const promise = new Promise<ResopnseStatusEntity>((resolve, reject) => {
//     try {
//       Axios.get<ResopnseStatusEntity>(`${baseURL}/delete`, { params }).then((response) => {
//         resolve(response.data);
//       });
//     } catch (ex) {
//       reject(ex);
//     }
//   });
//   return promise;
// };
