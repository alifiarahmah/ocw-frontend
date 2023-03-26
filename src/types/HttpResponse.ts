export enum HttpResponse {
  Ok = 200,
  Created = 201,
  Accepted = 202,

  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  UnprocessableEntity = 422,
  TooEarly = 425,

  InternalServerError = 500,
}
