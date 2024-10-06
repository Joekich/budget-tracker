import type { MetadataRoute } from 'next';

import { siteUrl } from '@/config/env';

import { checkResponseData } from '../shared/lib/fetch/check-response-data';
import { methods as sitemapApi } from './model/sitemap.fetch';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = checkResponseData(await sitemapApi.get());
  return data.map(({ url, lastModified, priority }) => ({
    url: siteUrl + url,
    lastModified,
    priority,
  }));
}
