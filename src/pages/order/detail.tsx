import FormSidebar from '@src/components/layout/FormSidebar'
import HeadHtml from '@src/components/layout/HeadHtml'
import { FORMAT_TIME_DEFAULT } from '@src/configs/const.config'
import { checkAuth } from '@src/libs/localStorage'
import { useQueryOrderById } from '@src/queries/hooks'
import { Button, Card, Col } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { useParams } from 'react-router-dom'
import Order from '.'

const detail = () => {
  const token = checkAuth()
  const { id } = useParams()
  const { data: orderData, isLoading: isOrderLoading } = useQueryOrderById(id || '')

  return (
    <>
      <HeadHtml title="Chi tiết hóa đơn" />
      <Col span={24}>
        <FormSidebar isLoading={isOrderLoading}>
          <>
            <FormSidebar.Content>
              <Card>
                <div className="head-order">
                  <div className="title-order">
                    <h2>HÓA ĐƠN</h2>
                    {orderData?.data?.status == 'completed' ? (
                      <Button type="primary">Đặt thành công</Button>
                    ) : (
                      <Button type="primary" danger>
                        Không thành công
                      </Button>
                    )}
                  </div>
                  <div className="date-order">
                    <div className="detail-date">
                      <p>Ngày tạo hóa đơn:</p>
                      <span>{dayjs(orderData?.data?.createdAt).format(FORMAT_TIME_DEFAULT)}</span>
                    </div>
                  </div>
                </div>
                <div className="between-order">
                  <div className="between-title">
                    <h2>Nhà cung cấp dịch vụ:</h2>
                    <p>MOFY BOOKING COMPANY LTD</p>
                  </div>
                  <div className="between-title">
                    <h2>Thông tin khách hàng:</h2>
                    <p>
                      {orderData?.data?.user?.firstName} {orderData?.data?.user?.lastName}
                    </p>
                    <p>{orderData?.data?.user?.phone}</p>
                    <p>{orderData?.data?.user?.email}</p>
                  </div>
                </div>
                <div className="detail-order">
                  <h2>Chi tiết đơn hàng:</h2>
                  <div className="title-detail">
                    <p>Tên Film</p>
                    <p>Phòng</p>
                    <p>Ghế</p>
                    <p>Thành tiền</p>
                  </div>
                  <div className="text-detail">
                    <p>{orderData?.data?.film}</p>
                    <p>{orderData?.data?.room}</p>
                    <p>{orderData?.data?.seats?.join(', ')}</p>
                    <p>{orderData?.data?.price}đ</p>
                  </div>
                </div>
                <div className="total-order">
                  <div></div>
                  <div className="text-order">
                    <h3>Tổng tiền thanh toán</h3>
                    <p>{orderData?.data?.price}đ</p>
                  </div>
                </div>
              </Card>
            </FormSidebar.Content>
          </>
        </FormSidebar>
      </Col>
    </>
  )
}

export default detail
