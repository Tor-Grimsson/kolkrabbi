import { useEffect, useState } from "react";
import { client } from "@lib/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
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
  }
}`;

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.fetch(POSTS_QUERY).then(setPosts);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <header className="relative bg-blue-300 text-blue-50 py-20 px-8">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="font-general text-6xl md:text-8xl font-black uppercase tracking-wide mb-6">
            Kolkrabbi
          </h1>
          <p className="font-general text-xl md:text-2xl max-w-2xl mx-auto">
            Creative insights, design explorations, and typographic adventures
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-300/20"></div>
      </header>

      {/* Featured Image */}
      <section className="relative -mt-16 px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src="/img/kolk-layout-1.webp"
              alt="Featured work"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="p-8">
              <h2 className="font-general text-2xl font-bold mb-4">Latest Work</h2>
              <p className="font-general text-gray-600">
                Explore our latest typography and design projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <main className="container mx-auto max-w-6xl p-8 mt-16">
        <h2 className="font-general text-4xl font-bold mb-12 text-center">Recent Posts</h2>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <a href={`/${post.slug.current}`} className="block">
                  {post.mainImage?.asset?.url || post.image?.asset?.url ? (
                    <img
                      src={post.mainImage?.asset?.url || post.image?.asset?.url}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-blue-100 flex items-center justify-center">
                      <span className="font-general text-gray-400">No image</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-general text-xl font-semibold mb-2 hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-general text-gray-600 text-sm">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <h3 className="font-general text-2xl font-semibold mb-4">No Posts Yet</h3>
              <p className="font-general text-gray-600 mb-6">
                Create your first post in the Sanity Studio to see it here.
              </p>
              <div className="bg-blue-100 rounded-lg p-4">
                <p className="font-general text-sm text-gray-700">
                  Access your Sanity Studio to start creating content
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-blue-300 text-blue-50 py-12 mt-20">
        <div className="container mx-auto max-w-6xl px-8 text-center">
          <h3 className="font-general text-2xl font-bold mb-4">Kolkrabbi Studio</h3>
          <p className="font-general text-lg opacity-90">
            Typography • Design • Creative Direction
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home 

