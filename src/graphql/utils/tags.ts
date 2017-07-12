const tagMatcher = /^(?:@(?:[a-z]+) )+\s?/;

/**
 * A utility function to extract @-prefixed tags from a description string
 */
export function extractTags (description: string | undefined): Set<string> {
  const tags = new Set()
  if (!description) {
    return tags
  }
  const tagMatch = description.match(tagMatcher)
  if (tagMatch && tagMatch.length > 0) {
    tagMatch[0].split(' ').map((tag: string) => tag.trim()).forEach((tag: string) => !!tag && tags.add(tag.replace(/^@/,'')))
  }
  return tags
}

/**
 * A utility function to remove tags from a description, so it can be displayed
 */
export function removeTags (description: string | undefined): string | undefined {
  if (!description) {
    return description
  }
  return description.replace(tagMatcher, '')
}
