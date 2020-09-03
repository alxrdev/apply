export function isTokenExpired (token: string): boolean {
  const exp = getTokenExpTime(token)
  const date = new Date()

  if (!exp) return true

  if (exp >= date.getTime()) return true

  return true
}

export function getTokenExpTime (token: string): Number {
  const body = token.split(/\./)[1]
  const buff = Buffer.from(body, 'base64')
  const data = JSON.parse(buff.toString())
  return Number(data.exp) * 1000
}
