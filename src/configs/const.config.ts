import { FormLabelAlign } from 'antd/es/form/interface'
import { ColProps } from 'antd'

import { ELanguage, EStatusDoc, TStatusDoc } from './interface.config'

export const ROLE_INIT = ['ADMINISTRATOR', 'EDITOR', 'GUEST']

export const FORMAT_TIME_DEFAULT = 'YYYY-MM-DD HH:mm:ss'

export const FOLDER_ROOT_ID = '637538b18bb90293ce4a39dd'
export const TAXONOMY_ROOT_ID = '60ab1c94c974f54870e9e64c'
export const NSuccess = 'Notification Success'
export const NError = 'Notification Error'
export const NWarning = 'Notification Warning'
export const LANGUAGE_DEFAULT = ELanguage.EN

export const labelStyle: { labelAlign: FormLabelAlign; labelCol: ColProps } = {
  labelCol: { span: 5 },
  labelAlign: 'left',
}
export const labelStyleSpan20 = {
  ...labelStyle,
  labelCol: { span: 20 },
}

export const labelChildren: { labelAlign: FormLabelAlign; labelCol: ColProps } = {
  ...labelStyle,
  labelAlign: 'right',
}

export const STATUS_DOCUMENT_SELECT: TStatusDoc[] = [
  { key: 1, value: EStatusDoc.ACTIVE, status: 'success' },
  { key: 2, value: EStatusDoc.INACTIVE, status: 'error' },
  { key: 3, value: EStatusDoc.DRAFT, status: 'default' },
]

export const STATUS_PRODUCT_SELECT: TStatusDoc[] = [
  ...STATUS_DOCUMENT_SELECT,
  { key: 4, value: EStatusDoc.PENDING, status: 'processing' },
]

export const STATUS_DOCUMENT_FILTER: {
  text: string
  value: EStatusDoc
}[] = [
  { text: EStatusDoc.ACTIVE.toLocaleUpperCase(), value: EStatusDoc.ACTIVE },
  { text: EStatusDoc.INACTIVE.toLocaleUpperCase(), value: EStatusDoc.INACTIVE },
  { text: EStatusDoc.DRAFT.toLocaleUpperCase(), value: EStatusDoc.DRAFT },
]

export const STATUS_PRODUCT_FILTER: {
  text: string
  value: EStatusDoc
}[] = [...STATUS_DOCUMENT_FILTER, { text: EStatusDoc.PENDING.toLocaleUpperCase(), value: EStatusDoc.PENDING }]
