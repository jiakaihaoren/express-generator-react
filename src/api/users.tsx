import { LoginReqEntity, ResEntity } from '../model/users';
import { axios, baseURL } from './axiosInterceptor'


export const usersLogin = (params: LoginReqEntity): Promise<ResEntity> => {
  const promise = new Promise<ResEntity>((resolve, reject) => {
    try {
      axios.post<ResEntity>(`${baseURL}/users/login`, params)
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

export const usersLogout = (): Promise<ResEntity> => {
  const promise = new Promise<ResEntity>((resolve, reject) => {
    try {
      axios.get<ResEntity>(`${baseURL}/users/logout`)
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
