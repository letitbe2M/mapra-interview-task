// app/components/UserCardsClient.tsx
"use client";

import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Tooltip,
  Checkbox,
  Pagination,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

type Props = {
  users: User[];
  totalPages: number;
  page: number;
};

export default function UserCardPage({ users, totalPages, page }: Props) {
  const router = useRouter();
  const [checkedUsers, setCheckedUsers] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("checkedUsers");
    if (stored) {
      setCheckedUsers(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("checkedUsers", JSON.stringify(checkedUsers));
  }, [checkedUsers]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    router.push(`?page=${value}`);
  };

  const handleCheckboxChange = (userId: number) => {
    setCheckedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <Box className="max-w-6xl mx-auto p-4">
      <Typography variant="h4" className="mb-6 text-center font-bold">
        لیست کاربران - صفحه {page} از {totalPages}
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="flex items-center p-4 space-x-4">
            <Checkbox
              checked={checkedUsers.includes(user.id)}
              onChange={() => handleCheckboxChange(user.id)}
            />
            <Avatar
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              sx={{ width: 64, height: 64 }}
            />
            <CardContent className="p-0">
              <Typography variant="h6">
                {user.firstName} {user.lastName}
              </Typography>
              <Tooltip title={user.email} placement="top-start">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  noWrap
                  sx={{ maxWidth: 180 }}
                >
                  {user.email}
                </Typography>
              </Tooltip>
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
          dir="ltr"
        />
      </Box>
    </Box>
  );
}
