import { headers } from "next/headers";
import { getMyProfile } from "@/lib/auth/dal";
import type { Offer, TitleDetails } from "@/lib/catalogue/types";
import { hasPublicEnv } from "@/lib/env";
import { DEFAULT_REGION, isRegionCode, REGIONS, type RegionCode } from "@/lib/regions";
import { tmdbImageUrl } from "@/lib/tmdb/images";

/**
 * Which country's services to show: your profile setting if you're signed in,
 * otherwise the country Vercel detects from your connection, otherwise the US.
 */
async function viewerRegion(): Promise<RegionCode> {
  if (hasPublicEnv()) {
    const profile = await getMyProfile();
    if (profile && isRegionCode(profile.region)) return profile.region;
  }
  const country = (await headers()).get("x-vercel-ip-country");
  return isRegionCode(country) ? country : DEFAULT_REGION;
}

function uniqueByProvider(offers: Offer[]): Offer[] {
  const seen = new Set<number>();
  return offers.filter((offer) => !seen.has(offer.providerId) && seen.add(offer.providerId));
}

function ProviderList({ label, offers }: { label: string; offers: Offer[] }) {
  if (offers.length === 0) return null;
  return (
    <div>
      <h3 className="text-sm text-program">{label}</h3>
      <ul className="mt-2 flex flex-wrap gap-2">
        {offers.map((offer) => (
          <li
            key={`${offer.providerId}-${offer.offerType}`}
            className="flex items-center gap-2 rounded-md border border-seam bg-curtain py-1 pl-1 pr-3 text-sm"
          >
            {offer.logoPath ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tmdbImageUrl(offer.logoPath, 92)}
                alt=""
                width={28}
                height={28}
                loading="lazy"
                className="h-7 w-7 rounded"
              />
            ) : null}
            {offer.providerName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function WhereToWatch({ title }: { title: TitleDetails }) {
  const region = await viewerRegion();
  const availability = title.availability[region];
  const offers = availability?.offers ?? [];
  const stream = uniqueByProvider(offers.filter((offer) => offer.offerType === "flatrate"));
  const free = uniqueByProvider(offers.filter((offer) => offer.offerType === "free" || offer.offerType === "ads"));
  const buy = uniqueByProvider(offers.filter((offer) => offer.offerType === "rent" || offer.offerType === "buy"));

  return (
    <div className="mt-4 space-y-4">
      {offers.length === 0 ? (
        <p className="text-sm text-program">
          Not available to stream, rent or buy in {REGIONS[region]} right now.
        </p>
      ) : (
        <>
          <ProviderList label="Included with a subscription" offers={stream} />
          <ProviderList label="Free" offers={free} />
          <ProviderList label="Rent or buy" offers={buy} />
        </>
      )}
      <p className="text-xs text-program">
        Showing {REGIONS[region]}. Availability data from{" "}
        <a href="https://www.justwatch.com" className="link" rel="noopener" target="_blank">
          JustWatch
        </a>
        {availability?.link ? (
          <>
            {", "}
            <a href={availability.link} className="link" rel="noopener" target="_blank">
              see every option on TMDB
            </a>
          </>
        ) : null}
        .
      </p>
    </div>
  );
}

export function WhereToWatchSkeleton() {
  return (
    <div className="mt-4 space-y-3" aria-hidden>
      <div className="skeleton h-4 w-1/2" />
      <div className="skeleton h-9" />
      <div className="skeleton h-9 w-2/3" />
    </div>
  );
}
