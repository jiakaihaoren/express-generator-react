import { UploadResEntity, ResEntity } from '../model/users';
import { axios, baseURL } from './axiosInterceptor'

// 上传资源
export const uploadSource = (type:'images'|'videos') => (params: FormData): Promise<UploadResEntity> => {
  const promise = new Promise<UploadResEntity>((resolve, reject) => {
    try {
      axios.post<UploadResEntity>(`${baseURL}/upload/${type}`, params)
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

// 删除资源
export const deleteSources = (urls:string[]) : Promise<ResEntity> => {
  const promise = new Promise<ResEntity>((resolve, reject) => {
    try {
      axios.post<ResEntity>(`${baseURL}/upload/delete`, { urls })
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
