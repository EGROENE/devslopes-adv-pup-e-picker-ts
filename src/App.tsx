import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { CreateDogForm } from "./Components/CreateDogForm";
import { useSectionContext } from "./useSectionContext";

export function App() {
  const { activeTab } = useSectionContext();
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        {activeTab === "no-dogs" ? <CreateDogForm /> : <Dogs />}
      </Section>
    </div>
  );
}
