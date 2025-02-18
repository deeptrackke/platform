import { getSession } from "./session";

export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const authFetch = async (
  url: string | URL,
  options: FetchOptions = {}
) => {
  const session = await getSession();

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session?.accessToken}`,
  };
  let response = await fetch(url, options);
  console.log({
    StaTTTTTTTTTTTTTTTTTTTTUS: response.status,
  });

  if (response.status === 401) {
    if (!session?.refreshToken)
      throw new Error("refresh token not found!");

    const newAccessToken = await refreshToken(session.refreshToken);

    if (newAccessToken) {
      options.headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(url, options);
    }
  }
  return response;
};

async function refreshToken(refreshToken: string): Promise<string | null> {
  const response = await fetch('/auth/refresh-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  return data.accessToken || null;
}
