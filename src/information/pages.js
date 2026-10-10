export const CONTACT_EMAIL = 'hello@soren.studio';

export const informationPages = {
  story: {
    hash: '#our-story',
    title: 'Our story',
    eyebrow: 'Soren Studio · Made with intention',
    introduction: 'A quieter approach to the everyday wardrobe.',
    sections: [
      {
        title: 'Less, but considered',
        paragraphs: [
          'Soren is an exploration of timeless silhouettes, soft textures and a restrained palette. Pieces that work together, without asking for attention.',
          'From an easy shirt to a longline coat, our edit centres on familiar shapes with thoughtful details. A wardrobe to return to, season after season.',
        ],
      },
      {
        title: 'Your own way of wearing',
        paragraphs: [
          'We believe the most interesting wardrobes feel personal. Layer a little, mix textures, keep what feels like you. Our collections are a starting point, not a set of rules.',
        ],
      },
    ],
    link: { label: 'Explore the complete edit', href: '#shop-all' },
  },
  shipping: {
    hash: '#shipping',
    title: 'Shipping & returns',
    eyebrow: 'Soren Studio · Client care',
    introduction: 'A few details before you order.',
    sections: [
      {
        title: 'Ordering at Soren',
        paragraphs: [
          'Checkout is currently a browser-only preview. No payment is collected and no items are shipped.',
        ],
      },
      {
        title: 'Delivery details',
        paragraphs: [
          'Use sample contact and address details to explore checkout. These fields are not sent to a delivery service, and there is no parcel tracking or delivery schedule.',
        ],
      },
      {
        title: 'Shipping costs',
        paragraphs: [
          'The order summary uses the displayed product prices in Malaysian ringgit (MYR). No shipping charge or tax is added in this preview.',
        ],
      },
      {
        title: 'Returns & refunds',
        paragraphs: [
          'As there are no real purchases or deliveries, returns, exchanges and refunds are not processed. You can change quantities or remove pieces from your bag before placing an order.',
        ],
      },
    ],
    link: { label: 'Read the FAQs', href: '#faq' },
  },
  faq: {
    hash: '#faq',
    title: 'FAQs',
    eyebrow: 'Soren Studio · A little guidance',
    introduction: 'Answers to the everyday questions.',
    questions: [
      {
        question: 'How do I choose my size?',
        answer:
          'Open the size guide on a clothing product page, then select a size before adding it to your bag. The guides use illustrative body measurements, not measurements of real garments. Accessories are one size unless stated otherwise.',
      },
      {
        question: 'Can I change my shopping bag?',
        answer:
          'Yes. Open the bag icon to adjust quantities or remove a piece. To choose a different size, remove the original item and add your preferred size from its product page.',
      },
      {
        question: 'Will checkout charge my card?',
        answer:
          'No. Checkout uses a sample payment method and does not collect payment or ship items. Use sample details rather than personal information when trying it.',
      },
      {
        question: 'Do I need an account to check out?',
        answer:
          'No account is required. The account feature is a browser-only preview: profiles are stored on this device and are not verified or secured. The bag is shared by profiles using the same browser.',
      },
      {
        question: 'Which currency are prices shown in?',
        answer:
          'All prices are in Malaysian ringgit (MYR), shown as RM. Checkout uses the displayed catalog prices; promotional banners are decorative in this preview.',
      },
      {
        question: 'Where can I find my order confirmation?',
        answer:
          'A confirmation appears after checkout. The latest preview order is saved in this browser when local storage is available. No confirmation email is sent, and clearing browser data removes the saved order.',
      },
    ],
    link: { label: 'Contact us', href: '#contact' },
  },
  contact: {
    hash: '#contact',
    title: 'Contact us',
    eyebrow: 'Soren Studio · In conversation',
    introduction: 'For questions about the edit or your experience at Soren.',
    sections: [
      {
        title: 'Write to us',
        paragraphs: [
          'Use the email link below to open your email app. Messages are not sent through this website.',
        ],
        email: CONTACT_EMAIL,
      },
      {
        title: 'A little guidance',
        paragraphs: [
          'For sizing, shopping bag and checkout questions, you may find what you need in our FAQs. Please do not include card details or other sensitive information in an email.',
        ],
      },
    ],
    link: { label: 'Browse the FAQs', href: '#faq' },
  },
};

export function informationPageKey(hash) {
  return Object.keys(informationPages).find((key) => informationPages[key].hash === hash) ?? null;
}
