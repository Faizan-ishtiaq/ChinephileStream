import MediaList from "./MediaList";

const Movies = ({ query }) => {
  return <MediaList mediaType="movie" query={query} />;
};

export default Movies;