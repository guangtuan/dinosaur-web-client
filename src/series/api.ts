import { get, post, put } from "../lang/api";
import { Series, SeriesDisplay } from "./model";

export const createSeries = async (series: Series): Promise<Boolean> => {
  const resp = (await post({
    body: series,
    url: {
      base: "api/series",
    },
  })) as Boolean;
  return resp;
};

export const listSeries = async (): Promise<Array<SeriesDisplay>> => {
  const resp = (await get({
    url: {
      base: "api/series",
    },
  })) as Array<SeriesDisplay>;
  return resp;
};
