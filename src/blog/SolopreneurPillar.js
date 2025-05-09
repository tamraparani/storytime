import React from 'react';
import BlogPostTemplate from './BlogPostTemplate';
import pillars from '../images/pillars.jpeg';

const SolopreneurPillar = () => {
  const blogContent = `
  Quite a long time ago, there lived two talking birds with their parents. One day when their parents were away, a villager who generally had an eye on those special birds caught them and took them away. One of the birds got away from the trap and looked for his parents. The bird, at last, arrived at a hermitage where it was welcomed and had some food. He lived joyfully.


  An explorer once ran over the other bird that the villager caught. He talked very rudely to him. He was shocked to see a talking bird but at the same time was angry with his way of behaving. The explorer visited the hermitage and recognised a similar talking bird, yet this bird talked respectfully and welcomed him to remain there.


  **Moral of the Story**
  Staying in a good company gives us a good way of behaving. Bad company influences our way of behaving negatively.

  **German Version**

  Vor einer sehr langer Zeit lebten zwei sprechende Vögel mit ihren Eltern. Eines Tages, als ihre Eltern fort waren, fing ein Dorfbewohner, der diese besonderen Vögel immer im Auge behielt, sie und nahm sie mit. Einer der Vögel konnte aus der Falle entkommen und suchte nach seinen Eltern. Der Vogel kam schließlich in eine Einsiedelei, wo er willkommen geheißen und gefüttert wurde. Er lebte glücklich.

  Ein Entdecker traf eines Tages auf den anderen Vogel, den der Dorfbewohner gefangen hatte. Er sprach ihn sehr unhöflich an. Er war überrascht, einen sprechenden Vogel zu sehen, war aber gleichzeitig über sein Verhalten verärgert. Der Entdecker besuchte die Einsiedelei und erkannte einen ähnlichen sprechenden Vogel, der jedoch höflich sprach und ihn einlud, dort zu bleiben.

**Moral der Geschichte**

In guter Gesellschaft zu sein, hilft uns, uns gut zu benehmen. Schlechte Gesellschaft beeinflusst unser Verhalten negativ.



  `;

  return (
    <BlogPostTemplate
      title="The Talking Birds"
      author="Deepa Tamraparani"
      date="March 9, 2025"
      heroQuote="Every story is an experience you had in life without having to live it"
      content={blogContent}
      tags={['CHildhood Stories in German']}
      relatedBlogPost={{
        title: "",
        slug: ""
      }}
      featuredImage={{
        src: pillars,
        alt: "A serene lake at sunrise"
      }}
    />
  );
};

export default SolopreneurPillar;
