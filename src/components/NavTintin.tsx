/* Tintin and Snowy resting on the bottom hairline of the nav, just to the right
   of the spinning Golden Record — in the empty stretch between the brand and the
   menu, so they never sit on top of text. Static by design; the only motion is
   Snowy hopping when the cursor lands on him (pure CSS, in globals.css under
   "TINTIN & SNOWY").

   Artwork: transparent PNGs cut from the supplied illustration, in public/tintin/. */
export default function NavTintin() {
  return (
    <div className="nt-figure" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="nt-snowy"
        src="/tintin/snowy.png"
        alt=""
        width={40}
        height={60}
        draggable={false}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="nt-tintin"
        src="/tintin/tintin.png"
        alt=""
        width={92}
        height={156}
        draggable={false}
      />
    </div>
  );
}
