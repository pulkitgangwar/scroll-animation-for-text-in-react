import { useEffect, useRef, useState } from "react";

function Scroller() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const text = "This text is animated on scroll";
  const totalTextLength = text.split(" ").length;

  console.log("rerender");

  useEffect(() => {
    function scroller(e: any) {
      if (sectionRef.current) {
        const elScrollTop = sectionRef.current.getBoundingClientRect().top;
        const elScrollHeight =
          sectionRef.current.getBoundingClientRect().height;

        const currentProgress =
          Math.abs(elScrollTop) / (elScrollHeight - window.innerHeight);
        if (currentProgress > 1.1) {
          return;
        }
        setProgress(currentProgress);
        // console.log(progress, "progress");
      }
    }

    if (sectionRef.current) {
      window.addEventListener("scroll", scroller);
    }

    return () => {
      window?.removeEventListener("scroll", scroller);
    };
  }, [progress]);

  return (
    <>
      {/* <section className="h-[100vh]">first</section> */}
      <section ref={sectionRef} className="bg-black h-[500vh] text-center">
        <div className="fixed top-[50%] translate-y-[-50%] bg-black ">
          {text.split(" ").map((word, index) => {
            const textNumber = index + 1;
            const textOpacityThreshold = (1 / totalTextLength) * textNumber;
            const opacity = progress >= textOpacityThreshold ? 1 : 0.2;

            return (
              <h1
                key={word}
                className={`transition ease-in-out delay-15 font-black inline-block px-[4px] md:px-[8px] lg:px-[16px] text-[48px] md:text-[64px] lg:text-[102px] text-white`}
                style={{ opacity }}
              >
                {word}
              </h1>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Scroller;
