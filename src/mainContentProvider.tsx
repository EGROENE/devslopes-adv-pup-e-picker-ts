import {
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
  useEffect,
  createContext,
} from "react";
import { Dog, Tab } from "./types";
import { Requests } from "./api";
import toast from "react-hot-toast";

export type TMainContentContext = {
  allDogs: Dog[];
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
  createNewDog: (newDogCharacteristics: Omit<Dog, "id">) => Promise<Response>;
  toggleFavoriteAction: (dog: Dog) => void;
  deleteDogAction: (dog: Dog) => void;
  refetchDogs: () => void;
};

export const MainContentContext = createContext<TMainContentContext | null>(null);

export const MainContentProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  // state & setter to MainContentContextValues
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // setter to MainContentContextValues
  const [activeTab, setActiveTab] = useState<Tab>("all-dogs");

  useEffect(() => {
    Requests.getAllDogs()
      .then(setAllDogs)
      .finally(() => setIsLoading(false));
  }, []);

  const refetchDogs = (): void => {
    Requests.getAllDogs()
      .then(setAllDogs)
      .catch((error) => console.log(error));
  };

  // ACTIONS (for creating new dog, adding/removing from favs, deleting from database)
  const createNewDog = (newDogCharacteristics: Omit<Dog, "id">): Promise<Response> => {
    return Requests.postDog(newDogCharacteristics);
  };

  const toggleFavoriteAction = (dog: Dog): void => {
    const newIsFavoriteValue: boolean = !dog.isFavorite ? true : false;

    // Set local state allDogs to array, changing only the isFavorite value of the selected dog:
    setAllDogs(
      allDogs.map((dogInAllDogsArr) =>
        dog.id === dogInAllDogsArr.id
          ? { ...dogInAllDogsArr, isFavorite: newIsFavoriteValue }
          : dogInAllDogsArr
      )
    );

    // Make PATCH request to change isFavorite value of selected dog in the DB
    // If the request fails, revert to original value; else, do nothing
    Requests.patchFavoriteForDog(dog, { isFavorite: newIsFavoriteValue })
      .then((response) => {
        if (!response.ok) {
          setAllDogs(allDogs); // Why is allDogs here equal to original form, not what is set above in this function?
          toast.error(
            newIsFavoriteValue === true
              ? "Could not add to favorites. Please try again."
              : "Could not remove from favorites. Please try again."
          );
        } else {
          return; // What's the point of return here?
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteDogAction = (dog: Dog): void => {
    setAllDogs(allDogs.filter((dogInAllDogsArr) => dog.id !== dogInAllDogsArr.id));

    Requests.deleteDogRequest(dog.id)
      .then((response) => {
        if (!response.ok) {
          setAllDogs(allDogs);
        } else {
          toast.error(`${dog.name} deleted`);
        }
      })
      .catch((error) => console.log(error));
  };

  const MainContentContextValues: TMainContentContext = {
    allDogs,
    isLoading,
    setIsLoading,
    activeTab,
    setActiveTab,
    createNewDog,
    toggleFavoriteAction,
    deleteDogAction,
    refetchDogs,
  };

  return (
    <MainContentContext.Provider value={MainContentContextValues}>
      {children}
    </MainContentContext.Provider>
  );
};
