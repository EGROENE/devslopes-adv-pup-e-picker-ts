import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { CreateDogForm } from "./Components/CreateDogForm";
import { useMainContentContext } from "./useMainContentContext";

export function App() {
  const { activeTab } = useMainContentContext();
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        {activeTab === "create-dog-form" ? <CreateDogForm /> : <Dogs />}
      </Section>
    </div>
  );
}
