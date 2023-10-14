import CreateTaxonomy from '@components/screens/Taxonomy/create'
import { Col } from 'antd'

const pageTitle = 'Create category'

function CreateCategory() {
  return (
    <Col span={24}>
      <CreateTaxonomy postType="POST" pageTitle={pageTitle} categoryPath="/category" />
    </Col>
  )
}

export default CreateCategory
