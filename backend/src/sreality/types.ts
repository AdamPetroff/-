/** SReality API response type extracted with the help of GPT4 */
export type SRealityApiResponse = {
  meta_description: string;
  result_size: number;
  _embedded: {
    estates: Estate[];
    is_saved: {
      email_notification: boolean;
      notification_advert_count: number;
      stack_id: number;
      push_notification: boolean;
      _links: {
        self: Link;
      };
      removed: boolean;
      saved: boolean;
    };
    not_precise_location_count: {
      result_size_auction: number;
      result_size: number;
      _links: {
        self: Link;
      };
    };
  };
  filterLabels: any[];
  title: string;
  filter: {
    category_main_cb: string;
    suggested_districtId: number;
    category_type_cb: string;
    suggested_regionId: number;
  };
  _links: {
    self: Link;
    clusters_with_bounding_box_of_first_10: Link;
    rss: Link;
  };
  locality: string;
  locality_dativ: string;
  logged_in: boolean;
  per_page: number;
  category_instrumental: string;
  page: number;
  filterLabels2: Record<string, string>;
};

export type Estate = {
  labelsReleased: any[][];
  has_panorama: number;
  labels: string[];
  is_auction: boolean;
  labelsAll: string[][];
  seo: {
    category_main_cb: number;
    category_sub_cb: number;
    category_type_cb: number;
    locality: string;
  };
  exclusively_at_rk: number;
  category: number;
  has_floor_plan: number;
  _embedded: {
    favourite: {
      is_favourite: boolean;
      _links: {
        self: Link;
      };
    };
    note: {
      note: string;
      _links: {
        self: Link;
      };
      has_note: boolean;
    };
  };
  paid_logo: number;
  locality: string;
  has_video: boolean;
  advert_images_count: number;
  new: boolean;
  auctionPrice: number;
  type: number;
  hash_id: number;
  attractive_offer: number;
  price: number;
  price_czk: {
    value_raw: number;
    unit: string;
    name: string;
  };
  _links: {
    dynamicDown: Link[];
    dynamicUp: Link[];
    iterator: Link;
    self: Link;
    images: Link[];
    image_middle2: Link[];
  };
  rus: boolean;
  name: string;
  region_tip: number;
  gps: {
    lat: number;
    lon: number;
  };
  has_matterport_url: boolean;
};

type Link = {
  href: string;
  profile?: string;
  title?: string;
};
