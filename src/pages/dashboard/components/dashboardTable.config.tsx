import { TTaxonomyMakeTree } from '@src/modules'
import { useMutationRemoveFilmById } from '@src/queries/hooks'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom'
import placeholderImage from '@assets/placeholder-image.jpeg'
import { Image, Typography } from 'antd'

export const columnsDashboard = (): ColumnsType<TTaxonomyMakeTree> => {
  const navigate = useNavigate()
  const { mutate } = useMutationRemoveFilmById()
  return [
    {
      title: 'Tên phim',
      dataIndex: 'name',
      key: 'name',
      render(name, record) {
        return (
          <Link to={`/film/${record._id}`}>
            <Typography.Text>{name}</Typography.Text>
          </Link>
        )
      },
    },
    {
      title: 'Ảnh nhỏ',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (v) => <Image width={70} height={70} src={v?.location || placeholderImage} preview />,
    },

    {
      title: 'Tổng số suất chiếu',
      dataIndex: 'totalShowtime',
      key: 'totalShowtime',
      render: (value) => value,
    },
    {
      title: 'Doanh thu phim',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
      render: (value) => value + ' VNĐ',
    },
  ]
}
