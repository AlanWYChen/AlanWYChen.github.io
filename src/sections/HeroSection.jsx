export default function HeroSection() {
  return (
    <section className="hero wrap" aria-labelledby="name">
      <div className="hero-title">
        <div className="intro-line">
          <p>Hey, I’m</p>
          <span aria-hidden="true" />
        </div>
        <h1 id="name">
          Alan Chen<span>.</span>
        </h1>
        <div className="hero-caption">
          <p>
            SOFTWARE
            <br />
            ENGINEER
          </p>
        </div>
      </div>
      <div className="hero-bottom">
        <p>
          I build across the stack.
          <br />
          <span>From the interface to the infrastructure.</span>
        </p>
        <a className="scroll-link" href="#experience">
          SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
