import { ITEMS_TO_FETCH } from "../constants";
import { Estate, SRealityApiResponse } from "./types";

const srealityAPIBaseUrl = "https://www.sreality.cz/api/en/v2/estates";

type Property = {
  name: string;
  price: number | null;
  img: string;
  url: string;
  locality: string;
};

const offerTypes = {
  sale: "1",
  rent: "2",
  auction: "3",
  apartment_share: "4",
} as const;

const propertyTypes = {
  apartment: "1",
  house: "2",
  land: "3",
  commercial: "4",
  other: "5",
} as const;

type OfferType = keyof typeof offerTypes;
type PropertyType = keyof typeof propertyTypes;

// I might have gone a little overboard with this... I could just search by the value by doing Object.entries().find(), but this is a little more performant.. and fun
function _switchKeysAndValues<T extends Record<string, string>>(
  obj: T
): Record<(typeof obj)[keyof typeof obj], keyof typeof obj> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {} as any);
}

const offerTypesReverse = _switchKeysAndValues(offerTypes);
const propertyTypesReverse = _switchKeysAndValues(propertyTypes);

// This mapping is derived from data from the following document: https://admin.sreality.cz/doc/import.pdf
const subcategories = {
  "1": "1+kk",
  "2": "1+1",
  "3": "2+kk",
  "4": "2+1",
  "5": "3+kk",
  "6": "3+1",
  "7": "4+kk",
  "8": "4+1",
  "9": "5+kk",
  "10": "5+1",
  "11": "6-a-vice",
  "12": "atypicky",
  // There were more items here, but the sreality website doesn't even show any of the other ones as options for filtering so I'm not including them here
};

export async function _sRealityApiFetchProperties(
  count: number,
  offerType: OfferType,
  propertyType: PropertyType
): Promise<SRealityApiResponse> {
  const params = {
    category_main_cb: propertyTypes[propertyType],
    category_type_cb: offerTypes[offerType],
    per_page: String(count),
    no_auction: "1",
  };

  const srealityAPIUrl = `${srealityAPIBaseUrl}?${new URLSearchParams(params)}`;

  const res = await fetch(srealityAPIUrl);
  const parsed = await res.json();
  return parsed as SRealityApiResponse;
}

function estateObjectToPublicUrl(estate: Estate) {
  const offerType =
    offerTypesReverse[
      String(estate.seo.category_type_cb) as keyof typeof offerTypesReverse
    ];
  const propertyType =
    propertyTypesReverse[
      String(estate.seo.category_main_cb) as keyof typeof propertyTypesReverse
    ];
  const subcategory =
    subcategories[
      String(estate.seo.category_sub_cb) as keyof typeof subcategories
    ];

  return `https://www.sreality.cz/detail/${offerType}/${propertyType}/${subcategory}/${estate.seo.locality}/${estate.hash_id}`;
}

export async function fetchProperties(
  count = ITEMS_TO_FETCH,
  offerType: OfferType = "sale",
  propertyType: PropertyType = "apartment"
): Promise<Property[]> {
  const data = await _sRealityApiFetchProperties(
    count,
    offerType,
    propertyType
  );
  return data._embedded.estates.map((estate) => {
    return {
      name: estate.name,
      price:
        estate.price_czk.value_raw === 1 ? null : estate.price_czk.value_raw,
      img: estate._links.images[0].href,
      url: estateObjectToPublicUrl(estate),
      locality: estate.locality,
    };
  });
}
