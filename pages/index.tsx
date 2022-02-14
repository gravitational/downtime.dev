import { JokeParser, RawJoke } from "components/JokeParser";
import NextImage from "next/image";
import logo from "../public/assets/images/downtimeLogo.png";
import { createClient } from "contentful";
import { generateFeed } from "../scripts/gen-rss";
export interface HomeProps {
  jokes: RawJoke[];
}

export default function Home({ jokes }: HomeProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-6/12 max-w-[600px] mt-14 lg:mt-16">
        <NextImage src={logo} alt="downtime logo" />
      </div>
      <JokeParser jokes={jokes} />
    </div>
  );
}

export async function getStaticProps() {
  const contentfulClient = createClient({
    accessToken: `${process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN}`,
    space: `${process.env.CONTENTFUL_SPACE_ID}`,
  });

  const res = await contentfulClient.getEntries({
    content_type: "joke",
    order: "-fields.date",
  });

  await generateFeed(res.items as RawJoke[]);

  return {
    props: {
      jokes: res.items,
    },
  };
}
