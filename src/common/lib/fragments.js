import { graphql } from 'gatsby';

export const SiteInfo = graphql`
  fragment SiteInfo on Site {
    siteMetadata {
      url
      title
      description
      keywords
      twitter
      image {
        src
        width
        height
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

export const NavigationContent = graphql`
  fragment NavigationContent on MarkdownRemark {
    id
    frontmatter {
      hide
      links {
        label
        url
      }
    }
  }
`;

export const LogoContent = graphql`
  fragment LogoContent on MarkdownRemark {
    id
    frontmatter {
      hide
      asset
    }
  }
`;

export const HeroContent = graphql`
  fragment HeroContent on MarkdownRemark {
    id
    html
    frontmatter {
      hide
      fullScreen
      name
      background
      ctaLabel
      ctaUrl
    }
  }
`;

export const CalloutContent = graphql`
  fragment CalloutContent on MarkdownRemark {
    id
    html
    frontmatter {
      hide
      name
      background
      format
      hide
    }
  }
`;

export const SuccessContent = graphql`
  fragment SuccessContent on MarkdownRemark {
    id
    html
    frontmatter {
      name
      redirect
    }
  }
`;

export const HeaderContent = graphql`
  fragment HeaderContent on MarkdownRemark {
    id
    html
    frontmatter {
      hide
      name
    }
  }
`;

export const FooterContent = graphql`
  fragment FooterContent on MarkdownRemark {
    id
    html
    frontmatter {
      hide
      name
    }
  }
`;

export const ConversionContent = graphql`
  fragment ConversionContent on MarkdownRemark {
    id
    html
    frontmatter {
      hide
      name
      submitLabel
      useCustom
      heading
      labels {
        first
        last
        email
      }
    }
  }
`;
