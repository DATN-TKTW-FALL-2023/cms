import { FORMAT_TIME_DEFAULT } from '@src/configs/const.config'
import { TTaxonomyMakeTree } from '@src/modules'
import { queryClient } from '@src/queries'
import { useMutationRemoveOrderById, useMutationUpdateOrderById } from '@src/queries/hooks'
import { LIST_ORDER } from '@src/queries/keys'
import { Popconfirm, Button, Space, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom'

export const columnsTableOrder = (): ColumnsType<any> => {
  const navigate = useNavigate()
  const { mutate: mutateDelete } = useMutationRemoveOrderById()
  const { mutate: mutateApprove } = useMutationUpdateOrderById()

  return [
    {
      title: 'Phim',
      key: 'film',
      render(value, record) {
        return <Typography.Text>{value?.film}</Typography.Text>
      },
    },
    {
      title: 'Giờ chiếu',
      key: 'startHour',
      render: (v) => dayjs(v.startHour).format(FORMAT_TIME_DEFAULT) || '__',
    },
    {
      title: 'Giờ kết thúc',
      key: 'endHour',
      render: (v) => dayjs(v.endHour).format(FORMAT_TIME_DEFAULT) || '__',
    },
    {
      title: 'Ghế',
      key: 'seats',
      render: (value) => value.seats.join(', '),
    },
    {
      title: 'Phòng Chiếu',
      key: 'room',
      render: (value) => value.room || '__',
    },
    {
      title: 'Published',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => dayjs(value).format(FORMAT_TIME_DEFAULT),
    },
    {
      title: 'Người đặt',
      dataIndex: 'user',
      key: 'user',
      render: (value) => value?.username || '__',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (value) => value || '__',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: TTaxonomyMakeTree) => (
        <Space>
          <Popconfirm
            placement="topRight"
            title="Are you sure?"
            onConfirm={() =>
              mutateDelete(record._id, {
                onSuccess: () => {
                  queryClient.refetchQueries([LIST_ORDER])
                },
              })
            }
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]
}
