import { removeTags, extractTags } from '../tags'

test('tags are removed correctly', () => {
  expect(removeTags(`@deprecated Persons now have first and last name\nThe person's name`)).toBe(`The person's name`)
  expect(removeTags(`@deprecated Persons now have first and last name`)).toBe(``)
  expect(removeTags(`@foo\n@bar\nBaz`)).toBe(`Baz`)
  expect(removeTags(` @foo @bar\nBaz`)).toBe(` @foo @bar\nBaz`)
  expect(removeTags(`@foo\n @bar\nBaz`)).toBe(` @bar\nBaz`)
  expect(removeTags(`@foo@bar Baz`)).toBe(`@foo@bar Baz`)
  expect(removeTags(`Blah blah @deprecated`)).toBe(`Blah blah @deprecated`)
  expect(removeTags(`Blah blah\n@deprecated`)).toBe(`Blah blah\n@deprecated`)
})

test('tags are extracted correctly', () => {
  expect(extractTags(`@deprecated Persons now have first and last name\nThe person's name`)).toEqual({deprecated: "Persons now have first and last name"})
  expect(extractTags(`@deprecated Persons now have first and last name`)).toEqual({deprecated: "Persons now have first and last name"})
  expect(extractTags(`@foo\n@bar\nBaz`)).toEqual({foo: true, bar: true})
  expect(extractTags(` @foo @bar\nBaz`)).toEqual({})
  expect(extractTags(`@foo\n @bar\nBaz`)).toEqual({foo: true})
  expect(extractTags(`@foo@bar Baz`)).toEqual({})
  expect(extractTags(`Blah blah @deprecated`)).toEqual({})
  expect(extractTags(`Blah blah\n@deprecated`)).toEqual({})
})
