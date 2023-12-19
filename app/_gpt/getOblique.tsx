import Obliques from "@/app/assets/ObliqueStrategies_edit4";

function getOblique(idx: number) {
  return Obliques[idx];
}

function getRandomOblique() {
  const randomIndex = Math.floor(Math.random() * Obliques.length);
  console.log(Obliques.length, randomIndex);
  return Obliques[randomIndex];
}
export { getOblique, getRandomOblique };
