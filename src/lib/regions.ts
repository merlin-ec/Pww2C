/**
 * Countries PWW shows streaming availability for in v1. Must match the
 * `public.region_code` domain in the database.
 */
export const REGIONS = {
  US: "United States",
  CA: "Canada",
  GB: "United Kingdom",
  AU: "Australia",
  NZ: "New Zealand",
  IE: "Ireland",
} as const;

export type RegionCode = keyof typeof REGIONS;

export const REGION_CODES = Object.keys(REGIONS) as RegionCode[];

export const DEFAULT_REGION: RegionCode = "US";

export function isRegionCode(value: unknown): value is RegionCode {
  return typeof value === "string" && value in REGIONS;
}
