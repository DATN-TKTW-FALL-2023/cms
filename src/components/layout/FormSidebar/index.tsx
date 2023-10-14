import { Col, Form, FormProps, Row, Spin } from 'antd'

type TFormSidebarLayout = {
  children: JSX.Element
  isLoading?: boolean
}

function FormSidebar({ children, isLoading = false, ...props }: TFormSidebarLayout & FormProps) {
  return (
    <Row style={{ marginTop: 14 }}>
      {isLoading ? (
        <Col span={24}>
          <Row justify="center" align="middle" style={{ height: 258 }}>
            <Col>
              <Spin tip="Loading data" />
            </Col>
          </Row>
        </Col>
      ) : (
        <Col span={24}>
          <Form {...props}>
            <Row gutter={[24, 24]}>{children}</Row>
          </Form>
        </Col>
      )}
    </Row>
  )
}
FormSidebar.Content = function ({ children }: { children: JSX.Element }) {
  return (
    <Col xl={17} lg={15} sm={24} xs={24}>
      {children}
    </Col>
  )
}
FormSidebar.Sidebar = function ({ children }: { children: JSX.Element }) {
  return (
    <Col xl={7} lg={9} sm={24} xs={24}>
      {children}
    </Col>
  )
}
export default FormSidebar
