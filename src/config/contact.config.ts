export interface ContactInfo {
  email: string;
  phone: string;
  phoneFormatted: string;
  contactFormUrl: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

export const CONTACT_INFO: ContactInfo = {
  email: 'skyacademy210@gmail.com',
  phone: '+84901959142',
  phoneFormatted: '(+84) 901 959 142',
  contactFormUrl: 'https://bit.ly/4skPVP9',
  facebookUrl: 'https://www.facebook.com/skyacademy0/',
  youtubeUrl: 'https://www.youtube.com/@skyacademy0',
  instagramUrl: 'https://www.instagram.com/skyacademy0',
  tiktokUrl: 'https://www.tiktok.com/@skyacademy0',
};
