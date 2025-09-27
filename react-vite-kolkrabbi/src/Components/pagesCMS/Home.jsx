import { useEffect, useState } from "react";
import { client } from "../../sanity/client"; 

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.fetch(POSTS_QUERY).then(setPosts);
  }, []);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <a href={`/${post.slug.current}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
};
export default Home 

