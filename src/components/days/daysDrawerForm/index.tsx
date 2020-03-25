import React, { useState } from 'react'
import {
  Drawer, Form, Button, Col, Row, Input, DatePicker,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment'
import styles from './index.module.css'
import { addDays, updateDay } from '@/api/days'
import UploadSources from './uploadsources'
import { DaysEntity } from '@/model/users'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 0 },
  },
};

interface DaysDrawerFormProps{
  type:'add' | 'update',
  children?:React.ReactNode
  data?: DaysEntity
}

const DaysDrawerForm = (props:DaysDrawerFormProps) => {
  const { type, data, children } = props
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  const onSubmit = () => {
    form.validateFields()
      .then((values) => {
        const [dateFrom, dateTo] = values.date
        if (type === 'add') {
          addDays({
            ...values,
            name: values.name,
            date: [dateFrom.valueOf(), dateTo.valueOf()],
          })
            .then(() => {
              form.resetFields()
              onClose()
            })
            .catch((err) => {
              console.log(err)
            })
        }
        if (type === 'update') {
          updateDay({
            _id: data && data._id,
            ...values,
            name: values.name,
            date: [dateFrom.valueOf(), dateTo.valueOf()],
          })
            .then(() => {
              onClose()
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Button type="link" onClick={showDrawer}>
        {children}
      </Button>
      <Drawer
        title={type === 'add' ? 'Create a new days' : `Update ${data && data.name} `}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={(
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button
              onClick={onClose}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
          </div>
          )}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          initialValues={{
            name: data && data.name,
            date: data && data.date && [moment(data.date[0]), moment(data.date[1])],
            keywords: data && data.keywords,
            details: data && data.details,
            images: data && data.images,
            videos: data && data.videos,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter event name' }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="date"
                label="DateTime"
                rules={[{ required: true, message: 'Please choose the date' }]}
              >
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={20}>
              <Form.List name="keywords">
                {(fields, { add, remove }) => (
                  <div>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        label={index === 0 ? 'Keywords' : ''}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: false,
                              whitespace: true,
                              message: 'keyword',
                            },
                          ]}
                          noStyle
                        >
                          <Input placeholder="keyword" style={{ width: '60%', marginRight: 8 }} />
                        </Form.Item>
                        <span>
                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              className={styles.dynamicDeleteButton}
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          ) : null}
                        </span>
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        style={{ width: '60%' }}
                      >
                        <PlusOutlined /> Add Keyword
                      </Button>
                    </Form.Item>
                  </div>
                )}
              </Form.List>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="images"
                label="Images"
              >
                <UploadSources uploadType="images" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="videos"
                label="Videos"
              >
                <UploadSources uploadType="videos" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="details"
                label="Details Description"
                rules={[
                  {
                    required: true,
                    message: 'Please enter event details description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Please enter event details description" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}

export default DaysDrawerForm
