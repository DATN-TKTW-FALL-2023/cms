import { FORMAT_TIME_DEFAULT } from '@src/configs/const.config'
import { TTaxonomyMakeTree } from '@src/modules'
import { queryClient } from '@src/queries'
import { useMutationRemoveShowtimeById } from '@src/queries/hooks/showtime'
import { LIST_SHOWTIME } from '@src/queries/keys'
import { Popconfirm, Button, Space, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom'

export const columnsTableShowTime = (): ColumnsType<any> => {
  const navigate = useNavigate()
  const { mutate } = useMutationRemoveShowtimeById()
  return [
    {
      title: 'Phim',
      dataIndex: 'film',
      key: 'film',
      render(film, record) {
        console.log(film)
        return (
          <Link to={`/showtime/${record._id}`}>
            <Typography.Text>{film?.name}</Typography.Text>
          </Link>
        )
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
      title: 'Số ghế đặt / Tổng số ghế',
      key: 'seats',
      render: (value) => `${value.seatsBooked?.length} /${value?.room?.seats?.length}`,
    },
    {
      title: 'Phòng Chiếu',
      key: 'room',
      render: (value) => value.room?.name || '__',
    },
    {
      title: 'Published',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => dayjs(value).format(FORMAT_TIME_DEFAULT),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: TTaxonomyMakeTree) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/showtime/${record._id}`)}>
            Detail
          </Button>
          <Popconfirm
            placement="topRight"
            title="Are you sure?"
            onConfirm={() =>
              mutate(record._id, {
                onSuccess: () => {
                  queryClient.refetchQueries([LIST_SHOWTIME])
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
