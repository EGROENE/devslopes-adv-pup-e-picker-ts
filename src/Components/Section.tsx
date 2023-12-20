import { ReactNode } from "react";
import { TDog } from "../types";
import { useMainContentContext } from "../useMainContentContext";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { allDogs, activeTab, setActiveTab } = useMainContentContext();

  const favsCount: number = allDogs.filter((dog: TDog) => dog.isFavorite === true).length;

  const unfavsCount: number = allDogs.filter((dog) => dog.isFavorite !== true).length;

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          <div
            className={activeTab === "fav-dogs" ? "selector active" : "selector"}
            onClick={() => {
              if (activeTab === "fav-dogs") {
                setActiveTab("all-dogs");
              } else {
                setActiveTab("fav-dogs");
              }
            }}
          >
            favorited ( {favsCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={activeTab === "unfav-dogs" ? "selector active" : "selector"}
            onClick={() => {
              if (activeTab === "unfav-dogs") {
                setActiveTab("all-dogs");
              } else {
                setActiveTab("unfav-dogs");
              }
            }}
          >
            unfavorited ( {unfavsCount} )
          </div>
          <div
            className={activeTab === "no-dogs" ? "selector active" : "selector"}
            onClick={() => {
              if (activeTab === "no-dogs") {
                setActiveTab("all-dogs");
              } else {
                setActiveTab("no-dogs");
              }
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
