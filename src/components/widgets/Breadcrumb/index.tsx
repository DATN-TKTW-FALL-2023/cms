import { Breadcrumb as BreadcrumbAntd } from 'antd'
import { Link, useLocation } from 'react-router-dom'

function Breadcrumb() {
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter((i) => i)
  const breadcrumbItem = pathSnippets.map((path, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return (
      <BreadcrumbAntd.Item key={url}>
        <Link to={url}>{path}</Link>
      </BreadcrumbAntd.Item>
    )
  })

  const breadcrumbItems = [
    <BreadcrumbAntd.Item key="home">
      <Link to="/">Dashboard</Link>
    </BreadcrumbAntd.Item>,
  ].concat(breadcrumbItem)

  return <BreadcrumbAntd>{breadcrumbItems}</BreadcrumbAntd>
}

export default Breadcrumb
