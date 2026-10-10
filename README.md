# Soren Studio

Soren Studio is a personal fashion website inspired by timeless clothing, soft neutrals and a
minimal shopping experience. Browse the collections, explore each piece and try a complete shopping journey, from choosing a size to viewing an order confirmation.

This is a practice project, not a real shop. No payments are collected and no products are shipped.

## Explore the website

- Browse the autumn, men's, women's and accessories collections.
- Discover exclusive offers, iconic pieces and timeless basics.
- Open **Shop all** in the footer to see the complete catalog and filter by men, women or accessories.
- Use the search icon to find products by name, clothing type or other product details.
- Click a product to read its description, fabric and fit information.
- Open a clothing product's size guide and switch between centimetres and inches.
- Use the footer to visit Our story, Shipping & returns, FAQs and Contact us.

The layout adapts to smaller screens. On mobile, use the menu icon to open the collection links.

## Try the shopping experience

1. Open a product and choose a size if needed.
2. Select **Add to bag**, then open the shopping bag icon.
3. Adjust quantities or remove items before selecting **Proceed to checkout**.
4. Fill in sample contact and delivery details. A sample payment method is already provided; you do
   not need to enter card details.
5. Select **Place order** to see the confirmation. The purchased items are removed from your bag.

All prices are shown in Malaysian ringgit (RM). Checkout uses the displayed product prices, with no shipping charge or tax added. Promotional banners do not apply extra discounts.

## Accounts and saved information

- Use the user icon to create a local profile with a sample name and email. You can sign in again using that email in the same browser. No password or email verification is required.
- These profiles are not secure accounts: anyone using the same browser can access them. Use sample details, not personal or sensitive information.
- Your profiles, shopping bag and latest order confirmation are saved in this browser when browser
storage is available. They do not sync across devices, and clearing the site's browser data removes them. Profiles in the same browser share one shopping bag. You do not need an account to check out.

## A few things to know

- Size guides contain illustrative body measurements, not measurements of real garments.
- Checkout is simulated in JavaScript. There is no payment service, delivery or confirmation email.
- The newsletter form displays a thank-you message but does not subscribe you to a mailing list.
- The contact email link opens your email app; the website does not send messages itself.

## Run the project on your computer

You will need Node.js 22.12 or newer, with npm and a downloaded or cloned copy of this project.

1. Open the project folder in VS Code or your preferred editor.
2. Open a terminal in that folder and install the project's dependencies:

   ```sh
   npm ci
   ```

3. Start the website:

   ```sh
   npm run dev
   ```

4. Open [localhost:5173](http://localhost:5173) in your browser. Keep the terminal running while you
   use the website. Press `Ctrl+C` in the terminal when you want to stop it.

No database, Stripe key or other API key is needed. An internet connection is needed to load the
externally hosted fonts and homepage banner images.

If port 5173 is already in use, stop the other development or preview server and try again.

## For people editing the project

The website uses React for its interactive pages, Vite to run and build it, plain CSS for styling and
Lucide for icons.

- `src/data/` contains product details, collection settings and size guides.
- `src/images/` contains the local product photos.
- `src/components/` contains shared product cards, prices and size guides.
- `src/cart/`, `src/account/`, `src/search/` and `src/shop/` contain their respective features.
- `src/information/` contains the story and customer information pages.
- `src/main.jsx` connects the pages, header, footer and navigation.
- `src/style.css` contains shared styles; individual features also have their own CSS files.
- `tests/` contains automated checks.

Useful commands:

```sh
npm test               # Run automated checks
npm run format:check   # Check code formatting
npm run format         # Format the project files
npm run build          # Create the website files in dist/
npm run preview        # View the built website locally after building
```

Keep `package-lock.json` with the project so installations use the recorded dependency versions.
The `node_modules/` and `dist/` folders are generated locally and are ignored by Git.
