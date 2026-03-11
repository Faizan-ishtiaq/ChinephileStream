import MediaList from "./MediaList";

const TvShows = ({ query }) => {
  return <MediaList mediaType="tv" query={query} />;
};

export default TvShows;