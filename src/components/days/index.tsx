import React, { useState, useEffect } from 'react'
import {
  Table, Button, Input,
} from 'antd';
import {
  VideoCameraOutlined, FileImageOutlined, PlusOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { DaysEntity } from '@/model/users'
import DaysDrawerForm from './daysDrawerForm/index'
import styles from './index.module.css'
import SourceDetail from './sourceDetail'
import { getDaysList, getDaysByName, deleteDay } from '@/api/days'
import { deleteSources } from '@/api/upload'

const Days = () => {
  const [dataList, setDataList] = useState<DaysEntity[]>([])
  const [nameInput, setNameInput] = useState<string>('')
  const getAllDays = () => {
    getDaysList()
      .then((data) => {
        setDataList((data.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getAllDays()
  }, [])

  const dateTransform = (date:number) => moment(date).format('YYYY-MM-DD HH:mm:ss')
  // 删除图片和视频资源
  const deleteSource = (urls:string[]) => {
    deleteSources(urls)
  }
  // 删除days的时候确保删除videos和images
  const deleteDays = (id:string, images:string[], videos:string[]) => {
    deleteDay({ id })
    const urls = [...images, ...videos]
    deleteSource(urls)
  }

  const changeNameInput = (e:React.FormEvent<HTMLInputElement>) => {
    setNameInput(e.currentTarget.value)
  }

  const serchDaysByName = () => {
    getDaysByName(nameInput)
      .then((data) => {
        setDataList(data.data)
      })
  }

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
      render(date: string[]) {
        return (
          <span>{date.length > 1 ? `from ${dateTransform(Number(date[0]))} to ${dateTransform(Number(date[1]))}` : null}</span>
        )
      },
    },
    {
      title: 'Keywords',
      dataIndex: 'keywords',
      key: 'keywords',
      render(keywords:string[]) {
        return (
          <span>
            {keywords.join(',')}
          </span>
        )
      },
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
            {images.map((url:string, index:number) => <SourceDetail key={index} type="image" url={url}><span><FileImageOutlined /> image {index + 1}</span></SourceDetail>)}
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
            {videos.map((url:string, index:number) => <SourceDetail key={index} type="video" url={url}><span><VideoCameraOutlined /> video {index + 1}</span></SourceDetail>)}
          </span>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      render(text:string, record:any) {
        return (
          <span>
            <DaysDrawerForm type="update" data={record}>
              <span>update</span>
            </DaysDrawerForm>
            <Button type="link" onClick={() => { deleteDays(record._id, record.images, record.videos) }}>Delete</Button>
          </span>
        )
      },
    },
  ];
  return (
    <div>
      <div className={styles.actionWrapper}>
        <div>
          <Input className={styles.searchInput} placeholder="输入名字查询" style={{ width: 300 }} onChange={changeNameInput} />
          <Button onClick={serchDaysByName}>Search</Button>
        </div>
        <div className={styles.actionBtn}>
          <DaysDrawerForm type="add"><span><PlusOutlined /> 添加</span></DaysDrawerForm>
          <Button className={styles.freshBtn} onClick={getAllDays}>刷新</Button>
        </div>
      </div>
      <Table columns={columns} dataSource={dataList} rowKey={(row) => row._id} />
    </div>

  )
}

export default Days
