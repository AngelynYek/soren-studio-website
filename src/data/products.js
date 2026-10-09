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
import orsonTrouser from '../images/men/black pants.jpg';
import aubinShirt from '../images/men/blue collar.jpeg';
import marlowOvershirt from '../images/men/brown outerwear.jpg';
import wellsTrouser from '../images/men/brown pant.jpeg';
import claretTee from '../images/men/burgundy shirt.jpg';
import miroOvershirt from '../images/men/khaki outerwear.jpg';
import duneShirt from '../images/men/pink collar.jpg';
import ridgeShirt from '../images/men/white collar.png';
import ecruKnit from '../images/men/white knitwear.jpg';

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
  createProduct({ slug: 'orson-wide-leg-trouser', name: 'Orson Wide-Leg Trouser', price: 'RM 118', image: orsonTrouser, group: 'men', category: 'Trousers', description: 'A black tailored trouser with front pleats and a generous wide leg, bringing a quiet sense of structure to everyday dressing.', material: 'Composition to be confirmed', fit: 'Full-length silhouette with a wide leg', sizes: ['S', 'M', 'L', 'XL'] }),
  createProduct({ slug: 'aubin-drawcord-shirt', name: 'Aubin Drawcord Shirt', price: 'RM 112', image: aubinShirt, group: 'men', category: 'Shirts', description: 'A deep navy shirt with a subtle drawcord hem for an easy, architectural silhouette.', material: 'Crisp cotton blend', fit: 'Relaxed fit with an adjustable hem', sizes: ['S', 'M', 'L', 'XL'] }),
  createProduct({ slug: 'marlow-utility-overshirt', name: 'Marlow Utility Overshirt', price: 'RM 126', image: marlowOvershirt, group: 'men', category: 'Outerwear', description: 'A warm brown overshirt with clean patch pockets and a softly structured finish.', material: 'Brushed cotton twill', fit: 'Regular fit; designed for light layering', sizes: ['S', 'M', 'L', 'XL'] }),
  createProduct({ slug: 'wells-pleated-trouser', name: 'Wells Pleated Trouser', price: 'RM 116', image: wellsTrouser, group: 'men', category: 'Trousers', description: 'A fluid brown trouser with a relaxed straight leg and a softly tailored pleat.', material: 'Draped wool blend', fit: 'Mid rise with a relaxed straight leg', sizes: ['S', 'M', 'L', 'XL'] }),
  createProduct({ slug: 'claret-box-tee', name: 'Claret Box Tee', price: 'RM 62', image: claretTee, group: 'men', category: 'Tops', description: 'A softly weighted short-sleeve tee in a rich claret hue with an elevated, boxy shape.', material: 'Heavyweight cotton jersey', fit: 'Relaxed box fit', sizes: ['S', 'M', 'L', 'XL'] }),
  createProduct({ slug: 'miro-patch-pocket-overshirt', name: 'Miro Patch-Pocket Overshirt', price: 'RM 132', image: miroOvershirt, group: 'men', category: 'Outerwear', description: 'A stone overshirt with generous patch pockets and quiet utility-inspired detail.', material: 'Cotton canvas', fit: 'Relaxed fit with dropped shoulders', sizes: ['S', 'M', 'L', 'XL'] }),
  createProduct({ slug: 'dune-linen-shirt', name: 'Dune Linen Shirt', price: 'RM 89', image: duneShirt, group: 'men', category: 'Shirts', description: 'A pale rose linen shirt that brings a softened note of colour to everyday tailoring.', material: 'Washed linen', fit: 'Relaxed fit with a curved hem', sizes: ['S', 'M', 'L', 'XL'] }),
  createProduct({ slug: 'ridge-textured-camp-shirt', name: 'Ridge Textured Camp Shirt', price: 'RM 94', image: ridgeShirt, group: 'men', category: 'Shirts', description: 'An ivory short-sleeve shirt with subtle woven texture and a clean camp collar.', material: 'Textured cotton blend', fit: 'Easy fit through the body', sizes: ['S', 'M', 'L', 'XL'] }),
  createProduct({ slug: 'ecru-shawl-collar-knit', name: 'Ecru Shawl-Collar Knit', price: 'RM 124', image: ecruKnit, group: 'men', category: 'Knitwear', description: 'A soft ecru knit with a generous shawl collar and a relaxed, layered silhouette.', material: 'Wool and cotton blend', fit: 'Oversized fit with dropped shoulders', sizes: ['S', 'M', 'L', 'XL'] }),
];

export const productsByGroup = (group) => products.filter((product) => product.group === group);
export const productBySlug = (slug) => products.find((product) => product.slug === slug);
