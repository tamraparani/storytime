import React from 'react';
import BlogPostTemplate from './BlogPostTemplate';
import wolfandthecrane from '../images/wolfandcrane.jpg';

const wolfandcrane = () => {
  const blogContent = `

  One day, a greedy Wolf got a bone stuck in his throat. He was in great pain and could neither eat nor breathe properly. Desperate, he called upon a Crane and promised her a great reward if she would help him.

The Crane, though cautious, agreed. She stretched her long neck into the Wolf’s mouth and carefully pulled out the bone. When the job was done, she stepped back and asked for her payment.

The Wolf, grinning and showing his sharp teeth, laughed and said, "Payment? You should be grateful that I let you take your head out of my jaws unharmed!"

The Crane realized her mistake—she had trusted a wicked creature. She left, wiser but unpaid.

**Moral: When you serve the wicked, do not expect a reward. Be thankful if you escape unharmed.**

**Der Wolf und der Kranich**

Eines Tages blieb einem gierigen Wolf ein Knochen im Hals stecken. Er hatte große Schmerzen und konnte weder richtig fressen noch atmen. Verzweifelt rief er einen Kranich zu sich und versprach ihm eine große Belohnung, wenn er ihm helfen würde.

Der Kranich war misstrauisch, aber willigte ein. Vorsichtig steckte er seinen langen Hals in das Maul des Wolfs und zog den Knochen heraus. Als er fertig war, trat er zurück und verlangte seinen Lohn.

Doch der Wolf grinste, zeigte seine scharfen Zähne und lachte: „Lohn? Du solltest dankbar sein, dass ich dich lebendig aus meinem Maul gelassen habe!“

Der Kranich erkannte seinen Fehler—er hatte einem Bösen vertraut. Ohne Lohn, aber mit einer wertvollen Lektion, flog er davon.

**Moral: Wer den Bösen dient, sollte keine Belohnung erwarten. Sei froh, wenn du unversehrt entkommst.**
`;

  return (
    <BlogPostTemplate
      title=" The Wolf and the Crane "
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
        src: wolfandthecrane
      }}
    />
  );
};

export default wolfandcrane;
