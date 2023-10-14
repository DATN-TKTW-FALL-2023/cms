import { CalendarOutlined, ClockCircleOutlined, PushpinOutlined } from '@ant-design/icons'
import { FORMAT_TIME_DEFAULT, STATUS_DOCUMENT_SELECT } from '@src/configs/const.config'
import { EStatusDoc, TStatusDoc } from '@src/configs/interface.config'
import { TUser } from '@src/modules'
import { Badge, Button, Col, Collapse, DatePicker, Divider, Form, Popconfirm, Row, Select } from 'antd'
import dayjs from 'dayjs'

const { Panel } = Collapse

type TActionPublishData = {
  status?: EStatusDoc
  isActive?: boolean
  createdAt?: Date
  author?: TUser
  scheduleAt?: Date
}

type TActionPublishShowInput = {
  isActive?: boolean
  status?: boolean
  scheduleAt?: boolean
}

type TActionPublish = {
  data?: TActionPublishData
  statusOption?: TStatusDoc[]
  loadingPublish?: boolean
  loadingUpdate?: boolean
  loadingDelete?: boolean
  onPublish?: () => void
  onDelete?: () => void
  onUpdate?: () => void
  showInput?: TActionPublishShowInput
}

function ActionPublish({
  data,
  statusOption,
  loadingPublish = false,
  loadingUpdate = false,
  loadingDelete = false,
  onPublish,
  onDelete,
  onUpdate,
  showInput,
}: TActionPublish) {
  return (
    <Collapse defaultActiveKey={['1']} expandIconPosition="end">
      <Panel header="Action" key="1">
        <Row>
          <Col span={24} style={{ marginBottom: 24 }}>
            <Row>
              <Col flex="23px">
                <CalendarOutlined style={{ marginTop: 9 }} />
              </Col>
              <Col flex="1">
                <DatePicker
                  disabled
                  showTime
                  allowClear={false}
                  format={FORMAT_TIME_DEFAULT}
                  className="date-picker-input"
                  defaultValue={dayjs(data?.createdAt || new Date(), FORMAT_TIME_DEFAULT)}
                />
              </Col>
            </Row>
          </Col>
          {!!showInput?.scheduleAt && (
            <Col span={24}>
              <Row>
                <Col flex="23px">
                  <ClockCircleOutlined style={{ marginTop: 9 }} />
                </Col>
                <Col flex="1">
                  <Form.Item
                    name="scheduleAt"
                    initialValue={dayjs(data?.scheduleAt || new Date(), FORMAT_TIME_DEFAULT)}
                  >
                    <DatePicker
                      showTime
                      allowClear={false}
                      format={FORMAT_TIME_DEFAULT}
                      className="date-picker-input"
                      placeholder="Schedule time"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          )}
          {!!showInput?.isActive && (
            <Col span={24}>
              <Row>
                <Col flex="23px">
                  <PushpinOutlined style={{ marginTop: 9 }} />
                </Col>
                <Col flex="1">
                  <Form.Item name="isActive" initialValue={!!data?.isActive}>
                    <Select>
                      <Select.Option value>
                        <Badge status="success" text="ACTIVE" />
                      </Select.Option>
                      <Select.Option value={false}>
                        <Badge status="error" text="INACTIVE" />
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          )}
          {!!showInput?.status && (
            <Col span={24}>
              <Row>
                <Col flex="23px">
                  <PushpinOutlined style={{ marginTop: 9 }} />
                </Col>
                <Col flex="1">
                  <Form.Item name="status" initialValue={data?.status || EStatusDoc.DRAFT}>
                    <Select>
                      {(statusOption || STATUS_DOCUMENT_SELECT).map((item) => (
                        <Select.Option value={item.value} key={item.key}>
                          <Badge status={item.status} text={item.value.toLocaleUpperCase()} />
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
        <Divider style={{ marginTop: 0, marginBottom: 18 }} />
        <Row justify="space-between">
          <Col>
            {data && onDelete && (
              <Popconfirm
                placement="topRight"
                title="Are you sure?"
                onConfirm={() => {
                  if (onDelete) void onDelete()
                }}
              >
                <Button loading={loadingDelete}>Delete</Button>
              </Popconfirm>
            )}
          </Col>
          <Col>
            {data ? (
              <Button
                type="primary"
                loading={loadingUpdate}
                onClick={() => {
                  if (onUpdate) void onUpdate()
                }}
              >
                Update
              </Button>
            ) : (
              <Button
                type="primary"
                loading={loadingPublish}
                onClick={() => {
                  if (onPublish) void onPublish()
                }}
              >
                Publish
              </Button>
            )}
          </Col>
        </Row>
      </Panel>
    </Collapse>
  )
}

export default ActionPublish
