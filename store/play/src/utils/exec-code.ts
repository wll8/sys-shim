export function execCode(code: string, isAsync: boolean = false): void {
  if (isAsync) {
    eval(`(async () => {
      ${code}
    })()`)
  }
  else {
    eval(code)
  }
}
