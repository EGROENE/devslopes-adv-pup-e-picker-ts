import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

export type Dog = z.infer<typeof dogSchema>;

export type TMainContentContext = {
  allDogs: Dog[];
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
  createNewDog: (newDogCharacteristics: Omit<Dog, "id">) => Promise<Response>;
  toggleFavoriteAction: (dog: Dog) => void;
  deleteDogAction: (dog: Dog) => void;
  refetchDogs: () => Promise<void>;
};

export type Tab = "all-dogs" | "fav-dogs" | "unfav-dogs" | "no-dogs";
