import { useEffect, useState } from "react";
import links from "../data/links.json";
import projects from "../data/projects.json";
import misc from "../data/misc.json";
import "animate.css";

export default function Home() {
  const [count, setCount] = useState(1);
  const [track, setTrack] = useState([]);
  const [audio, setAudio] = useState(null);
  const [animation, setAnimation] = useState("slideInDown");

  useEffect(() => {
    setAudio(new Audio("/aditya.mp3"));

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

    e.addEventListener("ping", ({ data }) => {
      setAnimation("shakeX");
    });
  }, []);

  return (
    <div
      className={`flex flex-col h-screen justify-center sm:max-w-[65%] md:max-w-[65%] lg:max-w-[30%] mx-auto p-8 gap-y-3 animate__animated animate__${animation} text-slate-800`}
      onAnimationEnd={(e) => {
        setAnimation(null);
      }}
    >
      <h1 className="text-4xl font-black tracking-tighter">
        hi, i'm{" "}
        <span
          role="button"
          className="underline cursor-help text-black"
          onClick={() => {
            audio.play();
          }}
        >
          aditya
        </span>
        ! 👨🏻‍💻
      </h1>
      <p className="tracking-tight">
        i'm a {new Date(Date.now() - 1095486840000).getUTCFullYear() - 1970}
        yo software developer from mumbai, india.
      </p>
      <hr></hr>
      <h2 className="text-2xl font-bold tracking-tighter text-black">
        🛠️ builds
      </h2>
      <ul className="list-disc list-inside tracking-tight">
        {projects.map(({ name, description, repository }) => {
          return (
            <li
              key={name}
              className="cursor-pointer"
              onClick={() => {
                window.open(repository);
              }}
            >
              <span className="font-medium text-blue-800">{name}</span> -{" "}
              {description}
            </li>
          );
        })}
      </ul>
      <hr></hr>
      <h2 className="text-2xl font-bold tracking-tighter text-black">
        🔗 links
      </h2>
      <ul className="list-disc list-inside tracking-tight">
        {links.map(({ name, url, username }) => {
          return (
            <li
              className="cursor-pointer"
              key={name}
              onClick={() => window.open(url + username)}
            >
              <span className="font-medium text-blue-800">{name}</span> -{" "}
              {username}
            </li>
          );
        })}
      </ul>
      <hr></hr>
      <h2 className="text-2xl font-bold tracking-tighter text-black">
        ⚙️ misc
      </h2>
      <ul className="list-disc list-inside tracking-tight">
        {misc.map(({ name, url, description }) => {
          return (
            <li
              key={name}
              className="cursor-pointer"
              onClick={() => {
                window.open(url);
              }}
            >
              <span className="font-medium text-blue-800">{name}</span> -{" "}
              {description}
            </li>
          );
        })}
      </ul>
      <hr></hr>
      <div className="flex flex-row justify-between">
        <div className="text-sm tracking-tight">
          🎵{" "}
          {track.length ? (
            <a
              className={`font-medium ${
                track[2] ? "text-green-600" : "text-red-600"
              }`}
              href={`https://www.youtube.com/results?search_query=${track[0]}`}
              target="_blank"
            >
              {track[0].toLowerCase()}
            </a>
          ) : (
            <span className="font-medium">fetching...</span>
          )}
        </div>
        <div
          role="button"
          className="text-sm tracking-tight cursor-pointer"
          onClick={async () => {
            await fetch("https://sse.yadav.id/ping");
            return;
          }}
        >
          <span className="font-medium text-green-600">{count}</span> 🟢
        </div>
      </div>
    </div>
  );
}
