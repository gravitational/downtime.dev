import NextHead from "next/head";
import { useRouter } from "next/router";
import React from "react";

const host = process.env.NEXT_PUBLIC_HOST;

export interface HeadProps {
  imageURL?: string;
  headline?: string;
  isHomePage?: boolean;
}

const Head = ({
  isHomePage = false,
  imageURL,
  headline,
}: HeadProps) => {
  const router = useRouter();
  const urlSlug = router.asPath;
  const url = `${host}${urlSlug}`;

  const imagePath = isHomePage
    ? "https://www.downtime.dev/assets/images/bored@2x.jpg"
    : `https:${imageURL}`;


  const title = isHomePage ? "Hard-hitting news for when your code is compiling." : headline;
  const description = "Hard-hitting news for when your code is compiling."

  return (
    <NextHead>
      <title>downtime.dev</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/assets/favicon.ico" />
      <link rel="icon" href="/assets/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" href="/assets/favicon.ico" />
      <meta name="description" content={`${description}`} />
      <style>
        @import
        url(&apos;https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap&apos;);{" "}
      </style>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content="downtime.dev" />
      {!isHomePage && <meta property="og:description" content={description} />}
      <meta property="og:image" content={imagePath} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
    </NextHead>
  );
};

export default Head;
