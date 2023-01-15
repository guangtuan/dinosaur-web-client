import { Notification } from "@douyinfe/semi-ui";
import { GetContext, PostContext, Url } from "./apiType";

const stringify = (obj: object): String => {
  return Object.entries(obj)
    .map(([k, v]) => `${k}=${encodeURI(v)}`)
    .join("&");
};

export const urlize = (url: Url): string => {
  return `${url.base}?${stringify(url.params)}`;
};

const filterMapWhenResponseOk = <T extends any>(res: Response): T | null => {
  if (res.ok) {
    return res.json() as T;
  } else {
    Notification.open({
      content: "接口响应失败",
    });
    return null;
  }
};

export const post = <T extends any>(
  postContext: PostContext
): Promise<T | null> => {
  return fetch(urlize(postContext.url), {
    method: "post",
    body: JSON.stringify(postContext.body),
    headers: {
      "content-type": "application/json",
    },
  }).then((resp) => {
    return filterMapWhenResponseOk(resp);
  });
};

export const get = async <T extends any>(
  getContext: GetContext
): Promise<T | null> => {
  try {
    const resp = await fetch(urlize(getContext.url), {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    });
    return filterMapWhenResponseOk(resp);
  } catch (e) {
    Notification.open({
      content: `接口响应失败 ${e}`,
    });
    return null;
  }
};
