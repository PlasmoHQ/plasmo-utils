export function transformRouteToEndpoint<T extends Record<string, string>>(
  baseEndpoint: string,
  routeMap: T
) {
  return Object.entries(routeMap).reduce((endpointOutput, [key, route]) => {
    endpointOutput[key] = `${baseEndpoint}/${route}`
    return endpointOutput
  }, {}) as T
}

export function appendUri<T extends Record<string, string>>(
  routeMap: T,
  uri: string
) {
  return Object.entries(routeMap).reduce((endpointOutput, [key, route]) => {
    endpointOutput[key] = `${route}/${uri}`
    return endpointOutput
  }, {}) as T
}
