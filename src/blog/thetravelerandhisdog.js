import React from 'react';
import BlogPostTemplate from './BlogPostTemplate';
import travelleranddog from '../images/travelleranddog.jpg';

const thetravelerandhisdog = () => {
  const blogContent = `

  A traveler was preparing to leave for a long journey. His bags were packed, his shoes were laced, and everything was in order. But as he stood by the door, he noticed his Dog stretching lazily in the sunlight.

"Why are you just standing there with your mouth open?" the traveler scolded. "Everything is ready but you! Hurry up and come with me!"

The Dog wagged his tail and replied with a smile, "Oh, master! I have been ready all along. It is you that I have been waiting for."

**Moral: Those who are slow often blame their delay on others who are already prepared.**

**Der Reisende und sein Hund**

Ein Reisender bereitete sich auf eine lange Reise vor. Seine Taschen waren gepackt, seine Schuhe geschnürt, und alles war bereit. Doch als er an der Tür stand, sah er, wie sein Hund sich gemütlich streckte.

„Warum stehst du da nur herum?“ schimpfte der Reisende. „Alles ist bereit, nur du nicht! Beeil dich und komm mit!“

Der Hund wedelte mit dem Schwanz und lächelte: „Oh, mein Herr! Ich bin schon lange fertig. Ich warte nur auf dich.“

**Moral: Wer trödelt, gibt oft den Fleißigen die Schuld an der Verzögerung.**
`;

  return (
    <BlogPostTemplate
      title=" The Traveler and His Dog "
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
        src: travelleranddog
      }}
    />
  );
};

export default thetravelerandhisdog;
