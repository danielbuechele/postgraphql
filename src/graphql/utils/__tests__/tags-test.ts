import { removeTags, extractTags } from '../tags'

test('tags are removed correctly', () => {
  expect(removeTags(`@deprecated The person's name`)).toBe(`The person's name`)
  expect(removeTags(`@foo @bar Baz`)).toBe(`Baz`)
  expect(removeTags(` @foo @bar Baz`)).toBe(` @foo @bar Baz`)
  expect(removeTags(`@foo  @bar Baz`)).toBe(`@bar Baz`)
  expect(removeTags(`@foo@bar Baz`)).toBe(`@foo@bar Baz`)
  expect(removeTags(`Blah blah @deprecated`)).toBe(`Blah blah @deprecated`)
})

test('tags are extracted correctly', () => {
  function eqSet(set: Set<any>, array: Array<any>): boolean {
    if (set.size !== array.length) {
      return false
    }
    for (let a of array) {
      if (!set.has(a)) {
        return false;
      }
    }
    return true;
  }

  expect(eqSet(extractTags(`@deprecated The person's name`), ['deprecated'])).toBe(true)
  expect(eqSet(extractTags(`@foo @bar Baz`),['foo', 'bar'])).toBe(true)
  expect(eqSet(extractTags(` @foo @bar Baz`), [])).toBe(true)
  expect(eqSet(extractTags(`@foo  @bar Baz`), ['foo'])).toBe(true)
  expect(eqSet(extractTags(`@foo@bar Baz`), [])).toBe(true)
  expect(eqSet(extractTags(`Blah blah @deprecated`), [])).toBe(true)
})
