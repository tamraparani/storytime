import React from 'react';
import BlogPostTemplate from './BlogPostTemplate';
import dogmeat from '../images/dogmeat.jpg';

const thedogandtheshadow = () => {
  const blogContent = `

One day, a Dog was crossing a bridge with a big piece of meat in his mouth. As he looked down into the water, he saw his own reflection. But he thought it was another Dog holding an even bigger piece of meat!

Greedy and eager for more, he snapped at the "other Dog" to steal the larger piece. But as soon as he opened his mouth, his own meat fell into the water and was carried away by the current. In the end, he was left with nothing.

**Moral: Greed often leads to loss. Be grateful for what you have.**

**Der Hund und der Schatten**

Eines Tages überquerte ein Hund eine Brücke mit einem großen Stück Fleisch im Maul. Als er ins Wasser schaute, sah er sein eigenes Spiegelbild. Doch er dachte, es sei ein anderer Hund mit einem noch größeren Stück Fleisch!

Gierig und voller Verlangen schnappte er nach dem „anderen Hund“, um dessen Fleisch zu stehlen. Doch sobald er sein Maul öffnete, fiel sein eigenes Stück ins Wasser und wurde vom Strom fortgerissen. Am Ende blieb er mit leeren Pfoten zurück.

**Moral: Gier führt oft zum Verlust. Sei dankbar für das, was du hast.**`;

  return (
    <BlogPostTemplate
      title=" The Dog and the Shadow "
      author="Deepa Tamraparani"
      date="March 14, 2025"
      heroQuote="Every story is an experience you had in life without having to live it"
      content={blogContent}
      tags={['Stories']}
      relatedBlogPost={{
        title: "",
        slug: ""
      }}
      featuredImage={{
        src: dogmeat
      }}
    />
  );
};

export default thedogandtheshadow;
