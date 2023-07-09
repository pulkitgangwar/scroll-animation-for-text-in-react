# Scroll animation for text in React

We will learn how to create a simple scroll animation. We will not use any animation library. The animation we will be creating looks like this.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1688892951257/5c7ecbf7-cd51-440b-9b14-df533a0f24bb.gif)

The idea is that we will define two opacities. The default opacity will be 0.2 while the opacity when the text is visible will be 1. We will also divide the sentence into an array of strings so that we can work on each word individually. After that, we will define a threshold for each word. After the word has crossed that threshold the word will get an opacity of 1.

Let's first initialize an empty react-typescript project with tailwindcss.

```bash
yarn create vite
```

> You can refer to this [link](https://tailwindcss.com/docs/guides/vite) to install tailwindcss with react.

Let's create a scroller component with some styles.

```typescript
import { useEffect, useRef, useState } from "react";

function Scroller() {

  return (
    <>
      <section className="bg-black h-[500vh] text-center">
      
      </section>
    </>
  );
}

export default Scroller;
```

Now we have to add a scroll event on the window.

```typescript
import { useEffect, useRef, useState } from "react";

function Scroller() {

useEffect(() => {
    function scroller(e: any) {
    }

    if (sectionRef.current) {
      window.addEventListener("scroll", scroller);
    }

    return () => {
      window?.removeEventListener("scroll", scroller);
    };
  }, []);

  return (
    <>
      <section className="bg-black h-[500vh] text-center">
      
      </section>
    </>
  );
}

export default Scroller;
```

We are simply just adding an event listener on the window and cleaning up the listener on unmount.

Now to calculate how much section is scrolled we will use refs and getboundingclientrect for the container section.

```typescript
import { useEffect, useRef, useState } from "react";

function Scroller() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [progress,setProgress] = useState(0);

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

      }
        }
    
        if (sectionRef.current) {
          window.addEventListener("scroll", scroller);
        }
    
        return () => {
          window?.removeEventListener("scroll", scroller);
        };
      }, []);

      return (
        <>
          <section ref={sectionRef} className="bg-black h-[500vh] text-center">
          
          </section>
        </>
      );
}

export default Scroller;
```

To calculate the scroll percentage we are taking the container's total height and the offset Y or top. We will divide these two values to get a value between 0 and 1. We are setting this value to our state.

Now let's complete our animation by adding the logic for text.

```typescript
import { useEffect, useRef, useState } from "react";

function Scroller() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [progress,setProgress] = useState(0);
    const text = "This text is animated on scroll";
    const totalTextLength = text.split(" ").length;

    useEffect(() => {

        function scroller(e: any) {
            if (sectionRef.current) {
            const elScrollTop = sectionRef.current.getBoundingClientRect().top;
            const elScrollHeight =
              sectionRef.current.getBoundingClientRect().height;
       
            const currentProgress =
              Math.abs(elScrollTop) / (elScrollHeight - window.innerHeight);
            if (currentProgress > 1.1) {
               // to stop from updating state when the content is not visible
              return;
            }
            setProgress(currentProgress);

          }
        }
    
        if (sectionRef.current) {
          window.addEventListener("scroll", scroller);
        }
    
        return () => {
          window?.removeEventListener("scroll", scroller);
        };
      }, []);

      return (
        <>
          <section ref={sectionRef} className="bg-black h-[500vh] text-center">
            <div className="fixed top-[50%] translate-y-[-50%] bg-black ">
              {text.split(" ").map((word, index) => {
                const textNumber = index + 1;
                const currentTextThreshold = (1 / totalTextLength) * textNumber;
                const opacity = progress >= currentTextThreshold ? 1 : 0.2;

                return (
                  <h1
                    key={`${word} ${index}`}
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
```

We have added a text string and split it on " " to make an array of strings. We are defining a threshold depending on the length of the array of strings. If the scroll progress (value between 0 and 1) has crossed that word threshold. We will give that word opacity of 1.

> You can refer to this [link](https://github.com/pulkitgangwar/scroll-animation-for-text-in-react) for the code.