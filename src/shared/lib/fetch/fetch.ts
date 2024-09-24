import isEmpty from 'lodash/isEmpty';

type Url = RequestInfo | URL;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Body = string | Record<string, any>;
type ErrorCustomFields = Partial<{
  body: Body;
  url: Url;
  status: number;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleResponse({ url, options }: { url: Url; options: RequestInit }): Promise<any> {
  const response = await fetch(url, options);

  let errors;

  let body: Body = await response.text();

  try {
    body = JSON.parse(body);
    if (typeof body === 'object' && !isEmpty(body.errors)) {
      errors = body.errors;
    }
  } catch (err) {
    console.error(err);
  }

  const allOk = response.ok && !errors;

  if (!allOk) {
    const error: Error & ErrorCustomFields = new Error(response.statusText);
    error.url = url;
    error.body = body;
    error.status = response.ok ? 500 : response.status;

    throw error;
  }

  return body;
}

type Config = {
  params?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  formData?: FormData;
  json?: boolean;
  headers?: HeadersInit;
  noEncode?: boolean;
  options?: RequestInit;
};

type Method = 'get' | 'post' | 'put' | 'patch' | 'del';

async function generateMethod(
  method: Method,
  path: Url,
  { options: _options, params, data, formData, json, headers, noEncode }: Config = {},
) {
  const url: Url = noEncode ? path.toString() : encodeURI(path.toString());
  const options: RequestInit = { method, ..._options };
  const newHeaders = new Headers(headers);

  if (params) {
    newHeaders.set('Content-Type', 'x-www-form-urlencoded');
    options.body = JSON.stringify(params);
  }

  if (data) {
    options.body = JSON.stringify(data);
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

    const error: Error & ErrorCustomFields = new Error(String(err));
    error.url = url;
    error.body = error;
    error.status = 500;

    throw error;
  }
}

export const methods: Record<Method, (path: Url, config?: Config) => ReturnType<typeof generateMethod>> = {
  get: (path, options) => generateMethod('get', path, options),
  del: (path, options) => generateMethod('del', path, options),
  put: (path, options) => generateMethod('put', path, options),
  post: (path, options) => generateMethod('post', path, options),
  patch: (path, options) => generateMethod('patch', path, options),
};
