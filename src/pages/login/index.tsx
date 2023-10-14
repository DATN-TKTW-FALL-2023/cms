import HeadHtml from '@src/components/layout/HeadHtml'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { regexPwdStrong, regexUsername } from '@src/utils/regex'
import { TSignIn } from '@src/modules'
import { checkAuth } from '@src/libs/localStorage'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutationSignIn } from '@src/queries/hooks'
import logoApp from '@assets/favicon.svg'
import logoTWG from '@assets/logo-twg.svg'

function Login() {
  const [form] = Form.useForm<TSignIn>()
  const navigate = useNavigate()
  const token: string = checkAuth()

  const { mutate, isLoading } = useMutationSignIn()
  const onLogin = (values: TSignIn) => {
    mutate(values, {
      onSuccess: () => {
        navigate('/')
      },
    })
  }

  useEffect(() => {
    if (token) navigate('/')
  }, [navigate, token])
  return (
    <Row className="login-container">
      <HeadHtml title="Login" />
      <Col className="login-boxer">
        <Row gutter={[24, 60]} align="middle" justify="center">
          <Col span={24}>
            <Row justify="center">
              <img src={logoApp} className="logo" alt="logo" />
            </Row>
          </Col>
          <Col span={24}>
            <Form name="login" form={form} onFinish={onLogin}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                  { pattern: regexUsername, message: 'Username invalid' },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Username"
                  size="large"
                  autoFocus
                  onPressEnter={() => form.submit()}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your Password!' },
                  { pattern: regexPwdStrong, message: 'Password invalid' },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                  size="large"
                  onPressEnter={() => form.submit()}
                />
              </Form.Item>

              <Form.Item>
                <Form.Item valuePropName="checked" noStyle>
                  <Checkbox style={{ color: '#ffffff' }} checked>
                    Remember me
                  </Checkbox>
                </Form.Item>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-submit-login"
                  size="large"
                  block
                  loading={isLoading}
                  disabled={isLoading}
                >
                  LOGIN
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
      <Row className="login-ft" gutter={8} align="middle" justify="center">
        <Col>
          <span>{'Designed and Developer by '}</span>
        </Col>
        <Col>
          <a href="https://twinger.vn/" target="_blank" rel="noreferrer">
            <img src={logoTWG} alt="logo" width={90} />
          </a>
        </Col>
      </Row>
    </Row>
  )
}

export default Login
