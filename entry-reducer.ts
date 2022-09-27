export function transformRouteToEndpoint<T extends Record<string, string>>(
  baseEndpoint: string,
  routeMap: T
) {
  return mapToMap(routeMap, (_, route) => `${baseEndpoint}/${route}`)
}

export function appendUri<T extends Record<string, string>>(
  routeMap: T,
  uri: string
) {
  return mapToMap(routeMap, (_, route) => `${route}/${uri}`)
}

export function mapToMap<T extends Record<string, string>>(
  defaultOptions: T,
  transform = (key: string, value?: string) => `${key}: ${value}`
) {
  return Object.entries(defaultOptions).reduce((output, [key, value]) => {
    output[key] = transform(key, value)
    return output
  }, {}) as T
}
