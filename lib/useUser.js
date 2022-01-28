import useSWR from "swr";
import fetcher from "../util/fetcher";

export const useUser = () => {
  const { data, mutate: mutateUser } = useSWR("api/user", fetcher, {
    fallbackData: { data: { user: null, isLoggedIn: null } },
  });

  async function logout() {
    fetcher("api/logout");
    mutateUser({ user: null, isLoggedIn: null }, false);
  }

  console.log(data);

  return { user: data.user, isLoggedIn: data.isLoggedIn, mutateUser, logout };
};
