export interface HttpRequest {
  params: {
    [key: string]: string
  },
  query: {
    [key: string]: string
  },
  body: object | object[]
}
