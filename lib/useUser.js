import useSWR from "swr";
import fetcher from "../util/fetcher";

export const useUser = () => {
  const { data, mutate: mutateUser } = useSWR("api/user", fetcher);

  function logout() {
    mutateUser(null, false);
    fetcher("api/logout");
  }

  return { user: data?.user || null, mutateUser, logout };
};
