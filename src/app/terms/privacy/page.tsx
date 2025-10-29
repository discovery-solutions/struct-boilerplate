import { Markdown } from "@/components/markdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade – DSCVR",
  description: "Leia a Política de Privacidade da plataforma DSCVR.",
  openGraph: {
    title: "Política de Privacidade – DSCVR",
    description: "Leia a Política de Privacidade da plataforma DSCVR.",
    url: "https://id.dscvr.space/terms/privacy",
    type: "website",
    images: [
      {
        url: "/terms/privacy.png",
        width: 2880,
        height: 1368,
        alt: "Política de Privacidade DSCVR"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Privacidade – DSCVR",
    description: "Leia a Política de Privacidade da plataforma DSCVR.",
    images: ["/terms/privacy.png"]
  }
};

const privacyMarkdown = `## Lorem Ipsum`;

export default async function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow max-w-4xl mx-auto p-6 pt-32">
        <h1 className="text-3xl font-bold mb-8 text-center">Política de Privacidade – DSCVR Ecosystem</h1>
        <Markdown>
          {privacyMarkdown}
        </Markdown>
      </main>
    </div>
  );
}