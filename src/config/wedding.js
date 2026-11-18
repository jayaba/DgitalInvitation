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

    // Shown on the flowers that cover the calendar until a guest touches them.
    revealHint: 'Touch the flowers to reveal the date',

    monthLabel: 'December 2026',
    timePendingLabel: 'Time to be announced',

    // Dates and times are always shown in the venue's time zone,
    // wherever the guest happens to be.
    timeZone: 'Asia/Colombo',
  },

  venue: {
    name: 'Senuri Grand Castello',
    location: 'Diulapitiya, Sri Lanka',
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
    tagline: 'Two Hearts, One Beautiful Journey',
    subtitle: 'Join us as we celebrate our love and begin our forever.',
  },

  invitation: {
    title: 'You Are Invited',
    paragraphs: [
      'With the blessings of our families, we joyfully invite you to celebrate the beginning of our forever.',
      'Together with our loved ones, we would be delighted to have your presence as we begin this beautiful journey of love and togetherness.',
    ],
  },

  countdown: {
    title: 'Counting Down to Forever',
    finishedMessage: 'The day we have been waiting for is here.',
  },

  // Leave `time` empty ('') to show "Time to be announced".
  schedule: [
    {
      time: '',
      title: 'Guest Arrival',
      description: 'A warm welcome as family and friends gather.',
    },
    {
      time: '',
      title: 'Wedding Ceremony',
      description: 'We exchange our vows, surrounded by the people we love.',
    },
    {
      time: '',
      title: 'Celebrations & Reception',
      description: 'Good food, music and joyful moments together.',
    },
  ],

  // Replies are sent as a WhatsApp message — no server or database needed.
  rsvp: {
    enabled: true,
    title: 'Will You Join Us?',
    message: 'It would mean so much to celebrate this day with you. Kindly let us know if you will be able to join us.',

    // Who receives the replies. Numbers are in international format with
    // digits only (Sri Lanka: 94 + the number without its leading 0).
    // `name` is shown on the button; leave it '' to show the number instead.
    // With an empty list, the reply buttons are hidden and guests are asked
    // to reply to the message that brought the invitation.
    whatsappContacts: [
      { name: '', number: '94785882732' },
      { name: '', number: '94787116650' },
    ],
    sendToLabel: 'Send your reply on WhatsApp to',
    noNumberNote: 'Please reply to the message that brought you this invitation.',

    // Optional, e.g. 'Kindly reply by 1 December 2026'. Leave '' to hide.
    replyBy: '',

    acceptLabel: 'Joyfully Accept',
    declineLabel: 'Regretfully Decline',
    acceptText: 'We joyfully accept your invitation and look forward to celebrating with you.',
    declineText: 'With regret, we are unable to attend, but we send you our love and best wishes.',
  },

  closing: {
    signOff: 'With Love,',
    message: 'Your presence will make our special day even more memorable.',
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
