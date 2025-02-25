const useSession = () => {
  const getSessionId = () => {
    const cookies = document.cookie.split('; ');
    const sessionCookie = cookies.find((cookie) =>
      cookie.startsWith('SESSION_COOKIE=')
    );
    return sessionCookie ? sessionCookie.split('=')[1] : undefined;
  };
  return { getSessionId };
};

export default useSession;
