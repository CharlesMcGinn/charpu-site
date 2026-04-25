'use client'

export default function BioSection() {
  return (
    <section id="about" className="bg-black py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-sm tracking-widest text-gray-400 mb-12">\ About</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Image */}
            <div className="flex items-start">
              <img 
                src="/headshot.png"
                alt="Carlos Fernandez Puertolas"
                className="w-full max-w-sm object-cover"
              />
            </div>

            {/* Bio Text */}
            <div className="flex flex-col justify-start">
              <p className="text-white/90 leading-relaxed mb-8 text-sm">
                Carlos Fernandez Puertolas is an award-winning Spanish animator and director with over 20 years of experience in the animation industry.
              </p>
              
              <p className="text-white/90 leading-relaxed mb-8 text-sm">
                He is currently the Head of Animation at DreamWorks Animation on the upcoming animated feature film "Shrek 5." Throughout his DreamWorks tenure he has contributed to some of the studio's most iconic franchises and films such as "Shrek", "Madagascar", "Megamind", and "The Boss Baby." In 2015, he became the Head of Character Animation on "The Boss Baby", and later led animation on "Trolls World Tour" and "Ruby Gillman: Teenage Kraken."
              </p>
              
              <p className="text-white/90 leading-relaxed mb-8 text-sm">
                Alongside his studio work, Carlos continues to pursue personal storytelling, directing animated and live-action shorts such as "Frank & Emmet," which have received international recognition and awards. His creative curiosity also extends into experimental projects, including the animated series "Across Dimensions with Terry Benson", where he explores new narrative formats and visual approaches, as well as his latest animated short film, "How Not to Die on an Alien Planet."
              </p>

              <p className="text-white/60 text-sm">
                Based in Glendale, CA.
              </p>
            </div>
          </div>
        </div>

        {/* Awards Section */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-sm tracking-widest text-gray-400 mb-8">\ News & Awards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-b border-white/10 pb-6">
              <p className="text-white/60 text-xs mb-2">Variety</p>
              <p className="text-white text-sm"><a href="https://variety.com/gallery/variety-10-animators-to-watch-2017/carlos-puertolas/" target="_blank" rel="noopener noreferrer">Variety's 2017 10 Animators to Watch</a></p>
            </div>
            <div className="border-b border-white/10 pb-6">
              <p className="text-white/60 text-xs mb-2">Variety</p>
              <p className="text-white text-sm"><a href="https://variety.com/2018/film/news/academy-new-members-2018-record-1202856702/" target="_blank" rel="noopener noreferrer">Academy Invites Record 928 New Members</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
