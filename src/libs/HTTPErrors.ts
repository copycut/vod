export interface JSONError {
  error: {
    code: string
    message: string
    description: string
  }
}

export interface HTTPError extends Error {
  message: string
  name: string
  code: string
  status: number
  description: string

  toJSON(): JSONError
}

export class HTTPErrorBase extends Error implements HTTPError {
  public message: string
  public name: string
  public code: string
  public status: number
  public description: string

  protected constructor(
    status: number,
    code: string,
    message: string,
    description: string
  ) {
    super(message)
    this.message = message
    this.name = this.constructor.name
    this.code = code
    this.status = status
    this.description = description
  }

  public toJSON(): JSONError {
    return {
      error: {
        code: this.code,
        message: this.message,
        description: this.description,
      },
    }
  }
}

export class HTTPErrorNotFound extends HTTPErrorBase {
  public constructor(description: string) {
    super(404, 'E_NOT_FOUND', 'Not Found', description)
  }
}

export class HTTPErrorMovedPermanently extends HTTPErrorBase {
  public constructor(url: string) {
    super(301, 'E_MOVED_PERMANENTLY', 'Moved Permanently', url)
  }
}

export class HTTPErrorInternal extends HTTPErrorBase {
  public constructor(error: Error, message?: string) {
    super(500, 'E_INTERNAL', 'Internal Error', message || error.message)
    this.stack = error.stack
  }
}

export class HTTPErrorUnauthorized extends HTTPErrorBase {
  public constructor(description: string) {
    super(401, 'E_UNAUTHORIZED', 'Unauthorized', description)
  }
}
