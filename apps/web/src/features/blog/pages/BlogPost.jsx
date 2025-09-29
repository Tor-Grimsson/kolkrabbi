import Navbar from "@components/layout/Navbar.jsx";
import Footer from "@components/layout/Footer.jsx";
import Post from "../components/Post.jsx";

function BlogPost() {
  return (
    <main className="min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Post />
      <Footer />
    </main>
  );
}

export default BlogPost;