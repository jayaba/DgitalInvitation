/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING DETAILS — edit everything about the invitation here.
 *  No other file needs to change for names, date, venue,
 *  wording, schedule or music.
 * ─────────────────────────────────────────────────────────────
 */
export const wedding = {
  couple: {
    groom: 'Eranga',
    bride: 'Piyumi',
  },

  date: {
    // Wedding date and start time, in ISO format with the Sri Lanka
    // offset (+05:30):  YYYY-MM-DDTHH:MM:SS+05:30
    // The date is real (21 December 2026).
    // ⚠ The TIME (09:00) is still a placeholder — replace it when known.
    iso: '2026-12-21T09:00:00+05:30',

    // While false, the site shows "December 2026" instead of the exact date.
    isConfirmed: true,

    // While false, the site shows "Time to be announced" and the calendar
    // entry is saved as an all-day event. Set to true once the time in
    // `iso` is correct.
    isTimeConfirmed: false,

    // Length of the celebration, used only for the "Save to calendar" entry.
    durationHours: 6,

    // Shown on the flowers that cover the calendar until a guest starts
    // brushing them away with a finger.
    revealHint: 'Brush the flowers away to reveal the date',

    monthLabel: 'December 2026',
    timePendingLabel: 'Time to be announced',

    // Dates and times are always shown in the venue's time zone,
    // wherever the guest happens to be.
    timeZone: 'Asia/Colombo',
  },

  venue: {
    name: 'Senuri Grand Castello',
    location: 'Diulapitiya, Sri Lanka',
    // The playful lines on the venue card.
    lateLine: "Don't be fashionably late. We've got a wedding to celebrate!",
    whereLine: 'Where are you? 😉',
    // A normal Google Maps link (no API key needed). To point at an exact
    // pin, open the venue in Google Maps, tap Share and paste that link here.
    mapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Senuri+Grand+Castello+Diulapitiya+Sri+Lanka',
  },

  // Personal invitations: add ?to=Guest+Name to the end of the link you
  // send, and the guest sees "Dear Guest Name". See README.
  guest: {
    greeting: 'Dear',
  },

  opening: {
    eyebrow: 'Together with their families',
    note: 'invite you to celebrate their wedding',
    button: 'View Invitation',
  },

  hero: {
    // Secondary heading beneath the couple's names.
    heading: 'Love, Laughter & Happily Ever After',
    // The welcoming line shown beneath that heading.
    tagline: "Put on your best, bring your brightest smiles, and let's celebrate!",
    // Two closing lines at the foot of the hero, under the date and venue.
    inviteLead: "We've saved a place for you. You're on the guest list!",
    inviteNote: "Bring the energy, we'll bring the celebration!",
  },

  // The two pre-wedding photographs. Put the files in `public/images/`.
  // Until a file is there, the site simply leaves that photo out.
  photos: {
    hero: {
      file: 'images/preshoot-2.jpg', // the landscape photograph
      alt: 'Eranga and Piyumi',
    },
    story: {
      file: 'images/preshoot-3.jpg',
      alt: 'Eranga and Piyumi together',
      eyebrow: 'A little about us',
      title: 'Our Story',
      caption: 'A beautiful journey, leading to forever.',
      // Small closing line under the couple's names.
      closing: 'And now, our favourite chapter begins...',
      // Optional: a few sentences of your own story. Leave '' to show none.
      text: '',
    },
  },

  invitation: {
    title: 'You Are Invited',
    // Small line between the heading and the couple's names.
    intro: 'To celebrate their wedding',
    // The main wording, then a supporting line shown in italic beneath it.
    message:
      'Blessed with the love of our families, we look forward to sharing this beautiful occasion with those who mean so much to us.',
    supportingMessage:
      'Our happiest moments are made even sweeter when shared with the people we love.',
  },

  countdown: {
    title: 'Counting Down to Forever',
    finishedMessage: 'The day we have been waiting for is here.',
  },

  // Leave `time` empty ('') to show "Time to be announced".
  // `icon` is one of: 'guests', 'heart', 'celebration', 'meal', 'music'.
  //
  // For each event:
  //   time        shown on the lavender ribbon; '' shows "To be announced"
  //   timeIcon    'infinity' puts an infinity sign either side of the time
  //   icon        the round marker: 'guests', 'poruwa', 'cheers', 'heart',
  //               'celebration', 'meal' or 'music'
  //   note        the playful handwritten line on the brush stroke
  //   art         the illustration: 'welcome', 'poruwa' or 'reception'
  //   featured    true gives the card a little extra emphasis
  scheduleHeading: {
    eyebrow: 'Order of the Day',
    title: 'Wedding Day Schedule',
    timePending: 'To be announced',
  },

  schedule: [
    {
      time: '09:00 AM',
      icon: 'guests',
      title: 'Guest Arrival',
      description: 'A warm welcome as family and friends gather.',
      note: "Don't be late! The celebration starts with you!",
      art: 'welcome',
    },
    {
      // Set to '' to show "To be announced" instead.
      time: '10:18 AM',
      icon: 'poruwa',
      title: 'Poruwa Ceremony',
      description: 'We exchange our vows, surrounded by the people we love.',
      note: "We've got lots of flowers... we need you to shower us with them!",
      art: 'poruwa',
      featured: true,
    },
    {
      time: 'Time: Unlimited',
      timeIcon: 'infinity',
      icon: 'cheers',
      title: 'Celebrations & Reception',
      description: "Come hungry, leave happy, and dance like nobody's watching!",
      note: 'Eat, dance, laugh and celebrate with us! Party until the energy lasts!',
      art: 'reception',
    },
  ],

  // Replies are sent as a WhatsApp message — no server or database needed.
  rsvp: {
    enabled: true,
    eyebrow: 'A little note from us',
    title: 'Will You Join Us?',
    message: "We've saved a place just for you... now, you're coming, right? ❤️",
    supportingMessage: "We'd love to know if you'll be celebrating with us!",

    // Who receives the replies. Numbers are in international format with
    // digits only (Sri Lanka: 94 + the number without its leading 0).
    // `name` is shown on the button; leave it '' to show the number instead.
    // With an empty list, the reply buttons are hidden and guests are asked
    // to reply to the message that brought the invitation.
    whatsappContacts: [
      { name: '', number: '94785882732' },
      { name: '', number: '94787116650' },
    ],
    contactLabel: 'Need to let us know? Just drop us a message!',
    noNumberNote: 'Please reply to the message that brought you this invitation.',

    // Optional, e.g. 'Kindly reply by 1 December 2026'. Leave '' to hide.
    replyBy: '',

    // The two choices, and what the page says back once one is picked.
    acceptLabel: 'Count me in!',
    declineLabel: "Sorry, can't make it",
    acceptConfirmation:
      "We're so happy you're joining us! Get ready for a day full of love, laughter and celebrations!",
    declineConfirmation:
      "We'll miss having you there, but we'll be thinking of you. Sending lots of love!",

    // What is written into the guest's WhatsApp message for each choice.
    acceptText: 'Count me in! We joyfully accept your invitation and look forward to celebrating with you.',
    declineText: "Sorry, we can't make it, but we send you our love and best wishes.",
  },

  music: {
    enabled: true,
    // File inside the `public/` folder. See public/music/README.txt.
    file: 'music/wedding-song.mp3',
    // true = start the music when the guest taps "Open Invitation".
    // false = only when they tap the music button.
    playOnOpen: false,
    volume: 0.6,
  },
};
