// src/utils.js
export const getRobotName = (sectionTitle, index) => {
    const prefix = sectionTitle === "GRA" ? "R" : sectionTitle === "GCS" ? "R" : "P";
    return `${prefix}${index + 1}`;
  };
  