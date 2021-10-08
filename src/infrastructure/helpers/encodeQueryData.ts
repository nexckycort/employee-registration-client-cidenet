export const encodeQueryData = (obj: object): string => {
  const params = new URLSearchParams()
  Object.entries(obj).forEach(([key, value]) => {
    params.append(key, value as string)
  })
  return params.toString()
}
