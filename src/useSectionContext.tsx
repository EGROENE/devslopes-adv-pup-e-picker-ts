import { useContext } from "react";
import { TSectionContext, SectionContext } from "./sectionProvider";

export const useSectionContext = () => {
  const context = useContext<TSectionContext | null>(SectionContext);

  // If context is null, it's being used in wrong place
  if (!context) {
    throw new Error("Must use useSectionContext within the context of SectionProvider.");
  }
  return context;
};
