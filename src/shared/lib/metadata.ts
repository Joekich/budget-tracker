import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import { type Metadata } from 'next';
import translations from 'shared/constants/translations';
import { getPath, type RoutePaths } from 'shared/routing/paths';
import { z } from 'zod';

import { siteUrl } from '@/config/env';

export const schemaImage = z.object({
  width: z.number(),
  height: z.number(),
  blurHash: z.string().optional(),
  url: z.string(),
  alt: z.string().optional(),
});

export const schemaPageMetadata = z.object({
  image: schemaImage.optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

export const getMetadata = ({
  title = translations.common.seoTitle,
  description = translations.common.seoDescription,
  image: images = {
    url: `${siteUrl}/assets/images/starter-banner.png`,
    width: 1280,
    height: 720,
    alt: 'Wizardry social share image',
  },
  path = 'homepage',
  slug,
  noIndex = false,
}: {
  path?: RoutePaths;
  slug?: string;
  noIndex?: boolean;
} & z.infer<typeof schemaPageMetadata> = {}) => {
  const url = getPath(path, { slug });

  return omitBy<Metadata>(
    {
      metadataBase: new URL(siteUrl),
      title,
      applicationName: title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        siteName: title,
        url,
        description,
        images,
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images,
      },
      icons: {
        icon: [
          { url: '/assets/icons/favicon.ico', sizes: '32x32' },
          { url: '/assets/icons/safari-pinned-tab.svg', type: 'image/svg+xml' },
        ],
        apple: {
          url: '/assets/icons/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      },
      manifest: '/assets/icons/site.webmanifest',
      ...(noIndex && {
        robots: {
          index: false,
          follow: false,
        },
      }),
    },
    isNil,
  );
};
