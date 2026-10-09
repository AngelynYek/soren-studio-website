import noirDress from '../images/Black dress.jpeg';
import eliasTrench from '../images/Trench.jpg';
import kayaTrouser from '../images/pleatedpants.jpg';
import cableKnit from '../images/vneck.jpg';
import lorettaSkirt from '../images/LorettaSkirt.jpg';
import espressoCoat from '../images/woolovercoat.jpg';
import lucienShirt from '../images/iconic/beige wafer top.jpg';
import adrienneSuit from '../images/iconic/black suit.jpg';
import maelleShirt from '../images/iconic/brown top.jpg';

// Shared homepage and collection records; prices and sizing are demo values.
export const iconicProducts = [
  { slug: 'noir-fold-dress', name: 'The Noir Fold Dress', price: 'RM 140', image: noirDress, featured: true, category: 'Dresses', description: 'An off-shoulder column dress with a sculpted fold neckline and an elongated, fluid line.', material: '92% viscose, 8% elastane', fit: 'Fitted through the bodice with an easy skirt' },
  { slug: 'elias-minimalist-trench-coat', sizeProfile: 'men', name: 'Elias Minimalist Trench Coat', price: 'RM 157', image: eliasTrench, featured: true, category: 'Outerwear', description: 'A softly structured trench with a relaxed shoulder and clean, considered finishing.', material: 'Cotton-blend twill', fit: 'Relaxed fit; take your usual size', sizes: ['S', 'M', 'L', 'XL'] },
  { slug: 'kaya-pleated-wide-leg-trouser', name: 'Kaya Pleated Wide-Leg Trouser', price: 'RM 118', image: kayaTrouser, featured: true, category: 'Trousers', description: 'High-rise pleated trousers cut with a sweeping wide leg for an effortless drape.', material: 'Tencel and wool blend', fit: 'High rise with a full-length inseam' },
  { slug: 'half-zip-cable-knit', sizeProfile: 'men', name: 'The Half-Zip Cable Knit', price: 'RM 76', image: cableKnit, featured: true, category: 'Knitwear', description: 'A soft cable-knit layer with a neat half zip and a relaxed, everyday proportion.', material: 'Merino wool blend', fit: 'Relaxed fit; size down for a closer fit', sizes: ['S', 'M', 'L'] },
  { slug: 'loretta-tailored-midi-skirt', name: 'Loretta Tailored Midi Pencil Skirt', price: 'RM 88', image: lorettaSkirt, featured: true, category: 'Skirts', description: 'A streamlined midi skirt with precise tailoring and a slit for ease of movement.', material: 'Wool-blend suiting', fit: 'High waist with a tailored silhouette' },
  { slug: 'espresso-oversized-longline-coat', sizeProfile: 'men', name: 'Espresso Oversized Longline Coat', price: 'RM 190', image: espressoCoat, featured: true, category: 'Outerwear', description: 'A longline coat in rich espresso brown, designed for generous layering.', material: 'Brushed wool blend', fit: 'Oversized fit with dropped shoulders', sizes: ['S', 'M', 'L'] },
  {
    slug: 'lucien-waffle-texture-shirt', name: 'Lucien Waffle-Texture Shirt',
    price: 'RM 108', image: lucienShirt, category: 'Shirts',
    description: 'A pale sand shirt with a subtle grid texture, an open collar, and a short button placket. Loose sleeves and a softly draped shape bring an unhurried feel to everyday tailoring. Styling accessories and trousers are not included.',
    fit: 'Relaxed shoulders and an easy drape through the body',
    sizeProfile: 'men', sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'adrienne-double-breasted-suit-set', name: 'Adrienne Double-Breasted Suit Set',
    price: 'RM 248', image: adrienneSuit, category: 'Sets',
    description: 'A black double-breasted blazer with broad lapels and a shaped waist, paired with matching wide-leg trousers. Clean lines give this two-piece suit a considered presence. Both pieces are included in the same selected size; jewellery is not included.',
    fit: 'Shaped blazer waist with wide-leg trousers; check bust, waist, and hips',
  },
  {
    slug: 'maelle-wrap-waist-shirt', name: 'Maelle Wrap-Waist Shirt',
    price: 'RM 112', image: maelleShirt, category: 'Shirts',
    description: 'A deep cocoa shirt defined by a broad wrap detail at the waist. A pointed collar, dropped shoulders, and an angled hem balance its sculptural silhouette. The shirt is sold separately from the styled skirt and bag.',
    fit: 'Relaxed shoulders with a defined wrap waist',
  },
].map((product) => ({ ...product, group: 'icons' }));
