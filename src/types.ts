import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

export type TDog = z.infer<typeof dogSchema>;

export type TMainContentContext = {
  allDogs: TDog[];
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  activeTab: TTab;
  setActiveTab: Dispatch<SetStateAction<TTab>>;
  createNewDog: (newDogCharacteristics: Omit<TDog, "id">) => Promise<Response>;
  toggleFavoriteAction: (dog: TDog) => void;
  deleteDogAction: (dog: TDog) => void;
  refetchDogs: () => Promise<void>;
  toggleTabs: (tab: TTab) => void;
};

export type TTab = "all-dogs" | "fav-dogs" | "unfav-dogs" | "create-dog-form";
