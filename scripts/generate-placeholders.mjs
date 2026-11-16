import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();

function pdfDocument(text) {
  const stream = `BT /F1 18 Tf 72 700 Td (${text}) Tj ET`;
  const objects = [
    "1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n",
    "2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj\n",
    "3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj\n",
    `4 0 obj<</Length ${stream.length}>>stream\n${stream}\nendstream\nendobj\n`,
    "5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\n",
  ];
  let body = "%PDF-1.4\n";
  const offsets = [0];
  for (const object of objects) {
    offsets.push(Buffer.byteLength(body));
    body += object;
  }
  const xref = Buffer.byteLength(body);
  let table = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index <= objects.length; index += 1) {
    table += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  return `${body}${table}trailer<</Size ${objects.length + 1}/Root 1 0 R>>\nstartxref\n${xref}\n%%EOF`;
}

async function png(file, svg, width, height) {
  await mkdir(path.dirname(file), { recursive: true });
  await sharp(Buffer.from(svg), { density: 160 })
    .resize(width, height, { fit: "cover" })
    .png()
    .toFile(file);
}

const avatar = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 860">
  <ellipse cx="320" cy="800" rx="150" ry="22" fill="#E38AA0" opacity=".35"/>
  <path d="M168 548c18 190 286 190 304 0 8-96-48-150-152-150S160 452 168 548z" fill="#9BB892"/>
  <path d="M230 470c20 20 160 24 180 0 8 40-20 70-90 78-70-8-98-38-90-78z" fill="#C5D5B8"/>
  <rect x="292" y="438" width="56" height="48" rx="18" fill="#F6D2BE"/>
  <circle cx="320" cy="330" r="118" fill="#F6D2BE"/>
  <path d="M196 340c8-150 90-220 124-220 70 0 150 80 150 210-24-50-62-28-86 8 28-90-18-140-64-140-52 0-96 62-96 140-12-24-22-24-28 2z" fill="#5C4038"/>
  <path d="M214 312c24-96 188-108 226-8-28-48-74-58-116-46-42 10-82 22-110 54z" fill="#5C4038"/>
  <ellipse cx="268" cy="358" rx="20" ry="12" fill="#F4B8C6"/>
  <ellipse cx="376" cy="358" rx="20" ry="12" fill="#F4B8C6"/>
  <circle cx="282" cy="338" r="7" fill="#2B1B17"/>
  <circle cx="360" cy="338" r="7" fill="#2B1B17"/>
  <path d="M298 386c12 16 34 16 46 0" fill="none" stroke="#2B1B17" stroke-width="5" stroke-linecap="round"/>
  <g transform="translate(412 246)">
    <circle cx="28" cy="28" r="8" fill="#FFE6B5"/>
    <ellipse cx="28" cy="10" rx="7" ry="12" fill="#F4B8C6"/>
    <ellipse cx="28" cy="46" rx="7" ry="12" fill="#E38AA0"/>
    <ellipse cx="10" cy="28" rx="12" ry="7" fill="#FFD5C2"/>
    <ellipse cx="46" cy="28" rx="12" ry="7" fill="#E6D4F5"/>
  </g>
</svg>`;

function windowArt(title, accent, second) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750">
  <rect width="1200" height="750" fill="#FFF9F0"/>
  <circle cx="140" cy="120" r="70" fill="${accent}"/>
  <circle cx="1060" cy="640" r="90" fill="${second}"/>
  <rect x="120" y="90" width="960" height="570" rx="36" fill="#fff"/>
  <rect x="120" y="90" width="960" height="70" rx="36" fill="${accent}"/>
  <rect x="120" y="130" width="960" height="30" fill="${accent}"/>
  <circle cx="168" cy="125" r="12" fill="#FFF9F0"/>
  <circle cx="206" cy="125" r="12" fill="#FFE6B5"/>
  <circle cx="244" cy="125" r="12" fill="#fff"/>
  <text x="600" y="250" text-anchor="middle" font-family="Arial" font-size="72" font-weight="700" fill="#2B1B17">${title}</text>
  <rect x="220" y="320" width="340" height="180" rx="28" fill="${accent}"/>
  <rect x="590" y="320" width="360" height="80" rx="24" fill="${second}"/>
  <rect x="590" y="420" width="280" height="80" rx="24" fill="#E6D4F5"/>
  <text x="600" y="620" text-anchor="middle" font-family="Arial" font-size="28" fill="#5C4038">TODO</text>
</svg>`;
}

function phoneArt(title, accent, lines) {
  const rows = lines
    .map(
      (line, index) =>
        `<rect x="48" y="${180 + index * 120}" width="294" height="96" rx="24" fill="${index % 2 ? "#FFF1DE" : "#fff"}"/>
         <circle cx="92" cy="${228 + index * 120}" r="18" fill="${accent}"/>
         <text x="128" y="${236 + index * 120}" font-family="Arial" font-size="28" fill="#2B1B17">${line}</text>`,
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 844">
  <rect width="390" height="844" fill="#FFF9F0"/>
  <rect x="0" y="0" width="390" height="180" fill="${accent}"/>
  <text x="36" y="120" font-family="Arial" font-size="42" font-weight="700" fill="#2B1B17">${title}</text>
  ${rows}
  <text x="195" y="780" text-anchor="middle" font-family="Arial" font-size="22" fill="#5C4038">TODO</text>
</svg>`;
}

function eventArt(title, sky, ground) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
  <rect width="800" height="1000" fill="${sky}"/>
  <circle cx="160" cy="180" r="70" fill="#FFE6B5"/>
  <circle cx="620" cy="240" r="36" fill="#fff" opacity=".8"/>
  <rect x="0" y="640" width="800" height="360" fill="${ground}"/>
  <rect x="180" y="430" width="440" height="280" rx="28" fill="#fff"/>
  <rect x="220" y="480" width="160" height="110" rx="16" fill="${sky}"/>
  <rect x="410" y="480" width="160" height="110" rx="16" fill="#F4B8C6"/>
  <circle cx="300" cy="760" r="46" fill="#F6D2BE"/>
  <circle cx="500" cy="770" r="46" fill="#F6D2BE"/>
  <text x="400" y="900" text-anchor="middle" font-family="Arial" font-size="42" font-weight="700" fill="#2B1B17">${title}</text>
</svg>`;
}

const jobs = [
  ["public/images/avatar.png", avatar, 800, 1000],
  ["public/projects/taskflow/thumbnail.png", windowArt("TaskFlow", "#C9DFF6", "#C5D5B8"), 1200, 750],
  ["public/projects/taskflow/screen-1.png", phoneArt("TaskFlow", "#C9DFF6", ["TODO", "TODO", "TODO"]), 390, 844],
  ["public/projects/shopeasy/thumbnail.png", windowArt("ShopEasy", "#F4B8C6", "#FFE6B5"), 1200, 750],
  ["public/projects/shopeasy/screen-1.png", phoneArt("ShopEasy", "#F4B8C6", ["TODO", "TODO", "TODO"]), 390, 844],
  ["public/projects/securenet/thumbnail.png", windowArt("SecureNet", "#E6D4F5", "#C9DFF6"), 1200, 750],
  ["public/projects/securenet/screen-1.png", phoneArt("SecureNet", "#E6D4F5", ["TODO", "TODO", "TODO"]), 390, 844],
  ["public/projects/kaval/thumbnail.png", windowArt("Kaval", "#F4B8C6", "#C5D5B8"), 1200, 750],
  ["public/projects/kaval/poster.png", windowArt("Kaval", "#E38AA0", "#C9DFF6"), 1280, 720],
  ["public/projects/kaval/screen-1.png", phoneArt("Kaval", "#F4B8C6", ["Trip", "Outing", "Shared"]), 390, 844],
  ["public/projects/kaval/screen-2.png", phoneArt("Scan", "#FFE6B5", ["Receipt", "TODO", "TODO"]), 390, 844],
  ["public/projects/kaval/screen-3.png", phoneArt("Sync", "#C5D5B8", ["Offline", "TODO", "TODO"]), 390, 844],
  ["public/events/hackathon.png", eventArt("Hackathon", "#F4B8C6", "#C5D5B8"), 800, 1000],
  ["public/events/tech-summit.png", eventArt("Tech Summit", "#C9DFF6", "#E6D4F5"), 800, 1000],
  ["public/events/flutter-conf.png", eventArt("Flutter Conf", "#C5D5B8", "#FFE6B5"), 800, 1000],
];

await mkdir(path.join(root, "public/cv"), { recursive: true });
await writeFile(
  path.join(root, "public/cv/Laura-Angel-CV-en.pdf"),
  pdfDocument("TODO: replace this file with the CV of Laura Angel. English."),
);
await writeFile(
  path.join(root, "public/cv/Laura-Angel-CV-es.pdf"),
  pdfDocument("TODO: replace this file with the CV of Laura Angel. Spanish."),
);

for (const [file, svg, width, height] of jobs) {
  await png(path.join(root, file), svg, width, height);
}

console.log(`Wrote ${jobs.length} images and 2 CV placeholders.`);
