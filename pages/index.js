import { useEffect, useState } from "react";
import { useLanyard } from "react-use-lanyard";

export default function Home() {
  const { loading, status } = useLanyard({
    userId: "970197024928591882",
    socket: true,
  });
  //   const [count, setCount] = useState(null);
  const [music, setMusic] = useState({ success: false });
  useEffect(() => {
    let e = new EventSource("https://dedomil.alwaysdata.net");

    // change to connect
    e.addEventListener("user-joined", ({ data }) => {
      setMusic(JSON.parse(data));
    });
    e.addEventListener("track-changed", ({ data }) => {
      setMusic(JSON.parse(data));
    });
  }, []);
  return (
    <div className="flex flex-col sm:max-w-[65%] md:max-w-[65%] lg:max-w-[40%] mx-auto p-12 gap-y-3">
      <h1 className="text-5xl font-black tracking-tighter">
        hi, i'm <span className="underline cursor-alias">aditya</span>!
      </h1>
      <p className="tracking-tight">
        i'm a {new Date(Date.now() - 1095486840000).getUTCFullYear() - 1970}{" "}
        year old software developer from mumbai, india.
      </p>
      <hr></hr>
      <h2 className="text-2xl font-bold tracking-tighter">[builds]</h2>
      <ul className="list-disc list-inside tracking-tight">
        <li>
          <a
            href="https://github.com/dedomil/pulp"
            className="underline"
            target="_blank"
          >
            pulp
          </a>{" "}
          - a tool to share code seamlessly.
        </li>
        <li>
          <a
            href="https://github.com/dedomil/instagram-notes"
            className="underline"
            target="_blank"
          >
            instagram-notes
          </a>{" "}
          - package to interact with instagram notes.
        </li>
      </ul>
      <hr></hr>
      <h2 className="text-2xl font-bold tracking-tighter">[links]</h2>
      <ul className="list-disc list-inside tracking-tight">
        <li>
          github
          <a
            href="https://github.com/dedomil"
            className="underline"
            target="_blank"
          >
            /dedomil
          </a>
        </li>
        <li>
          <span
            className={
              !loading && status.discord_status == "online"
                ? "text-green-600"
                : "text-gray-600"
            }
          >
            discord
          </span>
          <a
            href="https://discord.com/users/970197024928591882"
            className="underline"
            target="_blank"
          >
            /dedomil
          </a>
        </li>
        <li>
          keybase
          <a
            href="https://keybase.io/dedomil"
            className="underline"
            target="_blank"
          >
            /dedomil
          </a>
        </li>
        <li>
          youtube
          <a
            href="https://youtube.com/@aydv"
            className="underline"
            target="_blank"
          >
            /@aydv
          </a>
        </li>
      </ul>
      <hr></hr>
      <h2 className="text-2xl font-bold tracking-tighter">[other]</h2>
      <ul className="list-disc list-inside tracking-tight">
        <li>
          <a
            href="https://solana.fm/address/DuNKWq3a93BysBvKS2xR9hcJCVfmT494F2RiFM7jpt8b"
            className="underline"
            target="_blank"
          >
            dedomil.sol / yadav.id
          </a>{" "}
          - solana pubkey
        </li>
        <li>
          <a href="https://github.com/dedomil.gpg" className="underline">
            pgp
          </a>{" "}
          - pgp pubkey
        </li>
        <li>
          <a
            href="https://api.dedomil.workers.dev/files/cv.pdf"
            className="underline"
          >
            resume
          </a>{" "}
          - currently in progress
        </li>
      </ul>
      <hr></hr>
      <div className="flex flex-row justify-between">
        <div className="text-sm tracking-tight">
          {!music.success
            ? "fetching... "
            : music.playing
            ? "playing "
            : "last played "}
          {music.success && (
            <a
              className="underline "
              href={`https://www.youtube.com/results?search_query=${music.name}`}
              target="_blank"
            >
              {music.name.toLowerCase()}
            </a>
          )}
        </div>
        <div className="text-sm tracking-tight">copyright - aditya</div>
      </div>
    </div>
  );
}
