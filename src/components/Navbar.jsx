import "./NavBar.css";
import { IconBallFootball } from "@tabler/icons-react";
import { IconFlame } from "@tabler/icons-react";
import { IconBrush } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconPodium } from "@tabler/icons-react";
import { IconMicroscope } from "@tabler/icons-react";
function NavBar({ topicNews, hotNews }) {
  return (
    <section className="navBar ">
      <button onClick={hotNews}>
        <IconFlame />
        Tendencia
      </button>
      <button onClick={() => topicNews("deportes")}>
        <IconBallFootball /> Deportes
      </button>
      <button onClick={() => topicNews("cultura")}>
        <IconBrush /> Cultura
      </button>
      <button onClick={() => topicNews("actualidad")}>
        <IconWorld /> Actualidad
      </button>
      <button onClick={() => topicNews("politica")}>
        <IconPodium /> Política
      </button>
      <button onClick={() => topicNews("ciencia")}>
        <IconMicroscope /> Ciencia
      </button>
    </section>
  );
}
export default NavBar;
