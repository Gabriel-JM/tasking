import { HttpResponseData, RequestErrorDescription } from '../../protocols/infra'

export class HttpResponse {
  static ok(body: object | object[]) {
    return <HttpResponseData> {
      status: 200,
      body
    }
  }

  static badRequest(error: RequestErrorDescription) {
    return <HttpResponseData> {
      status: 400,
      body: error
    }
  }

  static notFound(error: RequestErrorDescription) {
    return <HttpResponseData> {
      status: 404,
      body: error
    }
  }

  static notAcceptable(error: RequestErrorDescription) {
    return <HttpResponseData> {
      status: 406,
      body: error
    }
  }

  static serverError(error: RequestErrorDescription) {
    return <HttpResponseData> {
      status: 500,
      body: error
    }
  }
}
