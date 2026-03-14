export const useService = () => {
  const services = ref([
    {
      title: "Wedding Invitations",
      description: "Custom-designed wedding invitations to set the tone for your big day. We offer premium paper quality and elegant digital options.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552",
    },
    {
      title: "Wedding Decoration",
      description: "Beautiful floral and venue decorations for your wedding. From minimalist chic to grand ballroom setups, we bring your vision to life.",
      image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92",
    },
    {
      title: "Wedding Photography",
      description: "Capture every special moment with professional photographers. High-quality editing and cinematic shots to preserve your memories forever.",
      image: "https://images.unsplash.com/photo-1529636798458-92182e662485",
    },
  ])

  return {
    services
  }
}
