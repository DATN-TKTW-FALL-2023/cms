import { Helmet } from 'react-helmet-async'
import favicon from '@assets/favicon.ico'
import ogImage from '@assets/screenshort.jpg'

function HeadHtml({ title = 'home', url = window.location.hostname }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title} | CORE - CMS</title>
      <meta name="description" content="Designed and Developer by Mofy" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:url" content={url || window.location.hostname} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content="Designed and Developed by Twinger" />
      <meta name="twitter:card" content={ogImage} />
      <meta name="twitter:image" content={ogImage} />
      <meta property="og:image" content={ogImage} />
      <link rel="icon" href="https://res.cloudinary.com/dxzkcrvi0/image/upload/v1698915029/fav-03_qs3hub.svg" />
    </Helmet>
  )
}

export default HeadHtml
