import React, { useEffect, useId, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { formatMeasurementRange, getSizeGuide, sizeGuideNotice } from '../data/sizeGuides';
import './SizeGuide.css';

export default function SizeGuide({ product, selectedSize }) {
  const dialogRef = useRef(null);
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [unit, setUnit] = useState('cm');
  const guide = getSizeGuide(product);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  if (!guide) return null;

  const openGuide = () => {
    setUnit('cm');
    dialogRef.current.showModal();
    setIsOpen(true);
  };

  const closeOnBackdrop = (event) => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) dialogRef.current.close();
  };

  return <>
    <button type="button" className="size-guide-trigger" aria-haspopup="dialog" aria-controls={id} onClick={openGuide}>
      Size guide
    </button>
    {/* Native modal provides focus containment, Escape dismissal and focus return. */}
    <dialog ref={dialogRef} id={id} className="size-guide-dialog" aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-notice`} onClose={() => setIsOpen(false)} onClick={closeOnBackdrop}>
      <button type="button" className="size-guide-close icon-button" aria-label="Close size guide" onClick={() => dialogRef.current.close()}>
        <X size={20} />
      </button>
      <p className="eyebrow">A considered fit</p>
      <h2 id={`${id}-title`}>Size guide</h2>
      <p className="size-guide-product">{product.name}</p>
      <p id={`${id}-notice`} className="size-guide-notice">{sizeGuideNotice}</p>
      <div className="size-guide-units" role="group" aria-label="Measurement units">
        <button type="button" aria-pressed={unit === 'cm'} onClick={() => setUnit('cm')}>Centimetres</button>
        <button type="button" aria-pressed={unit === 'in'} onClick={() => setUnit('in')}>Inches</button>
      </div>
      <div className="size-guide-table-wrap">
        <table className="size-guide-table">
          <caption>Body measurements ({unit})</caption>
          <thead><tr><th scope="col">Size</th>{guide.columns.map(({ key, label }) => <th key={key} scope="col">{label}</th>)}</tr></thead>
          <tbody>{guide.rows.map(({ size, measurements }) => (
            <tr key={size} className={size === selectedSize ? 'size-guide-selected' : undefined}>
              <th scope="row">{size}{size === selectedSize && <span className="visually-hidden"> — selected size</span>}</th>
              {measurements.map((range, index) => <td key={guide.columns[index].key}>{formatMeasurementRange(range, unit)}</td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>
      <section className="size-guide-measuring" aria-labelledby={`${id}-measure`}>
        <h3 id={`${id}-measure`}>How to measure</h3>
        <p>Use a flexible tape over light clothing. Stand naturally and keep the tape snug, not tight.</p>
        <ul>{guide.columns.map(({ key, label, instruction }) => <li key={key}><strong>{label}:</strong> {instruction}</li>)}</ul>
      </section>
      <section className="size-guide-fit" aria-labelledby={`${id}-fit`}>
        <h3 id={`${id}-fit`}>This piece</h3>
        <p>{product.fit}</p>
        <p>Between sizes? Use the larger size for an easier fit. For bottoms, check both waist and hips. For dresses, check all three measurements. Relaxed and oversized describe the silhouette, not larger body measurements.</p>
      </section>
    </dialog>
  </>;
}
