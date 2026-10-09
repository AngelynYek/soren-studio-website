import hoboBag from '../images/The Under-the-Radar Handbag Fashion People and Editors Can\'t Stop Carrying.jpg';
import sweaterDress from '../images/Drei Master.jpg';
import siennaSkirt from '../images/Gonna Midi in Raso - VariationMaster _ Atelier Emé.jpg';
import leonieSet from '../images/offer/brown set.jpg';
import lindenPolo from '../images/offer/green top.jpg';
import amelieScarf from '../images/offer/head scarf.jpg';
import silasJacket from '../images/offer/leather jacket.jpg';
import vesperSunglasses from '../images/offer/sunglasses.jpg';
import camilleBlouse from '../images/offer/white top.jpg';

// Demo merchandising values. Featured records are shared with the homepage,
// not copied into a second catalog, so links and details stay in sync.
export const offerProducts = [
  {
    slug: 'soren-minimalist-hobo-bag', name: 'Soren Minimalist Hobo Bag',
    price: 'RM 64', wasPrice: 'RM 80', image: hoboBag, category: 'Accessories',
    description: 'A softly curved hobo bag with an understated silhouette designed to sit close to the shoulder.',
    material: 'Textured vegan leather', fit: 'One size', sizes: [], featured: true,
  },
  {
    slug: 'freja-ribbed-sweater-dress', name: 'Freja Two-Tone Ribbed Sweater Dress',
    price: 'RM 108', wasPrice: 'RM 135', image: sweaterDress, category: 'Dresses',
    description: 'A softly ribbed sweater dress in a refined two-tone palette, made for easy autumn layering.',
    material: 'Soft viscose knit', fit: 'Close through the body with comfortable stretch', featured: true,
  },
  {
    slug: 'sienna-flared-midi-skirt', name: 'Sienna Flared Midi Skirt',
    price: 'RM 96', wasPrice: 'RM 120', image: siennaSkirt, category: 'Skirts',
    description: 'A fluid satin midi skirt that moves easily through the day and settles beautifully at the waist.',
    material: 'Satin-finish recycled polyester', fit: 'High waist with a fluid A-line shape', featured: true,
  },
  {
    slug: 'leonie-contour-shirt-skirt-set', name: 'Leonie Contour Shirt & Skirt Set',
    price: 'RM 128', wasPrice: 'RM 160', image: leonieSet, category: 'Sets',
    description: 'A softly sculpted taupe shirt meets a matching pleated mini skirt. A pointed collar, shaped waist, and angled shirt hem bring quiet definition to this coordinated two-piece set. Both pieces are included in the same selected size; styling accessories are not included.',
    fit: 'Shaped shirt waist with a pleated mini skirt; check bust, waist, and hips',
  },
  {
    slug: 'linden-ribbed-open-collar-polo', name: 'Linden Ribbed Open-Collar Polo',
    price: 'RM 72', wasPrice: 'RM 90', image: lindenPolo, category: 'Tops',
    description: 'Fine vertical ribbing and a pale pistachio palette lend texture to a clean everyday polo. An open collar and short sleeves create an easy silhouette, finished with a softly gathered hem.',
    fit: 'Relaxed through the chest with a softly gathered hem',
    sizeProfile: 'men', sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'amelie-botanical-head-scarf', name: 'Amelie Botanical Head Scarf',
    price: 'RM 36', wasPrice: 'RM 45', image: amelieScarf, category: 'Scarves',
    description: 'A dark botanical print framed by a warm golden border. Tie it through the hair, at the neckline, or around a bag handle for a considered touch of colour.',
    fit: 'Tie-style scarf for versatile styling', fitLabel: 'Details', sizes: [],
  },
  {
    slug: 'silas-leather-effect-jacket', name: 'Silas Leather-Effect Jacket',
    price: 'RM 152', wasPrice: 'RM 190', image: silasJacket, category: 'Outerwear',
    description: 'A smooth black leather-effect jacket with a broad collar and a clean zip front. Dropped shoulders and minimal seam detailing give this everyday layer a quiet, structured presence.',
    fit: 'Relaxed shoulders with room for light layering',
    sizeProfile: 'men', sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'vesper-oval-sunglasses', name: 'Vesper Oval Sunglasses',
    price: 'RM 48', wasPrice: 'RM 60', image: vesperSunglasses, category: 'Eyewear',
    description: 'An elongated oval frame in deep black with dark lenses and a smooth, sculptural outline. A pared-back finishing detail for everyday dressing.',
    fit: 'Elongated oval frame', fitLabel: 'Details', sizes: [],
  },
  {
    slug: 'camille-tie-collar-blouse', name: 'Camille Tie-Collar Blouse',
    price: 'RM 80', wasPrice: 'RM 100', image: camilleBlouse, category: 'Tops',
    description: 'A fluid ivory blouse with a neat stand collar and a long neck tie. A button front and softly gathered cuffs balance its easy drape, whether worn loose or tucked into tailoring.',
    fit: 'Easy drape through the body with gathered cuffs',
  },
].map((product) => ({ ...product, group: 'offers' }));
