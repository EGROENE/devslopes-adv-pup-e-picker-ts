import {
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { Dog, Tab } from "./types";
import { Requests } from "./api";
import toast from "react-hot-toast";

type TSectionContext = {
  allDogs: Dog[];
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
  createNewDog: (newDogCharacteristics: Omit<Dog, "id">) => Promise<Response>;
  toggleFavoriteAction: (dog: Dog) => void;
  deleteDogAction: (dog: Dog) => void;
  refetchDogs: () => void;
  SectionProvider: ({ children }: { children: ReactNode }) => JSX.Element;
};

const SectionContext = createContext<TSectionContext | null>(null);

export const SectionProvider = ({ children }: { children: ReactNode }) => {
  //const [value, setValue] = useState(0);

  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  // state & setter to sectionContextValues
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // setter to sectionContextValues
  const [activeTab, setActiveTab] = useState<Tab>("all-dogs");

  useEffect(() => {
    Requests.getAllDogs()
      .then(setAllDogs)
      .finally(() => setIsLoading(false));
  }, []);

  const refetchDogs = (): void => {
    // Return this (returns promise), so that .then, etc. can be called
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

  const sectionContextValues: {
    allDogs: Dog[];
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    activeTab: Tab;
    setActiveTab: Dispatch<SetStateAction<Tab>>;
    createNewDog: (newDogCharacteristics: Omit<Dog, "id">) => Promise<Response>;
    toggleFavoriteAction: (dog: Dog) => void;
    deleteDogAction: (dog: Dog) => void;
    refetchDogs: () => void;
  } = {
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
    // <SectionContext.Provider value={{ value, setValue }}>
    <SectionContext.Provider value={sectionContextValues}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSectionProvider = () => {
  const context = useContext<TSectionContext | null>(SectionContext);

  // If context is null, it's being used in wrong place
  if (!context) {
    throw new Error("Must use useSectionProvider within the context of SectionProvider.");
  }
  return context;
};
