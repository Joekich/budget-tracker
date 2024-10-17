/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

type Body = Record<string, any>;
type ErrorCustomFields = Error &
  Partial<{
    body: Body;
    url: string;
    status: number;
  }>;

async function handleResponse({ url, options }: { url: string; options: RequestInit }) {
  const response = await fetch(url, options);

  let errors;

  const responseText = await response.text();
  let body: Body = {};

  try {
    body = JSON.parse(responseText, (key, value) => {
      if (key === 'errors') {
        errors = value;
      }
      return value;
    });
  } catch (err) {
    console.error(err);
  }

  const allOk = response.ok && !errors;

  if (!allOk) {
    const error: ErrorCustomFields = new Error(response.statusText);
    error.url = url;
    error.body = body;
    error.status = response.ok ? 500 : response.status;

    throw error;
  }

  return body;
}

type GraphQLRequest = {
  query: string;
  operationName: string;
  variables?: Record<string, any>;
  extensions?: Record<string, any>;
  http?: Pick<Request, 'url' | 'method' | 'headers'>;
};

type Config = {
  params?: Record<string, any>;
  data?: Record<string, any>;
  gql?: GraphQLRequest | string;
  formData?: FormData;
  json?: boolean;
  headers?: HeadersInit;
  noEncode?: boolean;
  options?: RequestInit;
};

type Method = 'get' | 'post' | 'put' | 'patch' | 'del';

async function generateMethod(
  method: Method,
  path: string,
  { options: _options, params, data, gql, formData, json, headers, noEncode }: Config = {},
) {
  const stringPath = path.toString();
  const url = noEncode ? stringPath : encodeURI(stringPath);
  const options: RequestInit = { method, ..._options };
  const newHeaders = new Headers(headers);

  if (params) {
    newHeaders.set('Content-Type', 'x-www-form-urlencoded');
    options.body = JSON.stringify(params);
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  if (gql) {
    options.body = JSON.stringify(gql);
  }

  if (formData) {
    options.body = formData;
  }

  if (json) {
    newHeaders.set('Content-Type', 'application/json');
  }

  options.headers = newHeaders;
  try {
    return await handleResponse({
      url,
      options,
    });
  } catch (err) {
    console.error(err);

    const error: ErrorCustomFields = new Error(String(err));
    error.url = url;
    error.body = error;
    error.status = 500;

    throw error;
  }
}

export const methods: Record<Method, (path: string, config?: Config) => ReturnType<typeof generateMethod>> = {
  get: async (...args) => generateMethod('get', ...args),
  del: async (...args) => generateMethod('del', ...args),
  put: async (...args) => generateMethod('put', ...args),
  post: async (...args) => generateMethod('post', ...args),
  patch: async (...args) => generateMethod('patch', ...args),
};
