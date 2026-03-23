export const certificates = [
  {
    id: 1,
    name: "Certificate Name",
    issuer: "Issuer / Platform",
    category: "Category",         // e.g. "Cloud", "Frontend", "Backend"
    date: "Month Year",
    credentialId: null,           // optional — shown as monospace ID tag
    preview: null,                // optional — path like "/certs/aws.png" or full URL
    url: null,                    // optional — verify credential link
  },
  // Add more:
  // {
  //   id: 2,
  //   name: "...",
  //   issuer: "...",
  //   category: "...",
  //   date: "...",
  //   credentialId: "XXXX-XXXX",
  //   preview: "/certs/my-cert.png",
  //   url: "https://...",
  // },
];
