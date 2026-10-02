import { FaHandPointer, FaTaxi } from "react-icons/fa6";

/** Brand slogan with the key words highlighted — "Book at your fingertip, cab at your doorstep". */
export default function Slogan({ className = "" }: { className?: string }) {
  return (
    <div className={`slogan ${className}`}>
      <FaHandPointer aria-hidden="true" />
      <span>
        Book at your <mark>fingertip</mark>, cab at your <mark>doorstep</mark>
      </span>
      <FaTaxi aria-hidden="true" />
    </div>
  );
}
