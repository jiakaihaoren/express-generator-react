import { ResEntity, DaysResEntity, DaysEntity } from '../model/users';
import { axios, baseURL } from './axiosInterceptor'

// 获取所有days
export const getDaysList = (): Promise<DaysResEntity> => {
  const promise = new Promise<DaysResEntity>((resolve, reject) => {
    try {
      axios.get<DaysResEntity>(`${baseURL}/days/all`)
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
// 按姓名查询days
export const getDaysByName = (name:string): Promise<DaysResEntity> => {
  const promise = new Promise<DaysResEntity>((resolve, reject) => {
    try {
      axios.get<DaysResEntity>(`${baseURL}/days/search`, { params: { name } })
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
// 增加days
export const addDays = (params: DaysEntity): Promise<ResEntity> => {
  const promise = new Promise<ResEntity>((resolve, reject) => {
    try {
      axios.post<ResEntity>(`${baseURL}/days/add`, params)
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
// 删除days
export const deleteDay = (params: {id:string}): Promise<ResEntity> => {
  const promise = new Promise<ResEntity>((resolve, reject) => {
    try {
      axios.get<ResEntity>(`${baseURL}/days/delete`, { params })
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
// 更新days
export const updateDay = (params: DaysEntity): Promise<ResEntity> => {
  const promise = new Promise<ResEntity>((resolve, reject) => {
    try {
      axios.post<ResEntity>(`${baseURL}/days/update`, params)
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
