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
                Carlos Fernandez Puertolas is an award-winning filmmaker from Moloka'i, Hawai'i, born and raised with a deep connection to place, people, and story. With over ten years of experience in the filmmaking landscape, his work focuses on capturing authentic human experiences through a visual language that blends cinematic beauty with emotional honesty. His early career has been spent documenting and telling stories from cultures around the world with a commitment to bringing far corners of the earth to household screens the way his younger self had always dreamt of seeing.
              </p>
              
              <p className="text-white/90 leading-relaxed mb-8 text-sm">
                Carlos now focuses on commercial, documentary, and branded filmmaking as a director and cinematographer, holding and elevating the craft of short form deep emotional storytelling through his series titled Layers, a style widely applicable to industries in every sector. In 2025 he founded Innerbloom, a boutique production company that blends together the efficiency of small crew productions with big impact execution. Whether he's shooting on the road or at home in Hawai'i, he approaches every story with intention, respect, and a commitment to showing the deeper layers of who we are.
              </p>

              <p className="text-white/60 text-sm">
                Based in Honolulu, Hawai'i.
              </p>
            </div>
          </div>
        </div>

        {/* Awards Section */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-sm tracking-widest text-gray-400 mb-8">\ Bio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-b border-white/10 pb-6">
              <p className="text-white/60 text-xs mb-2">Winner Norcal Emmy Awards</p>
              <p className="text-white text-sm">Hula is Hawai'i</p>
              <p className="text-white/60 text-xs">Associate Producer</p>
            </div>
            <div className="border-b border-white/10 pb-6">
              <p className="text-white/60 text-xs mb-2">2x Telly Awards - Art Direction</p>
              <p className="text-white text-sm">Kuku Kapa Commercial</p>
              <p className="text-white/60 text-xs">Associate Producer, DP, Edit</p>
            </div>
            <div className="border-b border-white/10 pb-6">
              <p className="text-white/60 text-xs mb-2">Best Cinematography - Indie X Film Fest 2025</p>
              <p className="text-white text-sm">Returning to Olivia</p>
              <p className="text-white/60 text-xs">Director, DP</p>
            </div>
            <div className="border-b border-white/10 pb-6">
              <p className="text-white/60 text-xs mb-2">Outstanding Achievement (Short Documentary) - Indie X Film Fest 2025</p>
              <p className="text-white text-sm">Returning to Olivia</p>
              <p className="text-white/60 text-xs">Director, DP</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
