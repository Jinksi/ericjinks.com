import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SocialMeta = ({
  title,
  url,
  description,
  absoluteImageUrl,
  twitterSiteAccount,
  twitterCreatorAccount,
  pathname,
}) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query DefaultSocialMeta {
      site {
        siteMetadata {
          title
          description
          siteUrl
          socialMediaCard {
            image
            twitterCreatorAccount
            twitterSiteAccount
          }
        }
      }
    }
  `)

  const lang = 'en'
  absoluteImageUrl = new URL(
    absoluteImageUrl || siteMetadata.socialMediaCard.image,
    siteMetadata.siteUrl
  )
  url = pathname ? siteMetadata.siteUrl + pathname : siteMetadata.siteUrl

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      titleTemplate={`%s — ${siteMetadata.title}`}
      defaultTitle={siteMetadata.title}
    >
      <title>{title}</title>
      <meta
        name="description"
        content={description || siteMetadata.description}
      />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta
        property="og:description"
        content={description || siteMetadata.description}
      />
      {absoluteImageUrl && (
        <meta property="og:image" content={absoluteImageUrl} />
      )}
      {absoluteImageUrl && (
        <meta property="twitter:image" content={absoluteImageUrl} />
      )}
      <meta
        name="twitter:description"
        content={description || siteMetadata.description}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:site"
        content={siteMetadata.socialMediaCard.twitterSiteAccount}
      />
      <meta
        name="twitter:creator"
        content={siteMetadata.socialMediaCard.twitterCreatorAccount}
      />
    </Helmet>
  )
}
export default SocialMeta
