import hoboBag from '../images/The Under-the-Radar Handbag Fashion People and Editors Can\'t Stop Carrying.jpg';
import sweaterDress from '../images/Drei Master.jpg';
import siennaSkirt from '../images/Gonna Midi in Raso - VariationMaster _ Atelier Emé.jpg';
import noirDress from '../images/Black dress.jpeg';
import eliasTrench from '../images/Trench.jpg';
import kayaTrouser from '../images/pleatedpants.jpg';
import cableKnit from '../images/vneck.jpg';
import lorettaSkirt from '../images/LorettaSkirt.jpg';
import espressoCoat from '../images/woolovercoat.jpg';
import alderTrousers from '../images/autumn/brown pants.jpg';
import marlowDress from '../images/autumn/brown dress.jpg';
import rowanCardigan from '../images/autumn/beige outerwear.jpg';
import nellKnit from '../images/autumn/grey sweater.jpg';
import sageOvershirt from '../images/autumn/green outerwear.jpg';
import hollisMac from '../images/autumn/brown trenchcoat.jpg';
import cedarJacket from '../images/autumn/jacket.jpg';
import irisSkirt from '../images/autumn/pleated skirt.jpg';
import elaraKnit from '../images/autumn/white sweater.jpg';

const createProduct = (product) => ({
  sizes: ['XS', 'S', 'M', 'L'],
  material: 'Considered everyday blend',
  fit: 'Designed for an easy, considered fit',
  ...product,
});

export const products = [
  createProduct({ slug: 'soren-minimalist-hobo-bag', name: 'Soren Minimalist Hobo Bag', price: 'RM 64', wasPrice: 'RM 80', image: hoboBag, group: 'offers', category: 'Accessories', description: 'A softly curved hobo bag with an understated silhouette designed to sit close to the shoulder.', material: 'Textured vegan leather', fit: 'One size', sizes: [] }),
  createProduct({ slug: 'freja-ribbed-sweater-dress', name: 'Freja Two-Tone Ribbed Sweater Dress', price: 'RM 108', wasPrice: 'RM 135', image: sweaterDress, group: 'offers', category: 'Dresses', description: 'A softly ribbed sweater dress in a refined two-tone palette, made for easy autumn layering.', material: 'Soft viscose knit', fit: 'Close through the body with comfortable stretch' }),
  createProduct({ slug: 'sienna-flared-midi-skirt', name: 'Sienna Flared Midi Skirt', price: 'RM 96', wasPrice: 'RM 120', image: siennaSkirt, group: 'offers', category: 'Skirts', description: 'A fluid satin midi skirt that moves easily through the day and settles beautifully at the waist.', material: 'Satin-finish recycled polyester', fit: 'High waist with a fluid A-line shape' }),
  createProduct({ slug: 'noir-fold-dress', name: 'The Noir Fold Dress', price: 'RM 140', image: noirDress, group: 'icons', category: 'Dresses', description: 'An off-shoulder column dress with a sculpted fold neckline and an elongated, fluid line.', material: '92% viscose, 8% elastane', fit: 'Fitted through the bodice with an easy skirt' }),
  createProduct({ slug: 'elias-minimalist-trench-coat', name: 'Elias Minimalist Trench Coat', price: 'RM 157', image: eliasTrench, group: 'icons', category: 'Outerwear', description: 'A softly structured trench with a relaxed shoulder and clean, considered finishing.', material: 'Cotton-blend twill', fit: 'Relaxed fit; take your usual size', sizes: ['S', 'M', 'L', 'XL'] }),
  createProduct({ slug: 'kaya-pleated-wide-leg-trouser', name: 'Kaya Pleated Wide-Leg Trouser', price: 'RM 118', image: kayaTrouser, group: 'icons', category: 'Trousers', description: 'High-rise pleated trousers cut with a sweeping wide leg for an effortless drape.', material: 'Tencel and wool blend', fit: 'High rise with a full-length inseam' }),
  createProduct({ slug: 'half-zip-cable-knit', name: 'The Half-Zip Cable Knit', price: 'RM 76', image: cableKnit, group: 'icons', category: 'Knitwear', description: 'A soft cable-knit layer with a neat half zip and a relaxed, everyday proportion.', material: 'Merino wool blend', fit: 'Relaxed fit; size down for a closer fit', sizes: ['S', 'M', 'L'] }),
  createProduct({ slug: 'loretta-tailored-midi-skirt', name: 'Loretta Tailored Midi Pencil Skirt', price: 'RM 88', image: lorettaSkirt, group: 'icons', category: 'Skirts', description: 'A streamlined midi skirt with precise tailoring and a slit for ease of movement.', material: 'Wool-blend suiting', fit: 'High waist with a tailored silhouette' }),
  createProduct({ slug: 'espresso-oversized-longline-coat', name: 'Espresso Oversized Longline Coat', price: 'RM 190', image: espressoCoat, group: 'icons', category: 'Outerwear', description: 'A longline coat in rich espresso brown, designed for generous layering.', material: 'Brushed wool blend', fit: 'Oversized fit with dropped shoulders', sizes: ['S', 'M', 'L'] }),
  createProduct({ slug: 'marlow-pleated-wool-midi-dress', name: 'Marlow Pleated Wool Midi Dress', price: 'RM 168', image: marlowDress, group: 'autumn', category: 'Dresses', description: 'A softly structured cocoa midi dress with three-quarter sleeves and a beautifully pleated skirt.', material: 'Brushed wool blend', fit: 'Defined waist with a full midi skirt' }),
  createProduct({ slug: 'alder-tailored-wool-trouser', name: 'Alder Tailored Wool Trouser', price: 'RM 122', image: alderTrousers, group: 'autumn', category: 'Trousers', description: 'Clean-cut brown trousers with a straight leg and subtle pleats for an understated autumn uniform.', material: 'Wool-blend suiting', fit: 'Mid rise with a straight, relaxed leg', sizes: ['S', 'M', 'L', 'XL'] }),
  createProduct({ slug: 'rowan-soft-cardigan', name: 'Rowan Soft Cardigan', price: 'RM 104', image: rowanCardigan, group: 'autumn', category: 'Knitwear', description: 'A light oatmeal cardigan with a soft handfeel and easy layering proportions.', material: 'Cotton and merino blend', fit: 'Relaxed fit with dropped shoulders', sizes: ['S', 'M', 'L', 'XL'] }),
  createProduct({ slug: 'nell-turtleneck-knit', name: 'Nell Turtleneck Knit', price: 'RM 98', image: nellKnit, group: 'autumn', category: 'Knitwear', description: 'A generously ribbed turtleneck knit that brings warmth and quiet texture to everyday dressing.', material: 'Wool-blend rib knit', fit: 'Oversized silhouette with a long sleeve' }),
  createProduct({ slug: 'sage-collarless-overshirt', name: 'Sage Collarless Overshirt', price: 'RM 112', image: sageOvershirt, group: 'autumn', category: 'Shirts', description: 'A washed olive overshirt with a clean collarless neckline and a relaxed, versatile shape.', material: 'Garment-washed cotton', fit: 'Relaxed fit; designed for layering', sizes: ['S', 'M', 'L', 'XL'] }),
  createProduct({ slug: 'hollis-cotton-mac-coat', name: 'Hollis Cotton Mac Coat', price: 'RM 176', image: hollisMac, group: 'autumn', category: 'Outerwear', description: 'A timeless sand mac coat with a crisp collar and a length made for transitional weather.', material: 'Water-resistant cotton blend', fit: 'Straight fit with room to layer', sizes: ['S', 'M', 'L', 'XL'] }),
  createProduct({ slug: 'cedar-contrast-collar-jacket', name: 'Cedar Contrast-Collar Jacket', price: 'RM 138', image: cedarJacket, group: 'autumn', category: 'Outerwear', description: 'A cropped cocoa jacket defined by a deep contrast collar and relaxed, easy structure.', material: 'Cotton canvas with corduroy trim', fit: 'Boxy fit with a cropped length' }),
  createProduct({ slug: 'iris-check-pleated-midi-skirt', name: 'Iris Check Pleated Midi Skirt', price: 'RM 109', image: irisSkirt, group: 'autumn', category: 'Skirts', description: 'A check pleated midi skirt with precise movement and a grounded autumn palette.', material: 'Brushed wool blend', fit: 'High waist with a full pleated shape' }),
  createProduct({ slug: 'elara-cable-sleeve-knit', name: 'Elara Cable-Sleeve Knit', price: 'RM 92', image: elaraKnit, group: 'autumn', category: 'Knitwear', description: 'A cream knit with soft cable detail and an easy, softly voluminous sleeve.', material: 'Cotton and wool blend', fit: 'Relaxed fit with a ribbed hem' }),
];

export const productsByGroup = (group) => products.filter((product) => product.group === group);
export const productBySlug = (slug) => products.find((product) => product.slug === slug);
