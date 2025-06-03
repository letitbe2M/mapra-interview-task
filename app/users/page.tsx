"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Pagination,
} from "@mui/material";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

const USERS_PER_PAGE = 50;
const TOTAL_USERS = 500;

export default function UserCards() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/users?limit=100`);
        const data = await res.json();
        const replicatedUsers: User[] = [];
        for (let i = 0; i < 5; i++) {
          data.users.forEach((user: User, idx: number) => {
            replicatedUsers.push({
              ...user,
              id: user.id + i * 100,
            });
          });
        }
        setAllUsers(replicatedUsers);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const totalPages = Math.ceil(TOTAL_USERS / USERS_PER_PAGE);

  const usersToShow = allUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Typography className="text-center mt-10">در حال بارگذاری...</Typography>
    );
  }

  return (
    <Box className="max-w-6xl mx-auto p-4">
      <Typography variant="h4" className="mb-6 text-center font-bold">
        لیست کاربران - صفحه {page} از {totalPages}
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {usersToShow.map((user) => (
          <Card key={user.id} className="flex items-center p-4 space-x-4">
            <Avatar
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              sx={{ width: 64, height: 64 }}
            />
            <CardContent className="p-0">
              <Typography variant="h6">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <Box className="flex justify-center mt-8">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
}
