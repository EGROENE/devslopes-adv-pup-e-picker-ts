import { ReactNode, useState, useEffect, createContext } from "react";
import { TDog, TTab, TMainContentContext } from "./types";
import { Requests } from "./api";
import toast from "react-hot-toast";

export const MainContentContext = createContext<TMainContentContext | null>(null);

export const MainContentProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<TDog[]>([]);

  // state & setter to MainContentContextValues
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // setter to MainContentContextValues
  const [activeTab, setActiveTab] = useState<TTab>("all-dogs");

  useEffect(() => {
    Requests.getAllDogs()
      .then(setAllDogs)
      .finally(() => setIsLoading(false));
  }, []);

  const refetchDogs = (): Promise<void> => Requests.getAllDogs().then(setAllDogs);

  // ACTIONS (for creating new dog, adding/removing from favs, deleting from database)
  const createNewDog = (newDogCharacteristics: Omit<TDog, "id">): Promise<Response> => {
    setIsLoading(true); // Best to handle this inside action method, defined here in Provider
    return Requests.postDog(newDogCharacteristics).finally(() => setIsLoading(false));
  };

  const toggleFavoriteAction = (dog: TDog): void => {
    const newIsFavoriteValue = !dog.isFavorite;

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
            newIsFavoriteValue
              ? "Could not add to favorites. Please try again."
              : "Could not remove from favorites. Please try again."
          );
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteDogAction = (dog: TDog): void => {
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

  const toggleTabs = (tab: TTab): void =>
    activeTab === tab ? setActiveTab("all-dogs") : setActiveTab(tab);

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
    toggleTabs,
  };

  return (
    <MainContentContext.Provider value={MainContentContextValues}>
      {children}
    </MainContentContext.Provider>
  );
};
