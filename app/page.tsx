import FeaturedProperties from "@/components/home/featureProperties";
import Hero from "@/components/home/hero";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";




// export default function Home() {
//   return (
//     <>
//       {/* <Navbar /> */}
//       <Hero />
//       {/* <Footer /> */}
//     </>
//   );
// }

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}

      <Hero />

      <FeaturedProperties />

      {/* <Footer /> */}
    </>
  );
}