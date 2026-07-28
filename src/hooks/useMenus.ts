import { useQuery } from "@tanstack/react-query";
import { getMenus } from "@/lib/api";

export function useMenus() {
  return useQuery({
    queryKey: ["menus"],
    queryFn: getMenus,
  });
}
