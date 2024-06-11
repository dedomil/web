import { useEffect, useState } from "react";
import { useLanyard } from "react-use-lanyard";

export default function Home() {
  const { loading, status } = useLanyard({
    userId: "970197024928591882",
    socket: true,
  });
  const [count, setCount] = useState(1);
  const [track, setTrack] = useState([]);

  useEffect(() => {
    const e = new EventSource("https://sse.yadav.id");

    e.addEventListener("connected", ({ data }) => {
      const dataJson = JSON.parse(data);
      setTrack(dataJson[0]);
      setCount(dataJson[1]);
    });

    e.addEventListener("track-changed", ({ data }) => {
      setTrack(JSON.parse(data));
    });

    e.addEventListener("count-updated", ({ data }) => {
      setCount(JSON.parse(data)[0]);
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
          {!track.length
            ? "fetching... "
            : track[2]
            ? "playing "
            : "last played "}
          {!!track.length && (
            <a
              className="underline "
              href={`https://www.youtube.com/results?search_query=${track[0]}`}
              target="_blank"
            >
              {track[0].toLowerCase()}
            </a>
          )}
        </div>
        <div className="text-sm tracking-tight">{count} online</div>
      </div>
    </div>
  );
}
