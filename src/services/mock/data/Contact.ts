export interface ContactInfo {
  email: string;
  phone: string;
  phoneFormatted: string;
  contactFormUrl: string;
  facebookUrl?: string;
  youtubeUrl?: string;
}

export const mockContactInfo: ContactInfo = {
  email: 'skyacademy210@gmail.com',
  phone: '+84901959142',
  phoneFormatted: '(+84) 901 959 142',
  contactFormUrl: 'https://tinyurl.com/contactskyacademy',
  facebookUrl: 'https://www.facebook.com/tienganhsky/',
  youtubeUrl: 'https://www.youtube.com/@tienganhsky',
};

