import { createContext } from "react";
import { Section } from "./Components/Section";

const SectionContext = createContext();

export function App() {
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      {/* Section should be wrapped in Provider whose 'value' is the data Dogs & CreateDogForm need. */}
      {/* Section's children should be defined here'. */}
      <SectionContext.Provider>
        <Section label={"Dogs: "}></Section>
      </SectionContext.Provider>
    </div>
  );
}
