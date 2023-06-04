import { get, post, put } from "../lang/api";
import { Movie, MovieDisplay } from "./model";

export const createMovie = async (movie: Movie): Promise<Boolean> => {
  const resp = (await post({
    body: movie,
    url: {
      base: "api/movie",
    },
  })) as Boolean;
  return resp;
};

export const listMovie = async (): Promise<Array<MovieDisplay>> => {
  const resp = (await get({
    url: {
      base: "api/movie",
    },
  })) as Array<MovieDisplay>;
  return resp;
};
