import rss, { pagesGlobToRssItems, type RSSFeedItem } from '@astrojs/rss';

export async function GET(context: { site: any; }) {
  const items: RSSFeedItem[] = (await pagesGlobToRssItems(import.meta.glob('./**/*.md')))
    .map(item => ({
      ...item,
      link: item.link,
      title: item.title,
      pubDate: item.pubDate,
    }));

  return rss({
    title: 'Astro Learner | Blog',
    description: 'My journey learning Astro',
    site: context.site,
    items,
    customData: `<language>en-us</language>`,
  });
}