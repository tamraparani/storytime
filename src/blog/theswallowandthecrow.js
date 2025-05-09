import React from 'react';
import BlogPostTemplate from './BlogPostTemplate';
import swallowandcrow from '../images/swallowandcrow.jpg';

const theswallowandthecrow = () => {
  const blogContent = `

One day, a Swallow and a Crow were arguing about their feathers. The Swallow, proud of its sleek and delicate plumage, boasted, "Look how beautiful and graceful my feathers are! Surely, I am the better-dressed bird."

  The Crow simply chuckled and replied, "That may be true in spring, but when winter comes, your fine feathers will not keep you warm. My thick black coat may not be as elegant, but it protects me when the cold winds blow."

  Moral: Fair-weather friends are not worth much.

  **Die Schwalbe und die Krähe**
  Eines Tages stritten sich eine Schwalbe und eine Krähe über ihr Gefieder. Die Schwalbe, stolz auf ihr glattes und zartes Federkleid, prahlte: „Sieh nur, wie schön und elegant meine Federn sind! Ich bin eindeutig der am besten gekleidete Vogel.“

  Die Krähe lachte nur und antwortete: „Das mag im Frühling so sein, aber wenn der Winter kommt, werden deine feinen Federn dich nicht wärmen. Mein dickes schwarzes Gefieder mag nicht so hübsch sein, aber es schützt mich, wenn der kalte Wind weht.“

  **Moral: Schönwetterfreunde sind nicht viel wert.**
  `;

  return (
    <BlogPostTemplate
      title="The Swallow and the Crow "
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
        src: swallowandcrow
      }}
    />
  );
};

export default theswallowandthecrow;
