/** A small decorative tape sticker, positionable via style prop. */
const Tape = ({ style = {}, rotate = -4 }) => (
  <div className="tape" aria-hidden="true" style={{ ...style, transform: `translateX(-50%) rotate(${rotate}deg)` }} />
);

export default Tape;
