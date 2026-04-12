import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import FilmGallery from '@/components/film-gallery'
import LogosCarousel from '@/components/logos-carousel'
import BioSection from '@/components/bio-section'
import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="bg-black">
      <Header />
      <HeroSection />
      <FilmGallery />
      <LogosCarousel />
      <BioSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
