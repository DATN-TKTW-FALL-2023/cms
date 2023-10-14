import logger from '@src/libs/logger'
import { EMediaSystem } from '@src/modules'
import { uploadFileBySystem } from '@src/queries/apis'
import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'

// import MediaManagerModal, { THandleMediaManagerModal } from '../MediaManagerModal'

type TTinymceInput = {
  h?: number
  initialValue?: string
  onEditorChange?: (x: any) => void
}

function TinymceInput({ h, onEditorChange, initialValue }: TTinymceInput) {
  const editorRef: any = useRef(null)
  // const mediaManagerModalRef = useRef<null | THandleMediaManagerModal>(null)

  const initTinymce: any = {
    height: h || 500,
    plugins:
      'image code charmap emoticons pagebreak fullscreen preview link codesample media lists anchor autosave save directionality insertdatetime nonbreaking pagebreak quickbars searchreplace table template visualblocks visualchars wordcount',
    mobile: {
      plugins:
        'image code charmap emoticons pagebreak fullscreen preview link codesample media lists tab anchor charmap autosave save charmap directionality hr insertdatetime nonbreaking pagebreak quickbars searchreplace table template visualblocks visualchars wordcount',
    },
    toolbar:
      'undo redo | bold italic underline strikethrough blockquote | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify alignnone | outdent indent lineheight |  numlist bullist | searchreplace spellchecker | forecolor backcolor removeformat casechange formatpainter selectall | pagebreak | charmap emoticons | fullscreen  preview save | code table | insertfile image media template link anchor codesample | visualblocks visualchars wordcount | ltr rtl',
    menubar: true,
    media_advtab: false,
    importcss_append: false,
    selector: 'textarea',
    a11y_advanced_options: true,
    toolbar_mode: 'sliding',
    tinycomments_mode: 'embedded',
    image_advtab: false,
    image_caption: true,
    images_upload_url: ``,
    images_upload_credentials: false,
    image_description: true,

    async images_upload_handler(blobInfo: any) {
      const fmData = new FormData()
      fmData.append('file', blobInfo.blob())
      fmData.append('isWebp', '1')
      try {
        const res: any = await uploadFileBySystem(EMediaSystem.S3, fmData)
        return res.data.location
      } catch (error) {
        logger.debug('images_upload_handler', error)
        return ''
      }
    },
  }

  return (
    <>
      <Editor
        apiKey="41c7vfsdq2y0qjrep4zxtv78r7djjzyoww56rx53b6gidbo7"
        onInit={(_, editor) => {
          editorRef.current = editor
        }}
        initialValue={initialValue}
        onEditorChange={onEditorChange}
        init={initTinymce}
      />
      {/* <MediaManagerModal ref={mediaManagerModalRef} /> */}
    </>
  )
}

export default TinymceInput
