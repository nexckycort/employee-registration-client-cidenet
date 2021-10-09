interface ParsedQuery<T = unknown> {
  [key: string]: T | T[] | null
}

const queryString = {
  parse(query: string): ParsedQuery {
    if (query.length === 0) return {}
    const search = query.substring(1)
    let obj!: Record<string, unknown>
    try {
      obj = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
        return key === '' ? value : decodeURIComponent(value)
      })
    } catch (error: any) {
      obj = {
        error: error.message
      }
    }
    return obj
  }
}

export default queryString
