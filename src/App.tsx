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

  const toggleFavoriteAction = (dog: Dog) => {
    // OPTIMISTIC WAY
    const newIsFavoriteValue: boolean = !dog.isFavorite ? true : false;

    setAllDogs(
      allDogs.map((dogInAllDogsArr) =>
        dog.id === dogInAllDogsArr.id
          ? { ...dogInAllDogsArr, isFavorite: newIsFavoriteValue }
          : dogInAllDogsArr
      )
    );

    Requests.patchFavoriteForDog(dog, { isFavorite: newIsFavoriteValue }).then(
      (response) => {
        if (!response.ok) {
          setAllDogs(allDogs);
        } else {
          return;
        }
      }
    );

    // PESSIMISTIC WAY
    /* setIsLoading(true);
    return Requests.patchFavoriteForDog(dog).then(() =>
      Requests.getAllDogs()
        .then(refetchDogs)
        .finally(() => setIsLoading(false))
    ); */
  };

  const deleteDogAction = (dog: Dog): Promise<string> => {
    // OPTIMISTIC WAY
    // Why does filtering out the nonmatches delete the entire fucking array??
    setAllDogs(
      allDogs.filter((dogInAllDogs) => {
        dog.name === dogInAllDogs.name;
      })
    );

    /* Requests.deleteDogRequest(dog.id).then(() =>
      Requests.getAllDogs()
        .then(refetchDogs)
        .then(() => toast.error(`${dog.name} removed`))
        .finally(() => setIsLoading(false))
    ); */

    // PESSIMISTIC WAY
    /* setIsLoading(true);
    return Requests.deleteDogRequest(dog.id).then(() =>
      Requests.getAllDogs()
        .then(refetchDogs)
        .then(() => toast.error(`${dog.name} removed`))
        .finally(() => setIsLoading(false))
    ); */
  };

  // Passed to SectionContext.Provider as its value
  const sectionContextValues: {
    allDogs: Dog[];
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    activeTab: Tab;
    setActiveTab: Dispatch<SetStateAction<Tab>>;
    createNewDog: (newDogCharacteristics: Omit<Dog, "id">) => Promise<void>;
    toggleFavoriteAction: (dog: Dog) => Promise<void>;
    deleteDogAction: (dog: Dog) => Promise<string>;
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
