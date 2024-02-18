import { expect, it } from 'vitest'
import { sum } from '../src/utils/sum'

it('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
