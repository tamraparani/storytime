import React from 'react';
import BlogPostTemplate from './BlogPostTemplate';
import donkeyimage from '../images/donkey.jpeg';

const donkey = () => {
  const blogContent = `

  In a quiet little village, a curious donkey named Mandagati loved listening to the beautiful songs of a nightingale that sang every evening from a tall oak tree. Her voice was so magical that it made the whole forest stop and listen.

  One day, Mandagati couldn’t resist her curiosity and asked, “How do you sing so beautifully? What is your secret?”

  The nightingale smiled and said, “I drink the morning dew—it keeps my voice light and clear.”

  Mandagati eyes widened. “That’s it! If I drink only dew, I’ll sing just like you!”** She stopped eating grass and hay and decided to live only on tiny drops of dew.**

  Days passed, and Mandagati grew weaker and weaker. Her belly rumbled, her legs wobbled, and worst of all—she never sang a single note.

  One evening, as the nightingale sang her sweetest tune, Mandagati collapsed under the tree. The nightingale flew down and sighed, Mandagati, I never meant for you to stop eating! Singing isn’t just about what you drink—it’s about what you’re born to do.”

  Mandagati realized her mistake too late. Trying to be someone else had cost her everything.

  **Moral of the Story**

"Blindly following others without understanding their nature can lead to disaster. Be yourself, and appreciate your own strengths."

  **German Version**

  **Der Esel und die Nachtigall**

  In einem ruhigen kleinen Dorf lebte ein neugieriger Eselin namens Mandagati. Jeden Abend hörte er die wunderschöne Stimme einer Nachtigall, die auf einem hohen Eichenbaum sang. Ihr Gesang war so magisch, dass der ganze Wald still wurde, um zuzuhören.

  Eines Tages konnte Mandagati ihre Neugier nicht mehr zügeln und fragte: „Wie kannst du so schön singen? Was ist dein Geheimnis?“

  Die Nachtigall lächelte und sagte: „Ich trinke den Morgentau – er hält meine Stimme leicht und klar.“

  Mandagati Augen wurden groß. „Das ist es! Wenn ich nur noch Tau trinke, werde ich genauso singen wie du!“ Sie hörte auf, Gras und Heu zu fressen, und ernährte sich nur noch von winzigen Tautropfen.

  Tage vergingen, und Mandagati wurde immer schwächer. Ihr Bauch knurrte, ihre Beine zitterten, und das Schlimmste – sie sang nicht eine einzige Note.

  Eines Abends, als die Nachtigall ihr schönstes Lied sang, brach Mandagati unter dem Baum zusammen. Die Nachtigall flog zu ihr hinunter und seufzte: „Mandagati, ich habe nie gesagt, dass du aufhören sollst zu essen! Singen hängt nicht nur davon ab, was man trinkt – es ist eine Gabe.“

  Da erkannte Mandagati ihren Fehler – blind jemand anderem nachzueifern hatte ihn alles gekostet.

**Moral der Geschichte**

"Wer andere blind nachahmt, ohne seine eigene Natur zu verstehen, wird scheitern. Sei du selbst und schätze deine eigenen Stärken."
`;

  return (
    <BlogPostTemplate
      title=" The Donkey and the Nightingale "
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
        src: donkeyimage
      }}
    />
  );
};

export default donkey;
