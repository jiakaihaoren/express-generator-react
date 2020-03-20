import React, { useState } from 'react';
import {
  Form, Input, Button, Checkbox, message,
} from 'antd';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css'
import { usersLogin } from '../../api/users'
import { useDispatch } from '../../store';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 11, span: 12 },
};

const Login = () => {
  const history = useHistory();
  const onFinish = (values:any) => {
    const { us, ps } = values
    usersLogin({ us, ps })
      .then((data) => {
        if (data.err === 0) {
          message.success(data.msg)
          history.push('/days');
        } else {
          message.error(data.msg);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.formWrapper}>
      <h2>欢迎来到jkzzj的主页，请先登录</h2>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="us"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="ps"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Login;
