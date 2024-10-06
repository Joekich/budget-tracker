import { requestHandler } from 'shared/lib/fetch';

import { sitemapMock } from './sitemap.mock';
import { schemaSitemap, type SitemapProps } from './sitemap.types';
// import { fetch } from "shared/lib/fetch";

const get = async () => {
  const { data, errorCode } = await requestHandler<SitemapProps>(
    // Fetch - Choose your favourite or try our
    // async () => {
    //     const response = await fetch.get(
    //       'https://jsonplaceholder.typicode.com/posts',
    //       {
    //         headers: {Authorization: ''},
    //         json: true,
    //         // data: {
    //         //   query: '',
    //         //   variables: {},
    //         //   operationName: "getSitemap",
    //         // },
    //       },
    //     );
    //   return schemaSitemap.parse(response);
    //   },

    // Mock
    () => schemaSitemap.parse(sitemapMock),
    'sitemap',
  );

  // Here you can modify data
  return { data, errorCode };
};

export const methods = {
  get,
};
