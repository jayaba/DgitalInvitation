import floralFrame from '../../assets/floral-frame.webp';

const style = { backgroundImage: `url(${floralFrame})` };

/**
 * A painted bouquet for a corner of a section, cropped from the single
 * artwork in src/assets/floral-frame.webp, which has one bouquet in its
 * top-left corner ("tl") and one in its bottom-right corner ("br").
 */
export default function PaintedCorner({ position = 'tl' }) {
  return <div className={`painted painted--${position}`} style={style} aria-hidden="true" />;
}
