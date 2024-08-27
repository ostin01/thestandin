import { cookies } from "next/headers";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

export function getSession() {
  return cookies().get("thestandin_accessToken");
}

export async function _getLoggedInUser() {
  const auth_token = getSession();
  const res = await fetch(`${BASE_URL}/api/auth/getme`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${auth_token?.value}`,
    },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function _getAllUsers() {
  const auth_token = getSession();
  const res = await fetch(`${BASE_URL}/api/users`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${auth_token?.value}`,
    },
  });

  if (!res.ok) {
    return null;
  }
  return res.json();
}

export async function _getConversationParticipants() {
  const auth_token = getSession();
  const res = await fetch(`${BASE_URL}/api/users/get-conversation`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${auth_token?.value}`,
    },
  });

  if (!res.ok) {
    return null;
  }
  return res.json();
}
export async function _getMessages(id: string) {
  const auth_token = getSession();
  const res = await fetch(`${BASE_URL}/api/messages/${id}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${auth_token?.value}`,
    },
  });

  if (!res.ok) {
    return null;
  }
  return res.json();
}
