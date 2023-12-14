import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { CreateDogForm } from "./Components/CreateDogForm";
import { useSectionProvider, SectionProvider } from "./sectionProvider";

export function App() {
  const { activeTab } = useSectionProvider();
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <SectionProvider>
        <Section label={"Dogs: "}>
          {activeTab === "no-dogs" ? <CreateDogForm /> : <Dogs />}
        </Section>
      </SectionProvider>
    </div>
  );
}
