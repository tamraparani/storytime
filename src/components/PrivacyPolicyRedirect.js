import React from 'react';
import BlogPostTemplate from '../blog/BlogPostTemplate';


const PrivacyPolicyRedirect = () => {
  const blogContent = `


## Website Information

Website: akbar-birbal-deutsch.de

## Personal Data Protection

We take the protection of your personal data very seriously. This privacy policy informs you about the collection, processing, and use of personal data on our website.

## Data Collection and Processing

- We only collect personal data when you voluntarily provide it (e.g., through contact forms or comments)
- We do not sell or share your personal information with third parties
- We use Google AdSense for advertising, which may collect anonymous usage data

## Cookies

- Our website uses cookies to improve user experience
- You can adjust your browser settings to refuse cookies

## External Services

- This website uses Google AdSense for advertising
- Google may use cookies and similar technologies to serve personalized ads

## Data Protection Rights

You have the right to:

- Request access to your personal data
- Request correction of inaccurate data
- Request deletion of your data
- Object to data processing

## Contact for Data Protection Inquiries

Email: tamraparani.d@gmail.com

## Changes to Privacy Policy

We may update this policy periodically. Please review it regularly.

## Last Updated: March 2025
  `;

  return (
    <BlogPostTemplate
      title=" Privacy Policy "
      author="Deepa Tamraparani"
      date="March 14, 2025"
      content={blogContent}
      tags={['privacy policy']}


    />
  );
};

export default PrivacyPolicyRedirect;
