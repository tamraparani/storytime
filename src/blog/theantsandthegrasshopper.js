import React from 'react';
import BlogPostTemplate from './BlogPostTemplate';
import antsandgrasshopper from '../images/antsandgrasshopper.jpg';

const theantsandthegrasshopper = () => {
  const blogContent = `

  On a cold winter’s day, a colony of ants was busy drying the grain they had gathered during the summer. As they worked, a starving Grasshopper came by, shivering and weak from hunger.

"Please, kind Ants," he pleaded, "Give me just a little food, or I will surely die."

The Ants stopped their work and asked, "What were you doing all summer? Why didn’t you store food like we did?"

The Grasshopper sighed and replied, "I was too busy singing and enjoying the warm days."

The Ants laughed and said, "If you spent the summer singing, then you must dance your way to bed hungry this winter!"

And with that, they went back to work, leaving the Grasshopper to learn his lesson the hard way.

**Moral: Hard work and preparation pay off, while laziness leads to hardship.**

**Die Ameisen und die Heuschrecke**

An einem kalten Wintertag waren die Ameisen fleißig dabei, das Getreide zu trocknen, das sie im Sommer gesammelt hatten. Da kam eine hungrige Heuschrecke vorbei, schwach und zitternd vor Kälte.

„Bitte, liebe Ameisen,“ flehte sie, „gebt mir etwas zu essen, sonst werde ich verhungern.“

Die Ameisen hielten inne und fragten: „Was hast du den ganzen Sommer über getan? Warum hast du keine Vorräte gesammelt?“

Die Heuschrecke seufzte und antwortete: „Ich hatte keine Zeit. Ich habe gesungen und die warmen Tage genossen.“

Die Ameisen lachten und sagten: „Wenn du den Sommer über gesungen hast, dann musst du jetzt wohl hungrig ins Bett tanzen!“

Und so arbeiteten sie weiter, während die Heuschrecke ihre Lektion auf die harte Tour lernte.

**Moral: Fleiß und Vorbereitung lohnen sich, während Faulheit zu Not führt.**`;

  return (
    <BlogPostTemplate
      title=" The Ants and the Grasshopper "
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
        src: antsandgrasshopper
      }}
    />
  );
};

export default theantsandthegrasshopper;
