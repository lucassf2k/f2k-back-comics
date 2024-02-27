/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ZodError } from 'zod'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '@/domain/errors/ApiError'
import { HttpStatusCodes } from '@/application/enums/HttpStatusCodes'

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next?: NextFunction,
): Response<any, Record<string, any>> => {
  if (error instanceof ApiError) {
    return response.status(error.code).send(error.message)
  }
  if (error instanceof ZodError) {
    return response.status(HttpStatusCodes.BAD_REQUEST).send(error.message)
  }
  console.error(`[${error.name}] - ${error.message}`)
  return response
    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
    .send('Internal server error')
}
