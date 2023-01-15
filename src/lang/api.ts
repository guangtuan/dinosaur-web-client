import { Notification } from "@douyinfe/semi-ui";
import { GetContext, PostContext, PutContext, Url } from "./apiType";

const stringify = (obj: object): String => {
  return Object.entries(obj)
    .map(([k, v]) => `${k}=${encodeURI(v)}`)
    .join("&");
};

export const urlize = (url: Url): string => {
  return `${url.base}?${stringify(url.params || {})}`;
};

const filterMapWhenResponseOk = <T extends any>(res: Response): T | null => {
  if (res.ok) {
    return res.json() as T;
  } else {
    Notification.open({
      content: `接口响应失败 ${res.statusText}`,
    });
    return null;
  }
};

export const post = async <T extends any>(
  postContext: PostContext
): Promise<T | null> => {
  try {
    const resp = await fetch(urlize(postContext.url), {
      method: "post",
      body: JSON.stringify(postContext.body),
      headers: {
        "content-type": "application/json",
      },
    });
    return filterMapWhenResponseOk(resp);
  } catch (e) {
    console.error(e);
    Notification.open({
      content: `接口响应失败 ${e}`,
    });
    return null;
  }
};

export const put = async <T extends any>(
  putContext: PutContext
): Promise<T | null> => {
  try {
    const resp = await fetch(urlize(putContext.url), {
      method: "put",
      body: JSON.stringify(putContext.body),
      headers: {
        "content-type": "application/json",
      },
    });
    return filterMapWhenResponseOk(resp);
  } catch (e) {
    console.error(e);
    Notification.open({
      content: `接口响应失败 ${e}`,
    });
    return null;
  }
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
    console.error(e);
    Notification.open({
      content: `接口响应失败 ${e}`,
    });
    return null;
  }
};
