import HeadHtml from '@components/layout/HeadHtml'
import TaxonomyScreen from '@components/screens/Taxonomy'
import PageHeader from '@components/widgets/PageHeader'
import { Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'

function Category() {
  const navigate = useNavigate()
  return (
    <Col span={24}>
      <HeadHtml title="Categories" />
      <PageHeader
        title="Categories"
        extra={[{ text: 'Create', action: () => navigate('/create-category') }]}
        isSearch={false}
      />
      <Row>
        <TaxonomyScreen postType="POST" prefixDetailUrl="detail-category" />
      </Row>
    </Col>
  )
}

export default Category
