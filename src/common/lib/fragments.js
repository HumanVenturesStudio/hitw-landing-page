import { graphql } from 'gatsby';

export const fragmentGit = graphql`
  fragment GitInfo on GitBranch {
    name
    commit
  }
`;

export const fragmentCTA = graphql`
  fragment CTAContent on MarkdownRemark {
    id
    html
    frontmatter {
      label
      url
    }
  }
`;

export const fragmentHero = graphql`
  fragment HeroContent on MarkdownRemark {
    id
    html
    frontmatter {
      background
    }
  }
`;
