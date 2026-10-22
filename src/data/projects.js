export const pickPicProject = {
  slug: 'pick-pic',
  name: 'Pick-pic',
  type: 'MOBILE PROJECT',
  lead: ['A shared space for photos.', 'A little friendly voting.'],
  description:
    'A mobile side project I built. Pick-pic brings shared photo collections and swipe-based voting together.',
  features: ['Shared photo collections', 'Swipe to vote', 'Invite friends'],
  aside: 'Yes, we tested it with cat memes.',
  sourceUrl: 'https://github.com/AlanWYChen/Pick-Pic',
  image: {
    className: 'project-screen',
    src: '/projects/pick-pic-gallery.png',
    alt: 'Pick-pic shared gallery showing cat photos and Invite, Filter, Upload, and Rank controls',
    width: 853,
    height: 1844,
    caption: 'Pick-pic · Shared photo gallery',
  },
};

export const stampedeProject = {
  slug: 'stampede',
  name: 'Stampede',
  type: 'NATIVE macOS PROJECT',
  lead: ['Your recent copies.', 'One menu away.'],
  description:
    'A native macOS menu bar app I built with Swift, AppKit, and SwiftUI. Stampede keeps recent text and image copies within reach, with encrypted local history that survives restarts.',
  features: [
    'Text & image history',
    'AES-256-GCM encryption',
    'Universal Clipboard support',
    'History stays on your Mac',
  ],
  aside: 'Built for the menu bar. Ready for your next paste.',
  sourceUrl: 'https://github.com/AlanWYChen/Stampede',
  sourceLabel: 'View Stampede source on GitHub',
  image: {
    className: 'project-icon',
    src: '/projects/stampede-icon.png',
    alt: 'Stampede app icon',
    width: 256,
    height: 256,
    caption: 'Stampede · Clipboard history for macOS',
  },
};
