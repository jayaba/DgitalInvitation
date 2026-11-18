import Reveal from './Reveal.jsx';
import { Divider } from './decor/Florals.jsx';

export default function SectionHeading({ eyebrow, title }) {
  return (
    <Reveal className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-heading__title">{title}</h2>
      <Divider />
    </Reveal>
  );
}
