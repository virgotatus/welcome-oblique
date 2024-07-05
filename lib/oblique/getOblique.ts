import Obliques from "./ObliqueStrategies_edit4";

function getOblique(idx: number) {
  return Obliques[idx];
}

function getRandomOblique() {
  const randomIndex = Math.floor(Math.random() * Obliques.length);
  return Obliques[randomIndex];
}

export { getOblique, getRandomOblique };
