import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import Starfield from "react-starfield";

export default function App({ Component, pageProps }) {
  return (
    <main className={GeistSans.className}>
      <Component {...pageProps} />
      <div style={{ position: "relative", zIndex: -1 }}>
        <Starfield backgroundColor="white" starColor={[0, 0, 0]} />
      </div>
    </main>
  );
}
