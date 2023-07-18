import { SitemapStream, streamToPromise } from "sitemap";
import type { NextApiRequest, NextApiResponse } from "next";
import instance from "~/apis/axios-instance";

interface Param {
  params: {
    slug: string;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    });

    // List of posts
    const products: Param[] = await instance.get("/api/products/static-paths");

    products.map((product) => {
      smStream.write({
        url: `/${product.params.slug}`,
        changefreq: "daily",
        priority: 0.9,
      });
    });

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
