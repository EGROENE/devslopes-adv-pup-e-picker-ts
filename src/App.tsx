import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { Requests } from "./api";
import { Dog, Tab } from "./types";
import { CreateDogForm } from "./Components/CreateDogForm";
import toast from "react-hot-toast";

export const SectionContext = createContext();

export function App() {
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

  const refetchDogs = (): Promise<void> => {
    // Return this (returns promise), so that .then, etc. can be called
    return Requests.getAllDogs().then(setAllDogs);
  };

  // ACTIONS (for creating new dog, adding/removing from favs, deleting from database)
  const createNewDog = (newDogCharacteristics: Omit<Dog, "id">): Promise<void> => {
    return Requests.postDog(newDogCharacteristics)
      .then(refetchDogs)
      .then(() => {
        toast.success(`${newDogCharacteristics.name} created!`);
      })
      .finally(() => setIsLoading(false));
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
        } else {
          return; // What's the point of return here?
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteDogAction = (dog: Dog): void => {
    setAllDogs(allDogs.filter((dogInAllDogsArr) => dog.name !== dogInAllDogsArr.name));

    Requests.deleteDogRequest(dog.id)
      .then((response) => {
        if (!response.ok) {
          setAllDogs(allDogs);
        } else {
          return;
        }
      })
      .catch((error) => console.log(error));
  };

  // Passed to SectionContext.Provider as its value
  const sectionContextValues: {
    allDogs: Dog[];
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    activeTab: Tab;
    setActiveTab: Dispatch<SetStateAction<Tab>>;
    createNewDog: (newDogCharacteristics: Omit<Dog, "id">) => Promise<void>;
    toggleFavoriteAction: (dog: Dog) => void;
    deleteDogAction: (dog: Dog) => void;
  } = {
    allDogs,
    isLoading,
    setIsLoading,
    activeTab,
    setActiveTab,
    createNewDog,
    toggleFavoriteAction,
    deleteDogAction,
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      {/* Section should be wrapped in Provider whose 'value' is the data Dogs & CreateDogForm need. */}
      {/* Section's children (Dogs, CreateDogForm) should be defined here'. */}
      <SectionContext.Provider value={sectionContextValues}>
        <Section label={"Dogs: "}>
          {/* Logic to display Dogs (build this out) or CreateDogForm, based on value of activeTab */}
          {activeTab === "no-dogs" ? <CreateDogForm /> : <Dogs />}
        </Section>
      </SectionContext.Provider>
    </div>
  );
}
