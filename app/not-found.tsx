
import { Metadata } from 'next';
import NotFoundClient from './NotFound.client';


export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you`re looking for doesn`t exist on NoteHub.",
  openGraph: {
    title: "Page not found",
    description: "The page you`re looking for doesn`t exist on NoteHub.",
    url: "https://notehub.example.com/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Not Found image",
      },
    ],
  },
};


export default function NotFound() {
  return <NotFoundClient />;
}