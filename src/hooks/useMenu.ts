import { useQuery } from "@tanstack/react-query";
import { getMenu } from "@/lib/api";

export function useMenu(id: number | null) {
  return useQuery({
    queryKey: ["menu", id],
    queryFn: () => getMenu(id!),
    enabled: id !== null,
  });
}
