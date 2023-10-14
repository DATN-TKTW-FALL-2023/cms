import TaxonomyDetail from '@components/screens/Taxonomy/detail'
import { Col } from 'antd'

const pageTitle = 'Detail category'

function CategoryDetail() {
  return (
    <Col span={24}>
      <TaxonomyDetail postType="POST" pageTitle={pageTitle} />
    </Col>
  )
}

export default CategoryDetail
