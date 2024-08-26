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

export async function _getMessageParticipants() {
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

export async function _getMessages() {
  const auth_token = getSession();
  const res = await fetch(`${BASE_URL}/api/messages/66bca9e74b4144d8675d5f50`, {
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
