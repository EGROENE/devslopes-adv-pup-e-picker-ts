import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { Requests } from "./api";
import { Dog, Tab } from "./types";

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

  const sectionContextValues: {
    allDogs: Dog[];
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    activeTab: Tab;
    setActiveTab: Dispatch<SetStateAction<Tab>>;
  } = {
    allDogs,
    isLoading,
    setIsLoading,
    activeTab,
    setActiveTab,
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
          <Dogs />
        </Section>
      </SectionContext.Provider>
    </div>
  );
}
