import { FaHandPointer, FaTaxi } from "react-icons/fa6";

/** Brand slogan with the key words highlighted — "Book at your fingertip, cab at your doorstep". */
export default function Slogan({ className = "" }: { className?: string }) {
  return (
    <div className={`slogan ${className}`}>
      <span className="slogan-ic slogan-ic-tap" aria-hidden="true">
        <FaHandPointer />
      </span>
      <span className="slogan-txt">
        Book at your <mark>fingertip</mark>, cab at your <mark>doorstep</mark>
      </span>
      <span className="slogan-ic slogan-ic-car" aria-hidden="true">
        <FaTaxi />
      </span>
    </div>
  );
}
