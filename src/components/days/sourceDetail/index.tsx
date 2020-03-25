import React, {
  useState, ReactElement, useRef,
} from 'react'
import { Modal, Button } from 'antd';
import { baseURL } from '@/api/axiosInterceptor'

interface SourceDetailProps{
    children:ReactElement,
    url:string,
    type:'image' | 'video'
}

const SourceDetail = (props:SourceDetailProps) => {
  const { type } = props
  const [visible, setVisible] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const showModal = () => {
    setVisible(true)
  };

  const pauseVideo = () => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause()
    }
  }
  const handleOk = () => {
    setVisible(false)
    if (type === 'video') {
      pauseVideo()
    }
  };

  const handleCancel = () => {
    setVisible(false)
    if (type === 'video') {
      pauseVideo()
    }
  };

  const { children, url } = props
  return (
    <div>
      <Button type="link" onClick={showModal}>
        {children}
      </Button>
      <Modal
        title={type}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {type === 'image' ? <img src={`${baseURL}${url}`} alt={url} style={{ width: 470 }} /> : null}
        {type === 'video' ? (
          <video ref={videoRef} src={`${baseURL}${url}`} controls style={{ width: 470 }}>
            您的浏览器不支持video标签
          </video>
        ) : null}
      </Modal>
    </div>
  );
}

export default SourceDetail
