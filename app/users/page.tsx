import { User } from "../lib/type";
import UserCardPage from "./_components/UserCardPage";

const USERS_PER_PAGE = 50;
const TOTAL_USERS = 500;

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://dummyjson.com/users?limit=100");
  const data = await res.json();
  const replicatedUsers: User[] = [];
  for (let i = 0; i < 5; i++) {
    data.users.forEach((user: User) => {
      replicatedUsers.push({
        ...user,
        id: user.id + i * 100,
      });
    });
  }
  return replicatedUsers;
}

type Props = {
  searchParams: { page?: string };
};

export default async function Page({ searchParams }: Props) {
  const page = parseInt(searchParams.page || "1", 10);
  const allUsers = await fetchUsers();

  const usersToShow = allUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  return (
    <UserCardPage
      users={usersToShow}
      page={page}
      totalPages={Math.ceil(TOTAL_USERS / USERS_PER_PAGE)}
    />
  );
}
