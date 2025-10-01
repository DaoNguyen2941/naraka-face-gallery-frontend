import type { Metadata } from 'next'
import CharacterPage from "./CharacterPage"

type Props = {
  params: Promise<{ slug: string }>
}
 
export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { slug } = await params
  return {
    title: slug,
  }
}

export default function Page() {
  return <CharacterPage />
}
