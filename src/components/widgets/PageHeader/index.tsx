import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Input, Row, Typography } from 'antd'
import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography
type TPageHeader = {
  title: ReactNode
  extra?: { text: string; action: () => void; icon?: React.ReactNode }[]
  isBack?: boolean
  isSearch?: boolean
  onSearch?: (v: string) => void
  inCard?: boolean
}

function PageHeader({ title, isBack = true, isSearch = true, extra = [], onSearch, inCard = false }: TPageHeader) {
  const navigate = useNavigate()
  return (
    <>
      <Row
        gutter={[10, 10]}
        align="top"
        justify="space-between"
        className={inCard ? 'header-content-card' : 'header-content-main'}
      >
        <Col xl={isSearch ? 15 : 24} xs={24} sm={24}>
          <Row gutter={[10, 10]} align="top" wrap={false}>
            {isBack && (
              <Col flex="24px">
                <ArrowLeftOutlined onClick={() => navigate(-1)} style={{ marginTop: 10 }} />
              </Col>
            )}

            <Col flex="1">
              <Row align="middle" gutter={[10, 10]} wrap>
                <Col>
                  <Title level={4} style={{ marginBottom: 0 }} ellipsis={{ rows: 1 }}>
                    {title}
                  </Title>
                </Col>
                {extra?.length > 0 &&
                  extra.map((ex, index) => (
                    <Col key={index}>
                      <Button type="primary" onClick={ex.action} icon={ex.icon}>
                        {ex.text}
                      </Button>
                    </Col>
                  ))}
              </Row>
            </Col>
          </Row>
        </Col>
        {isSearch && (
          <Col style={{ marginLeft: 23 }}>
            <Input.Search
              placeholder="Tìm kiếm"
              className="search-bar"
              name="search"
              allowClear
              size="middle"
              onSearch={(value) => {
                if (onSearch) void onSearch(value)
              }}
            />
          </Col>
        )}
      </Row>
      {!inCard && <Divider style={{ margin: 0, marginBottom: 24 }} />}
    </>
  )
}

export default PageHeader
