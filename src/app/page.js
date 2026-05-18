import About from "@/components/About";
import Banner from "@/components/Banner";
import FeaturedSection from "@/components/FeaturedSection";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedSection />
      <Testimonials />
      <About />
    </div>
  );
}
