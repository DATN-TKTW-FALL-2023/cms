import { Button, Col, Form, FormInstance, FormItemProps, Image, Input, Row } from 'antd'
import { useEffect, useRef, useState } from 'react'
import MediaManagerModal, { THandleMediaManagerModal } from '@components/widgets/MediaManagerModal'
import { CloseSquareFilled, FileExclamationOutlined, FileTextOutlined, PlaySquareOutlined } from '@ant-design/icons'
import { TFile } from '@src/modules'
import placeholderImage from '@assets/placeholder-image.jpeg'
import { regexAudio, regexDocument, regexImage, regexVideo } from '@src/utils/regex'

type TSelectMultipleFileFormItem<T = any> = {
  form: FormInstance<T>
  h?: number
  initialValue?: TFile[]
  onFileSelected?: (data: any) => void
}

function SelectMultipleFileFormItem({
  form,
  h = 400,
  onFileSelected,
  ...props
}: TSelectMultipleFileFormItem & FormItemProps) {
  const mediaManagerModalRef = useRef<null | THandleMediaManagerModal>(null)
  const [filesSelected, setFilesSelected] = useState<TFile[] | undefined>(undefined)

  const handleAddFile = (files: TFile[]) => {
    setFilesSelected(files)
  }

  useEffect(() => {
    setFilesSelected(props?.initialValue)
  }, [props?.initialValue])

  useEffect(() => {
    if (props?.name)
      form.setFieldsValue({
        [`${props?.name}`]: filesSelected?.map((item) => item?._id),
      })
    if (onFileSelected) void onFileSelected(filesSelected)
  }, [filesSelected])

  const handleCloseFile = (fileID: string) => {
    setFilesSelected((old) => old?.filter((f) => f._id !== fileID))
  }

  return (
    <Row className="select-multiple-file-container">
      <Col span={24} className="file-selected">
        <Row>
          <Col span={24} className="file-selected-view" style={{ height: h }}>
            <Row gutter={[10, 10]}>
              {filesSelected &&
                filesSelected?.length > 0 &&
                filesSelected?.map((file, index) => {
                  let fileType = 'unknown'
                  if (file?.originalname?.match(regexImage)) {
                    fileType = 'image'
                  }
                  if (file?.originalname?.match(regexDocument)) {
                    fileType = 'docx'
                  }
                  if (file?.originalname?.match(regexVideo) || file?.originalname?.match(regexAudio)) {
                    fileType = 'audio'
                  }

                  return (
                    <Col xxl={2} xl={3} lg={6} md={8} sm={12} xs={12} className="image-view-item" key={index}>
                      {fileType === 'image' && (
                        <Image wrapperClassName="image-ant" src={file?.location || placeholderImage} />
                      )}
                      {fileType === 'docx' && (
                        <Row className="image-ant">
                          <FileTextOutlined style={{ fontSize: 80 }} />
                        </Row>
                      )}
                      {fileType === 'audio' && (
                        <Row className="image-ant">
                          <PlaySquareOutlined style={{ fontSize: 80 }} />
                        </Row>
                      )}
                      {fileType === 'unknown' && (
                        <Row className="image-ant">
                          <FileExclamationOutlined style={{ fontSize: 80 }} />
                        </Row>
                      )}
                      <CloseSquareFilled className="close-image-view" onClick={() => handleCloseFile(file._id)} />
                    </Col>
                  )
                })}
            </Row>
          </Col>
          <Col span={24} className="file-selected-control">
            <Row justify="end">
              <Button onClick={() => mediaManagerModalRef.current?.onOpen(true)}>Add to gallery</Button>
            </Row>
          </Col>
        </Row>
      </Col>
      <Form.Item {...props}>
        <Input hidden />
      </Form.Item>
      <MediaManagerModal
        isMultiselect
        ref={mediaManagerModalRef}
        handleAddFile={(files: TFile[]) => {
          void handleAddFile(files)
          if (onFileSelected) void onFileSelected(files)
        }}
        filesSelectedInit={filesSelected}
      />
    </Row>
  )
}

export default SelectMultipleFileFormItem
