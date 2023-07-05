"use client";

import { useEffect, useState } from "react";
import { logout, loginWithGoogle, currentUserConnected } from "firebase-client";
import { useRouter } from "next/navigation";

export function Connection() {
  const [connected, setConnected] = useState<boolean>(false);
  const { refresh } = useRouter();

  useEffect(() => {
    currentUserConnected().then((user) => {
      setConnected(!!user);
    });
  }, []);

  async function login() {
    await loginWithGoogle();
    refresh();
  }

  async function signout() {
    await logout();
    refresh();
  }

  return (
    <div>
      {connected && <button onClick={signout}>Sign out</button>}
      {!connected && <button onClick={login}>Sign in with Google</button>}
    </div>
  );
}
