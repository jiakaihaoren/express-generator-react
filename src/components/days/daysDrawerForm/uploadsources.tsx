import React, { useState, useEffect } from 'react'
import {
  Upload, Button,
} from 'antd';
import { UploadOutlined, FileImageOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload/interface'
import { uploadSource } from '../../../api/upload'
import SourceDetail from '../sourceDetail'
import { deleteSources } from '@/api/upload'

interface UploadSourcesPros{
    uploadType:'images'|'videos',
    value?:string[],
    onChange?(value:string[]):void,
}

const UploadSources = (props:UploadSourcesPros) => {
  const {
    uploadType, value, onChange,
  } = props
  const [urls, setUrls] = useState<string[] | undefined>(value)
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (onChange && urls) {
      onChange(urls)
    }
  }, [urls, onChange])
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append(uploadType, file);
    });
    setUploading(true)
    uploadSource(uploadType)(formData)
      .then((data) => {
        if (onChange) {
          if (urls) {
            setUrls([...urls, ...data.data.urls])
          } else {
            setUrls(data.data.urls)
          }
        }
        setUploading(false)
      })
      .catch((err) => {
        console.log(err)
        setUploading(false)
      })
  };

  const uploadProps = {
    onRemove: (file:any) => {
      // 这里有坑，UploadFile跟RcFile不匹配，只能用any
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file:RcFile) => {
      setFileList([...fileList, file])
      return false;
    },
    fileList,
  };

  const deleteSource = (url:string) => {
    deleteSources([url])
      .then(() => {
        if (urls) {
          const tempUrls = [...urls]
          const pos = tempUrls.indexOf(url)
          if (pos !== -1) {
            tempUrls.splice(pos, 1)
            setUrls(tempUrls)
          }
        }
      })
  }

  return (
    <div>
      <Upload {...uploadProps}>
        <Button>
          <UploadOutlined /> Select {uploadType}
        </Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
      {urls && urls.map((url, index) => (
        <div key={index} style={{ display: 'flex' }}>{uploadType === 'images'
          ? <SourceDetail type="image" url={url}><span><FileImageOutlined /> image {index + 1}</span></SourceDetail>
          : <SourceDetail type="video" url={url}><span><VideoCameraOutlined /> video {index + 1}</span></SourceDetail>}
          <Button type="link" onClick={() => { deleteSource(url) }}>删除</Button>
        </div>
      ))}
    </div>
  );
}

export default UploadSources
