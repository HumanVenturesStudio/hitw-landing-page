import { graphql } from 'gatsby';

export const SiteInfo = graphql`
  fragment SiteInfo on Site {
    siteMetadata {
      defaultTitle: title
      titleTemplate
      defaultDescription: description
      siteUrl: url
      defaultImage: image
      twitterUsername
    }
  }
`;

export const NavInfo = graphql`
  fragment NavInfo on Site {
    siteMetadata {
      navigation {
        header {
          name
          link
        }
        footer {
          name
          link
        }
      }
    }
  }
`;

export const GitInfo = graphql`
  fragment GitInfo on GitBranch {
    name
    commit
  }
`;

export const CTAContent = graphql`
  fragment CTAContent on MarkdownRemark {
    id
    html
    frontmatter {
      label
      url
    }
  }
`;

export const HeroContent = graphql`
  fragment HeroContent on MarkdownRemark {
    id
    html
    frontmatter {
      background
    }
  }
`;

export const CalloutContent = graphql`
  fragment CalloutContent on MarkdownRemark {
    id
    html
    frontmatter {
      name
      format
    }
  }
`;
