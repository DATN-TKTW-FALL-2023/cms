import { Col } from 'antd'
import HeadHtml from '@components/layout/HeadHtml'
import MediaScreen from '@components/screens/Media'

function Media() {
  return (
    <Col span={24}>
      <HeadHtml title="Media" />
      <MediaScreen />
    </Col>
  )
}

export default Media
