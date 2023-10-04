import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import badWordList from "./badWords.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterBadWords(input: string): string {
  const words = input.trim().split(" ");
  const filteredWords: string[] = [];

  for (const word of words) {
    const containsBadWord = badWordList.words.some((substring) =>
      word.toLowerCase().includes(substring),
    );

    if (!containsBadWord) {
      filteredWords.push(word);
    } else {
      filteredWords.push("*".repeat(word.length));
    }
  }

  return filteredWords.join(" ");
}
