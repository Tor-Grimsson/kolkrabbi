
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client as sanityClient } from "../../sanity/client.js";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import Navbar from "../Nav/Navbar.jsx";
import Footer from "../Nav/Footer.jsx";

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
          mainImage{
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
  
  // A more structured loading state
  if (!postData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <Navbar />
      {/* Header section with the main image as a background */}
      <header
        className="relative w-full h-[40vh] bg-blue-500 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: postData.mainImage ? `url(${urlFor(postData.mainImage).url()})` : 'none',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{postData.title}</h1>
          <div className="flex items-center justify-center">
            {postData.authorImage && <img src={urlFor(postData.authorImage).width(50).height(50).url()} alt={postData.name} className="w-12 h-12 rounded-full mr-4 border-2 border-white" />}
            <p className="text-lg font-semibold">{postData.name}</p>
          </div>
        </div>
      </header>
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              <PortableText value={postData.body} />
            </div>
            {postData.relatedImage && (
              <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Related Image</h3>
                <img
                  className="w-full h-auto rounded-lg shadow-md"
                  src={urlFor(postData.relatedImage).width(800).url()}
                  alt={`Related to ${postData.title}`}
                />
              </div>
            )}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
};

export default Post;