import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(string: string) {
  if (!string) return undefined;
  return string?.split(" ").slice(0, 2).map((n: string) => n.at(0)).join("").toUpperCase();
}

export function truncate(str: string, length: number, ending = "...") {
  if (!str || str?.length <= length) return str;
  return str.slice(0, length - ending?.length) + ending;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateHash(length = 10) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()!@#$%^&*()_+";
  let result = "";

  for (let i = 0; i < length; i++)
    result += chars.charAt(Math.floor(Math.random() * chars.length));

  return result;
}