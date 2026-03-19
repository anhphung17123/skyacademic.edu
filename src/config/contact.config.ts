export interface ContactInfo {
  email: string;
  phone: string;
  phoneFormatted: string;
  phone2?: string;
  phone2Formatted?: string;
  contactFormUrl: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

/** SKY SHARES – Community Classes (Free): links and join group */
export interface SkyShareConfig {
  skysharesUrl: string;
  languageClubUrl: string;
  whatsappGroupUrl?: string;
  zaloGroupUrl?: string;
}

export const CONTACT_INFO: ContactInfo = {
  email: 'skyacademy210@gmail.com',
  phone: '+84901959142',
  phoneFormatted: '(+84) 901 959 142',
  phone2: '84797490540',
  phone2Formatted: '079 749 0540',
  contactFormUrl: 'https://bit.ly/4skPVP9',
  facebookUrl: 'https://www.facebook.com/skyacademy0/',
  youtubeUrl: 'https://www.youtube.com/@skyacademy0',
  instagramUrl: 'https://www.instagram.com/skyacademy0',
  tiktokUrl: 'https://www.tiktok.com/@skyacademy0',
};

export const SKY_SHARE_CONFIG: SkyShareConfig = {
  skysharesUrl: 'https://tinyurl.com/Skyshares',
  languageClubUrl: 'https://tinyurl.com/Language-sky-club',
  whatsappGroupUrl: 'https://wa.me/84797490540',
  zaloGroupUrl: undefined,
};
