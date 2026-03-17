export const useService = () => {
  const { t } = useI18n()

  const services = computed(() => [
    {
      title: t("Wedding Invitations"),
      description:
        t("Custom-designed wedding invitations to set the tone for your big day. Choose from elegant printed cards or modern digital invitations."),
      image: "https://images.unsplash.com/photo-1519741497674-611481863552",
    },
    {
      title: t("Wedding Decoration"),
      description:
        t("Beautiful venue and floral decorations tailored to your wedding theme. From minimalist setups to luxurious ballroom designs."),
      image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92",
    },
    {
      title: t("Wedding Photography"),
      description:
        t("Capture every special moment with professional photographers. High-quality editing and cinematic shots to preserve memories forever."),
      image: "https://images.unsplash.com/photo-1529636798458-92182e662485",
    },
    {
      title: t("Wedding Videography"),
      description:
        t("Professional wedding films that tell the story of your big day. Includes cinematic highlights and full ceremony recordings."),
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    },
    {
      title: t("Wedding Catering"),
      description:
        t("Delicious food and beverage services for your guests. Choose from buffet, plated dinners, or custom menu experiences."),
      image: "https://images.unsplash.com/photo-1555244162-803834f70033",
    },
    {
      title: t("Wedding Planning"),
      description:
        t("Professional wedding planners to organize every detail of your event, ensuring a stress-free and perfectly coordinated day."),
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    },
  ])

  return {
    services
  }
}
