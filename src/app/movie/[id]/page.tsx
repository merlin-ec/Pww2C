import { TitleScreen, titleMetadata } from "@/components/title/title-screen";

export async function generateMetadata({ params }: PageProps<"/movie/[id]">) {
  const { id } = await params;
  return titleMetadata("movie", id);
}

export default function MoviePage({ params }: PageProps<"/movie/[id]">) {
  return <TitleScreen mediaType="movie" idPromise={params.then(({ id }) => id)} />;
}
