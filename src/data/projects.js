export const pickPicProject = {
  slug: 'pick-pic',
  name: 'Pick-pic',
  type: 'MOBILE PROJECT',
  lead: ['A shared space for photos.', 'A little friendly voting.'],
  description:
    'I built an Android app that helps groups choose their best photos from shared albums. Swipe-based voting feeds an ELO-style ranking system, turning individual preferences into ranked selections and downloadable “best-of” albums. Integration with Android’s native photo apps connects the shared gallery to users’ existing photo libraries.',
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
    'I built a native macOS clipboard manager with Swift, AppKit, and SwiftUI. It keeps recent text and image copies accessible from the menu bar and preserves history across restarts using AES-256-GCM encryption with a key stored in macOS Keychain. Selected entries return to the system clipboard for normal pasting, including through Apple’s Universal Clipboard.',
  features: [
    'Text & image history',
    'AES-256-GCM encryption',
    'Works with Apple’s Universal Clipboard',
    'History stays on your Mac',
  ],
  aside: 'Built for the menu bar. Ready for your next paste.',
  sourceUrl: 'https://github.com/AlanWYChen/Stampede',
  sourceLabel: 'View Stampede source on GitHub',
  image: {
    className: 'project-icon',
    src: '/projects/stampede-icon.png',
    alt: 'Stampede app icon',
    width: 1106,
    height: 1106,
    caption: 'Stampede · Clipboard history for macOS',
  },
};
