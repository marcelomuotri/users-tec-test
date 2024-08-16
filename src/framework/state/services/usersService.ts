import { useState, useEffect } from "react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export const useUsersService = (page: number, perPage: number) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null); // Especifica el tipo de error

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null); // Resetear el error al iniciar una nueva solicitud
      try {
        const response = await fetch(
          `https://reqres.in/api/users?page=${page}&per_page=${perPage}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to fetch users", error);
        setError("Failed to fetch users"); // Maneja el error con un mensaje
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [page, perPage]);

  return {
    users,
    isLoading,
    totalPages,
    error, // Devuelve el error para que pueda ser manejado en el componente
  };
};
