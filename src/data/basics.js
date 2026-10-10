import anoukJacket from '../images/basics/black jacket.jpg';
import noelShirt from '../images/basics/blue outerwear.jpg';
import sabineKnit from '../images/basics/brown top.jpg';
import linneaKnit from '../images/basics/green sweater.jpg';
import theoPolo from '../images/basics/light brown top.jpg';
import liseCardigan from '../images/basics/light grey cardigan.jpg';
import remyKnit from '../images/basics/purple sweater.jpg';
import audeTop from '../images/basics/white top.jpg';
import arloTee from '../images/basics/yellow shirt.jpg';

// Personal-site merchandising: illustrative prices and size ranges.
// Each photograph represents the named garment, not the complete styled outfit.
export const basicProducts = [
  {
    slug: 'sabine-cable-crop-knit',
    name: 'Sabine Cable Crop Knit',
    price: 'RM 86',
    image: sabineKnit,
    category: 'Knitwear',
    description:
      'A cocoa knit with delicate vertical cable detailing and a clean round neckline. Its cropped hem and long sleeves lend a quiet sense of proportion to high-waisted tailoring.',
    fit: 'Neat silhouette with a cropped hem and long sleeves',
  },
  {
    slug: 'lise-contrast-edge-cardigan',
    name: 'Lise Contrast-Edge Cardigan',
    price: 'RM 94',
    image: liseCardigan,
    category: 'Knitwear',
    description:
      'A light grey ribbed cardigan framed by an ivory edge at the V-neckline, button front, and cuffs. A softly shaped everyday layer that sits easily over tailored separates.',
    fit: 'Close through the body with a V-neck and long sleeves',
  },
  {
    slug: 'aude-twist-front-top',
    name: 'Aude Twist-Front Top',
    price: 'RM 88',
    image: audeTop,
    category: 'Tops',
    description:
      'An ivory sleeveless top with a sculptural twist at the waist. Soft folds flow from a simple round neckline into an asymmetric hem, bringing definition to an understated silhouette.',
    fit: 'Easy upper body with a gathered waist and asymmetric hem',
  },
  {
    slug: 'anouk-clean-line-jacket',
    name: 'Anouk Clean-Line Jacket',
    price: 'RM 148',
    image: anoukJacket,
    category: 'Outerwear',
    description:
      'A smooth black jacket with a broad collar, button front, and minimal seam detailing. Its boxy shape and relaxed shoulders make a considered finishing layer for everyday dressing.',
    fit: 'Boxy silhouette with dropped shoulders and room for light layering',
  },
  {
    slug: 'linnea-mock-neck-knit',
    name: 'Linnea Mock-Neck Knit',
    price: 'RM 98',
    image: linneaKnit,
    category: 'Knitwear',
    description:
      'A pale sage knit with a ribbed mock neck, cuffs, and hem. Dropped shoulders and softly voluminous sleeves give this pared-back layer an easy, balanced shape.',
    fit: 'Relaxed body with dropped shoulders and a ribbed hem',
  },
  {
    slug: 'noel-everyday-pocket-shirt',
    name: 'Noel Everyday Pocket Shirt',
    price: 'RM 102',
    image: noelShirt,
    category: 'Shirts',
    description:
      'A pale blue shirt with a pointed collar, neat button front, and a single chest pocket. Generous proportions allow it to be worn alone or open over a favourite everyday tee.',
    fit: 'Relaxed shoulders with a roomy body and long sleeves',
    sizeProfile: 'men',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'remy-textured-crew-knit',
    name: 'Remy Textured Crew Knit',
    price: 'RM 106',
    image: remyKnit,
    category: 'Knitwear',
    description:
      'A muted lilac crew-neck knit with an open vertical texture. Ribbed edges and dropped shoulders frame a relaxed silhouette, adding a gentle note of colour to everyday essentials.',
    fit: 'Relaxed silhouette with dropped shoulders and ribbed edges',
    sizeProfile: 'men',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'theo-open-collar-rib-polo',
    name: 'Theo Open-Collar Rib Polo',
    price: 'RM 82',
    image: theoPolo,
    category: 'Tops',
    description:
      'A warm taupe polo with broad vertical ribbing and an open collar. Short sleeves and an understated straight shape offer a clean foundation for relaxed trousers or everyday shorts.',
    fit: 'Easy fit through the chest with short sleeves',
    sizeProfile: 'men',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'arlo-ribbed-crew-tee',
    name: 'Arlo Ribbed Crew Tee',
    price: 'RM 76',
    image: arloTee,
    category: 'Tops',
    description:
      'A golden ochre crew-neck tee with fine vertical ribbing and subtly textured sleeves. An easy shoulder and relaxed shape bring a considered touch to a familiar wardrobe staple.',
    fit: 'Relaxed chest and shoulders with short sleeves',
    sizeProfile: 'men',
    sizes: ['S', 'M', 'L', 'XL'],
  },
].map((product) => ({ ...product, group: 'basics' }));
