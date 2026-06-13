type BaseAd = {
  // id: number;
  // type: string;
  href: string;
};

type AdBanner = BaseAd & {
  src: string;
};

type AdButton = BaseAd & {
  text: string;
};

export type { AdBanner, AdButton };
