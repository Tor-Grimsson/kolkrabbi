import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { client as sanityClient } from "@lib/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

// This query fetches the 2 most recent posts that have a slug
const POSTS_QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...2]{
  _id,
  title,
  slug,
  publishedAt,
  body,
  mainImage{
    asset->{
      _id,
      url
    }
  }
}`;

const CmsCard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the posts from Sanity
    sanityClient
      .fetch(POSTS_QUERY)
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  return (
    <section>
      <div className="bg-blue-500 w-full h-[40vh]"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {posts &&
          posts.map((post) => (
            <Link
              to={`/${post.slug.current}`}
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {post.mainImage && (
                <img
                  className="w-full h-48 object-cover"
                  src={urlFor(post.mainImage).width(400).height(300).url()}
                  alt={`Cover image for ${post.title}`}
                />
              )}
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
                <div className="prose prose-sm max-w-none mt-4 text-gray-700 line-clamp-3">
                  {post.body && <PortableText value={post.body} />}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default CmsCard;
