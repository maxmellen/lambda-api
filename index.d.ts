import {
  APIGatewayEvent,
  APIGatewayEventRequestContext,
  Context
} from 'aws-lambda';

export declare interface CookieOptions {
  domain?: string;
  expires?: Date;
  httpOnly?: boolean;
  maxAge?: number;
  path?: string;
  secure?: boolean;
  sameSite?: boolean | 'Strict' | 'Lax';
}

export declare interface CorsOptions {
  credentials?: boolean;
  exposeHeaders?: string;
  headers?: string;
  maxAge?: number;
  methods?: string;
  origin?: string;
}

export declare interface FileOptions {
  maxAge?: number;
  root?: string;
  lastModified?: boolean | string;
  headers?: {};
  cacheControl?: boolean | string;
  private?: boolean;
}

export declare interface App {
  [namespace: string]: HandlerFunction;
}

export declare type Middleware = (req: Request, res: Response, next: NextFunction) => void;
export declare type ErrorHandlingMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => void;
export declare type ErrorCallback = (error?: Error) => void;
export declare type RoutingFunction = (api: API, opts?: object) => void;
export declare type HandlerFunction = (req?: Request, res?: Response, next?: NextFunction) => void | {} | Promise<{}>;
export declare type LoggerFunction = (message: string) => void;
export declare type NextFunction = () => void;
export declare type TimestampFunction = () => string;
export declare type SerializerFunction = (body: object) => string;
export declare type FinallyFunction = (req: Request, res: Response) => void;
export declare type METHODS = 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE'
    | 'OPTIONS'
    | 'HEAD'
    | 'ANY';

export declare interface SamplingOptions {
  route?: string;
  target?: number;
  rate?: number
  period?: number;
  method?: string | string[];
}

export declare interface LoggerOptions {
  access?: boolean | string;
  customKey?: string;
  detail?: boolean;
  level?: string;
  levels?: {
    [key: string]: string;
  };
  messageKey?: string;
  nested?: boolean;
  timestamp?: boolean | TimestampFunction;
  sampling?: {
    target?: number;
    rate?: number;
    period?: number;
    rules?: SamplingOptions[];
  };
  serializers?: {
    [name: string]: (req: Request) => {};
  };
  stack?: boolean;
}

export declare interface Options {
  base?: string;
  callbackName?: string;
  logger?: boolean | LoggerOptions;
  mimeTypes?: {
    [key: string]: string;
  };
  serializer?: SerializerFunction;
  version?: string;
}

export declare interface RegisterOptions extends Options {
  prefix?: string;
}

export declare interface Route {
  vars: {[key: string]: string};
  stack: HandlerFunction[];
  inherited?: HandlerFunction[];
  route: string;
  path: string;
}

export declare class Request {
  app: API;
  version: string;
  id: string;
  params: {};
  method: string;
  path: string;
  query: {
    [key: string]: string;
  };
  headers: {
    [key: string]: string;
  };
  rawHeaders?: {};
  body: {} | string;
  rawBody: string;
  route: '';
  requestContext: APIGatewayEventRequestContext;
  isBase64Encoded: boolean;
  pathParameters: { [name: string]: string } | null;
  stageVariables: { [name: string]: string } | null;
  auth: {
    [key: string]: any;
    type: 'Bearer' | 'Basic' | 'OAuth' | 'Digest';
    value: string;
  };
  cookies: {
    [key: string]: CookieOptions;
  };
  context: Context;
  coldStart: boolean;
  requestCount: number;
  ip: string;
  userAgent: string;
  clientType: 'desktop' | 'mobile' | 'tv' | 'tablet' | 'unknown';
  clientCountry: string;

  log: {
    trace: LoggerFunction;
    debug: LoggerFunction;
    info: LoggerFunction;
    warn: LoggerFunction;
    error: LoggerFunction;
    fatal: LoggerFunction;
  };
}

export declare class Response {
  status(code: number): this;
  header(key: string, value: string): this;
  getHeader(key: string): string;
  hasHeader(key: string): boolean;
  removeHeader(key: string): this;
  getLink(s3Path: string, expires?: number, callback?: (err, data) => void);
  send(body: any): void;
  json(body: any): void;
  jsonp(body: any): void;
  html(body: any): void;
  type(type: string): void;
  location(path: string): this;
  redirect(status: number, path: string): void;
  redirect(path: string): void;
  cors(options: CorsOptions): this;
  error(message: string, detail?: any);
  error(code: number, message: string, detail?: any);
  cookie(name: string, value: string, options?: CookieOptions): this;
  clearCookie(name: string, options?: CookieOptions): this;
  etag(enable?: boolean): this;
  cache(age?: boolean | number | string, private?: boolean): this;
  modified(date: boolean | string | Date): this;
  attachment(fileName?: string): this;
  download(file: string | Buffer, fileName?: string, options?: FileOptions, callback?: ErrorCallback);
  sendFile(file: string | Buffer, options?: FileOptions, callback?: ErrorCallback);
}

export declare class API {
  app(namespace: string, handler: HandlerFunction): App;
  app(options: App): App;

  get(path: string, ...handler: HandlerFunction[]): void;
  get(...handler: HandlerFunction[]): void;
  post(path: string, ...handler: HandlerFunction[]): void;
  post(...handler: HandlerFunction[]): void;
  put(path: string, ...handler: HandlerFunction[]): void;
  put(...handler: HandlerFunction[]): void;
  patch(path: string, ...handler: HandlerFunction[]): void;
  patch(...handler: HandlerFunction[]): void;
  delete(path: string, ...handler: HandlerFunction[]): void;
  delete(...handler: HandlerFunction[]): void;
  options(path: string, ...handler: HandlerFunction[]): void;
  options(...handler: HandlerFunction[]): void;
  head(path: string, ...handler: HandlerFunction[]): void;
  head(...handler: HandlerFunction[]): void;
  any(path: string, ...handler: HandlerFunction[]): void;
  any(...handler: HandlerFunction[]): void;
  METHOD(method: METHODS, path: string, ...handler: HandlerFunction[]): void;
  METHOD(method: METHODS, ...handler: HandlerFunction[]): void;




  use(path: string, ...middleware: Middleware[]);
  use(paths: string[], ...middleware: Middleware[]);
  use (...middleware: Middleware[]);
  use (...errorHandlingMiddleware: ErrorHandlingMiddleware[]);

  finally(callback: FinallyFunction): void;
  
  register(fn: RoutingFunction, opts?: RegisterOptions): void;

  run(event: APIGatewayEvent, context: Context, cb: (err: Error, result: any) => void): void;
  run(event: APIGatewayEvent, context: Context): Promise<any>;
}

export declare class RouteError extends Error {
  constructor(message: string, path: string);
}

export declare class MethodError extends Error {
  constructor(message: string, method: METHODS, path: string);
}

export declare class ConfigurationError extends Error {
  constructor(message: string);
}

export declare class ResponseError extends Error {
  constructor(message: string, code: number);
}

export declare class FileError extends Error {
  constructor(message: string, err: object);
}

declare function createAPI(options?: Options): API;

export default createAPI;
