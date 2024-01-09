/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IConnection {
  query(statement: string, input: any): Promise<any>
  close(): Promise<void>
}
