import { Markdown } from "@/components/markdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso – DSCVR",
  description: "Leia os Termos de Uso da plataforma DSCVR.",
  openGraph: {
    title: "Termos de Uso – DSCVR",
    description: "Leia os Termos de Uso da plataforma DSCVR.",
    url: "https://dscvr.space/terms/use",
    type: "website",
    images: [
      {
        url: "/terms/use.png",
        width: 2880,
        height: 1390,
        alt: "Termos de Uso DSCVR"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Termos de Uso – DSCVR",
    description: "Leia os Termos de Uso da plataforma DSCVR.",
    images: ["/terms/use.png"]
  }
};

const termsMarkdown = `## Lorem Ipsum`;

export default async function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow max-w-4xl mx-auto p-6 pt-32">
        <h1 className="text-3xl font-bold mb-8 text-center">Termos de Uso – DSCVR Ecosystem</h1>
        <Markdown>
          {termsMarkdown}
        </Markdown>
      </main>
    </div>
  );
}