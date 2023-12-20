import { ArrowRightOutlined } from '@ant-design/icons'
import { Card, Col, Row, Space, Typography } from 'antd'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type TGlanceCardDashboard = {
  moreInfo?: string
  total?: number
  label?: string
  icon?: ReactNode
}

function GlanceCardDashboard({ moreInfo, total, label, icon }: TGlanceCardDashboard) {
  return (
    <Card
      bordered={false}
      extra={
        <Link to={moreInfo || '/'}>
          <Space align="center">
            Xem Thêm <ArrowRightOutlined />
          </Space>
        </Link>
      }
    >
      <Row align="bottom" justify="space-between">
        <Col flex="1">
          <Row>
            <Col span={24}>
              <Typography.Title style={{ marginBottom: 8 }} level={2}>
                {total ? (total >= 10 ? total : `0${total}`) : 0}
              </Typography.Title>
            </Col>
            {label && <Col span={24}>{label}</Col>}
          </Row>
        </Col>
        {icon && <Col flex="60px">{icon}</Col>}
      </Row>
    </Card>
  )
}

export default GlanceCardDashboard
