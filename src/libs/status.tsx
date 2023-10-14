import { EStatusDoc } from '@src/configs/interface.config'
import { Badge } from 'antd'

export function fnStatusBadge(status: EStatusDoc | string): JSX.Element {
  switch (status) {
    case EStatusDoc.ACTIVE:
      return <Badge status="success" text={status.toLocaleUpperCase()} />
    case EStatusDoc.INACTIVE:
      return <Badge status="error" text={status.toLocaleUpperCase()} />
    case EStatusDoc.PENDING:
      return <Badge status="processing" text={status.toLocaleUpperCase()} />
    case EStatusDoc.DRAFT:
      return <Badge status="default" text={status.toLocaleUpperCase()} />
    default:
      return <Badge status="warning" text={status.toLocaleUpperCase()} />
  }
}
