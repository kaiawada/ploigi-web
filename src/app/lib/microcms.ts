import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
};

export const getBlog = async () => {
  const blogList = await client.getList<Blog>({
    endpoint: 'blogs',
  });

  return blogList.contents;
};

export const getBlogDetail = async (contentId: string) => {
	const detail = await client.get<Blog>({
		endpoint: 'blogs',
		contentId: contentId
	});
	return detail;
};
