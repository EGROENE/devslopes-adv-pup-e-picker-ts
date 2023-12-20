import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { CreateDogForm } from "./Components/CreateDogForm";
import { useMainContentContext } from "./useMainContentContext";

export function App() {
  const { activeTab } = useMainContentContext();
  const showCreateDogForm: boolean = activeTab === "create-dog-form";
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        {showCreateDogForm ? <CreateDogForm /> : <Dogs />}
      </Section>
    </div>
  );
}
