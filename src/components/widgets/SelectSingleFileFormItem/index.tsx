import { Button, Card, Col, Form, FormInstance, FormItemProps, Image, Input, Row, Space, Typography } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'
import MediaManagerModal, { THandleMediaManagerModal } from '@components/widgets/MediaManagerModal'
import {
  CloseSquareFilled,
  EditFilled,
  FileExclamationOutlined,
  FileTextOutlined,
  PlaySquareOutlined,
} from '@ant-design/icons'
import { TFile } from '@src/modules'
import placeholderImage from '@assets/placeholder-image.jpeg'
import { regexAudio, regexDocument, regexImage, regexVideo } from '@src/utils/regex'

const { Meta } = Card
const { Text } = Typography

type TSelectSingleFileFormItem<T = any> = {
  form: FormInstance<T>
  initialValue?: TFile
  onFileSelected?: (data: any) => void
}

function SelectSingleFileFormItem({ form, onFileSelected, ...props }: TSelectSingleFileFormItem & FormItemProps) {
  const mediaManagerModalRef = useRef<null | THandleMediaManagerModal>(null)
  const [fileSelected, setFileSelected] = useState<TFile | undefined>(undefined)

  const handleAddFile = (files: TFile) => {
    setFileSelected(files)
  }

  useEffect(() => {
    setFileSelected(props?.initialValue)
  }, [props?.initialValue])

  useEffect(() => {
    if (props?.name) {
      form.setFieldsValue({
        [`${props.name}`]: fileSelected?._id,
      })
      if (onFileSelected) void onFileSelected(fileSelected)
    }
  }, [fileSelected])

  const fileType: 'docx' | 'image' | 'audio' | 'unknown' = useMemo(() => {
    if (fileSelected?.originalname?.match(regexImage)) {
      return 'image'
    }
    if (fileSelected?.originalname?.match(regexDocument)) {
      return 'docx'
    }
    if (fileSelected?.originalname?.match(regexVideo) || fileSelected?.originalname?.match(regexAudio)) {
      return 'audio'
    }
    return 'unknown'
  }, [fileSelected])

  return (
    <Row className="select-single-file-container">
      <Col span={24}>
        {fileSelected ? (
          <Card
            className="card-file-single"
            size="small"
            cover={
              fileType === 'image' && (
                <Row align="middle" justify="center" className="card-file-single-cover">
                  <Col>
                    <Image src={fileSelected?.location || placeholderImage} />
                  </Col>
                </Row>
              )
            }
            extra={
              fileSelected && (
                <Space align="start" size={15}>
                  <EditFilled onClick={() => mediaManagerModalRef.current?.onOpen(true)} />
                  <CloseSquareFilled onClick={() => setFileSelected(undefined)} />
                </Space>
              )
            }
          >
            {fileType === 'image' ? (
              <Meta
                description={
                  <Text ellipsis style={{ fontSize: 12 }}>
                    {fileSelected.name}
                  </Text>
                }
              />
            ) : (
              <Row gutter={[10, 10]} align="middle" wrap={false}>
                <Col flex="23px">
                  {fileType === 'docx' && <FileTextOutlined style={{ fontSize: 16 }} />}
                  {fileType === 'audio' && <PlaySquareOutlined style={{ fontSize: 16 }} />}
                  {fileType === 'unknown' && <FileExclamationOutlined style={{ fontSize: 16 }} />}
                </Col>
                <Col flex="1">
                  <Text ellipsis>{fileSelected.name}</Text>
                </Col>
              </Row>
            )}
          </Card>
        ) : (
          <Space size={10} align="center">
            <Text>No file selected</Text>
            <Button onClick={() => mediaManagerModalRef.current?.onOpen(true)}>Add file</Button>
          </Space>
        )}
      </Col>
      <Form.Item {...props}>
        <Input hidden />
      </Form.Item>
      <MediaManagerModal
        ref={mediaManagerModalRef}
        handleAddFile={(files: TFile[]) => handleAddFile(files?.[0])}
        filesSelectedInit={fileSelected ? [fileSelected] : []}
      />
    </Row>
  )
}

export default SelectSingleFileFormItem
