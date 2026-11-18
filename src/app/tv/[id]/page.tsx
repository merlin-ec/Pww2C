import { TitleScreen, titleMetadata } from "@/components/title/title-screen";

export async function generateMetadata({ params }: PageProps<"/tv/[id]">) {
  const { id } = await params;
  return titleMetadata("tv", id);
}

export default function SeriesPage({ params }: PageProps<"/tv/[id]">) {
  return <TitleScreen mediaType="tv" idPromise={params.then(({ id }) => id)} />;
}
