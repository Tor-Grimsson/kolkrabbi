import Navbar from "@components/layout/Navbar.jsx";
import Footer from "@components/layout/Footer.jsx";
import Home from "@/pages/Home.jsx";

function CmsHome() {
  return (
    <main className="min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Home />
      <Footer />
    </main>
  );
}

export default CmsHome;