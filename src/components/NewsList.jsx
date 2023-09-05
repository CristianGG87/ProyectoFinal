import { Noticia } from "./News";
export const NewsList = ({ news }) => {
  console.log("Valor de news:", news);
  if (news && news.news && news.news.length > 0) {
    return (
      <ul>
        {news.news.map((noticia) => (
          <li key={noticia.id}>
            <Noticia news={noticia} />
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>Aun no hay noticias...</p>;
  }
};
