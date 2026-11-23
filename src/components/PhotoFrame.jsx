/**
 * A photograph on a slim cream mount with a hairline of gold, like a print
 * set into stationery. The picture always keeps its own proportions —
 * nothing is cropped. `photo` comes from the usePhoto hook; `children` are
 * optional accents laid over the print (e.g. a small bouquet).
 */
export default function PhotoFrame({ photo, alt, className = '', children }) {
  return (
    <figure className={`photo ${photo.isLandscape ? 'photo--landscape' : 'photo--portrait'} ${className}`}>
      <div className="photo__mount">
        <img
          src={photo.src}
          alt={alt}
          width={photo.width}
          height={photo.height}
          decoding="async"
        />
      </div>
      {children}
    </figure>
  );
}
