export function valueToSize(value: number | string) {
  if (typeof value === 'number')
    return `${value}px`
  return value
}
