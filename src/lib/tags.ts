const tones = [
  "bg-blush",
  "bg-sky",
  "bg-sage",
  "bg-butter",
  "bg-lilac",
  "bg-peach",
  "bg-mint",
  "bg-pink",
] as const;

export function tagTone(label: string) {
  let hash = 0;
  for (let index = 0; index < label.length; index += 1) {
    hash = (hash + label.charCodeAt(index) * (index + 1)) % tones.length;
  }
  return tones[hash] ?? tones[0];
}
