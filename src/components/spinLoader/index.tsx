import React from 'react';
import { Spin } from 'antd';
import { useAxiosLoader } from '../../api/axiosInterceptor'
import styles from './index.module.css'

const SpinLoader = () => {
  const show = useAxiosLoader()// load状态hooks
  return (
    <div className={styles.spin}>
      <Spin size="large" spinning={show} />
    </div>
  )
}

export default SpinLoader
