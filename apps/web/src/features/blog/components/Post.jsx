
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client as sanityClient } from "@lib/sanity/client.js";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

function Post() {
  const [postData, setPostData] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == $slug]{
          title,
          slug,
          publishedAt,
          mainImage{
            asset->{
              _id,
              url
             }
           },
          image{
            asset->{
              _id,
              url
            }
          },
         relatedImage{
           asset->{
             _id,
             url
           }
         },
         body,
        "name": author->name,
        "authorImage": author->image{
          asset->{
            _id,
            url
          }
        }
       }`,
        { slug }
      )
      .then((data) => setPostData(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!postData) {
    return (
      <div className="min-h-screen bg-blue-50 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="font-general text-lg font-semibold text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Header */}
      <header className="relative bg-blue-300 text-blue-50 py-16 px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <p className="font-general text-sm uppercase tracking-wide opacity-90 mb-4">
              {postData.publishedAt && new Date(postData.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <h1 className="font-general text-4xl md:text-6xl font-black mb-6 leading-tight">
              {postData.title}
            </h1>

            {/* Author Info */}
            {postData.name && (
              <div className="flex items-center justify-center space-x-4">
                {postData.authorImage && (
                  <img
                    src={urlFor(postData.authorImage).width(60).height(60).url()}
                    alt={postData.name}
                    className="w-12 h-12 rounded-full border-2 border-blue-50"
                  />
                )}
                <p className="font-general text-lg font-medium">{postData.name}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {(postData.mainImage || postData.image) && (
        <section className="relative -mt-8 px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={postData.mainImage ? urlFor(postData.mainImage).width(1200).url() : urlFor(postData.image).width(1200).url()}
                alt={postData.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="container mx-auto max-w-4xl px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none font-general">
              <PortableText
                value={postData.body}
                components={{
                  block: {
                    normal: ({children}) => <p className="font-general text-lg leading-relaxed mb-6 text-gray-700">{children}</p>,
                    h1: ({children}) => <h1 className="font-general text-3xl font-bold mb-6 text-gray-900">{children}</h1>,
                    h2: ({children}) => <h2 className="font-general text-2xl font-bold mb-4 text-gray-900">{children}</h2>,
                    h3: ({children}) => <h3 className="font-general text-xl font-semibold mb-4 text-gray-900">{children}</h3>,
                  }
                }}
              />
            </div>

            {/* Related Image */}
            {postData.relatedImage && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-general text-2xl font-bold text-gray-900 mb-6">Featured Image</h3>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img
                    className="w-full h-auto"
                    src={urlFor(postData.relatedImage).width(800).url()}
                    alt={`Featured image for ${postData.title}`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Call to Action */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-4xl px-8 text-center">
          <h3 className="font-general text-3xl font-bold mb-4 text-gray-900">
            Explore More
          </h3>
          <p className="font-general text-lg text-gray-600 mb-8">
            Discover more insights and creative work
          </p>
          <a
            href="/"
            className="inline-block bg-blue-300 text-blue-50 font-general font-semibold px-8 py-3 rounded-lg hover:bg-blue-400 transition-colors"
          >
            View All Posts
          </a>
        </div>
      </section>

    </div>
  );
};

export default Post;