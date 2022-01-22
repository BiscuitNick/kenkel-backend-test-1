import useSWR from "swr";
import fetcher from "../util/fetcher";

export const useUser = () => {
  const { data, mutate: mutateUser } = useSWR("api/user", fetcher);

  async function logout() {
    mutateUser(null);
    fetcher("api/logout");
  }

  return { user: data?.user || null, mutateUser, logout };
};
