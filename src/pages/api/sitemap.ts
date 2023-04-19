import { SitemapStream, streamToPromise } from "sitemap";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    });

    // List of posts
    /* const posts = (await getProducts()).map((i) => {
      return {
        slug: i.params.slug,
      };
    }); */

    // Create each URL row
    /*  posts.forEach((post) => {
      smStream.write({
        url: `/${post.slug}`,
        changefreq: "daily",
        priority: 0.9,
      });
    }); */

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      "Content-Type": "application/xml",
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
};
