import { ReactNode, useContext, Dispatch, SetStateAction } from "react";
import { SectionContext } from "../App";
import { Tab, Dog } from "../types";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const sectionContextValues: {
    allDogs: Dog[];
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    activeTab: Tab;
    setActiveTab: Dispatch<SetStateAction<Tab>>;
  } = useContext(SectionContext);

  const favsCount: number = sectionContextValues.allDogs.filter(
    (dog: Dog) => dog.isFavorite === true
  ).length;

  const unfavsCount: number = sectionContextValues.allDogs.filter(
    (dog) => dog.isFavorite !== true
  ).length;

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={
              sectionContextValues.activeTab === "fav-dogs"
                ? "selector active"
                : "selector"
            }
            onClick={() => {
              if (sectionContextValues.activeTab === "fav-dogs") {
                sectionContextValues.setActiveTab("all-dogs");
              } else {
                sectionContextValues.setActiveTab("fav-dogs");
              }
            }}
          >
            favorited ( {favsCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={
              sectionContextValues.activeTab === "unfav-dogs"
                ? "selector active"
                : "selector"
            }
            onClick={() => {
              if (sectionContextValues.activeTab === "unfav-dogs") {
                sectionContextValues.setActiveTab("all-dogs");
              } else {
                sectionContextValues.setActiveTab("unfav-dogs");
              }
            }}
          >
            unfavorited ( {unfavsCount} )
          </div>
          <div
            className={
              sectionContextValues.activeTab === "no-dogs"
                ? "selector active"
                : "selector"
            }
            onClick={() => {
              if (sectionContextValues.activeTab === "no-dogs") {
                sectionContextValues.setActiveTab("all-dogs");
              } else {
                sectionContextValues.setActiveTab("no-dogs");
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
