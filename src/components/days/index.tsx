import React, { useState, useEffect } from 'react'
import {
  Table, Tag, Button, message,
} from 'antd';
import { DaysEntity } from '../../model/users'
import { getDaysList } from '../../api/users'

const Days = () => {
  const [dataList, setDataList] = useState<DaysEntity[]>([])
  useEffect(() => {
    getDaysList()
      .then((data) => {
        setDataList(data.msg)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Keywords',
      dataIndex: 'keywords',
      key: 'keywords',
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Images',
      key: 'images',
      dataIndex: 'images',
      render(images: string[]) {
        return (
          <span>
            {images.map((url:string, index:number) => <Button key={index}>{url}</Button>)}
          </span>
        )
      },
    },
    {
      title: 'Viodes',
      key: 'videos',
      dataIndex: 'videos',
      render(videos: string[]) {
        return (
          <span>
            {videos.map((url:string, index:number) => <Button key={index}>{url}</Button>)}
          </span>
        )
      },
    },
  ];

  return (
    <Table columns={columns} dataSource={dataList} rowKey={(row) => row._id} />
  )
}

export default Days
