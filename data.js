const itineraryData = [
  {
    id: "event-1",
    type: "flight",
    date: "2026-07-26",
    time: "21:40 - 23:15",
    title: "Flight SOF ➔ ATH",
    description: "SKY express flight GQ681 from Sofia to Athens.",
    location: "Eleftherios Venizelos Airport (ATH)",
    mapLink: "https://maps.google.com/?q=Eleftherios+Venizelos+Airport",
    docs: [
      { name: "Ticket", url: "./documents/02_Flight_SOF-ATH-SOF_Ticket_B4D6DX.pdf" },
      { name: "Invoice", url: "./documents/01_Flight_SOF-ATH-SOF_Invoice_SKYexpress.pdf" }
    ],
    contacts: "Confirmation: B4D6DX",
    cost: 295.22,
    completed: false
  },
  {
    id: "event-2",
    type: "hotel",
    date: "2026-07-26",
    time: "23:50",
    title: "Check-in: Delfini Hotel",
    description: "Overnight stay in Piraeus to catch the ferry the next morning.",
    location: "Leocharous 7, Piraeus, 185-31",
    mapLink: "https://maps.google.com/?q=37.94675,23.6427167", // N 037° 56.805, E 23° 38.563
    docs: [
      { name: "Booking", url: "./documents/03_Hotel_Piraeus_Delfini_2026-07-26.pdf" }
    ],
    contacts: "Phone: +30 21 0417 3110",
    cost: 54,
    completed: false
  },
  {
    id: "event-3",
    type: "ferry",
    date: "2026-07-27",
    time: "Morning", // You can update exact departure time later
    title: "Ferry: Piraeus ➔ Sifnos",
    description: "Departs from Gate E9.",
    location: "Port of Piraeus, Gate E9",
    mapLink: "https://maps.google.com/?q=Port+of+Piraeus+Gate+E9",
    docs: [
      { name: "Tickets", url: "./documents/04_Ferry_Roundtrip_Athens-Sifnos_Tickets.pdf" }
    ],
    contacts: "Ferryhopper code: FH54SX8397YK",
    cost: 261.06,
    completed: false
  },
  {
    id: "event-4",
    type: "car",
    date: "2026-07-27",
    time: "11:00",
    title: "Pick up Car Rental",
    description: "Pick up FIAT 500 at Kamares (Main Port).",
    location: "Kamares Port, Sifnos",
    mapLink: "https://maps.google.com/?q=Kamares+Port+Sifnos",
    docs: [
      { name: "Reservation", url: "./documents/06_CarRental_Sifnos_Podotas_Fiat500.pdf" }
    ],
    contacts: "Order: 1444",
    cost: 260,
    completed: false
  },
  {
    id: "event-5",
    type: "hotel",
    date: "2026-07-27",
    time: "14:00 - 18:00",
    title: "Check-in: Archipelago Sifnos",
    description: "3-night stay in a Junior Suite.",
    location: "Vathy, Sifnos, 84003",
    mapLink: "https://maps.google.com/?q=36.9334167,24.6885667", // N 036° 56.005, E 24° 41.314
    docs: [
      { name: "Booking", url: "./documents/05_Hotel_Sifnos_Archipelago_2026-07-27_to_2026-07-30.pdf" }
    ],
    contacts: "Phone: +30 693 740 0450",
    cost: 643.5,
    completed: false
  },
  {
    id: "event-6",
    type: "hotel",
    date: "2026-07-30",
    time: "11:00",
    title: "Check-out: Archipelago Sifnos",
    description: "Check out by 11:00.",
    location: "Vathy, Sifnos, 84003",
    mapLink: "https://maps.google.com/?q=36.9334167,24.6885667",
    docs: [],
    contacts: "",
    cost: 0,
    completed: false
  },
  {
    id: "event-7",
    type: "hotel",
    date: "2026-07-30",
    time: "11:00 - 18:00",
    title: "Check-in: Studios Mirtia",
    description: "1-night stay in a Twin Room.",
    location: "Kamares, Sifnos, 84003",
    mapLink: "https://maps.google.com/?q=36.9875833,24.6800333", // N 036° 59.255, E 24° 40.802
    docs: [
      { name: "Booking", url: "./documents/07_Hotel_Sifnos_Mirtia_2026-07-30_to_2026-07-31.pdf" }
    ],
    contacts: "Phone: +30 698 857 9746",
    cost: 99.2,
    completed: false
  },
  {
    id: "event-8",
    type: "car",
    date: "2026-07-31",
    time: "11:00",
    title: "Return Car Rental",
    description: "Drop off FIAT 500 at Kamares (Main Port).",
    location: "Kamares Port, Sifnos",
    mapLink: "https://maps.google.com/?q=Kamares+Port+Sifnos",
    docs: [
      { name: "Reservation", url: "./documents/06_CarRental_Sifnos_Podotas_Fiat500.pdf" }
    ],
    contacts: "Order: 1444",
    cost: 0,
    completed: false
  },
  {
    id: "event-9",
    type: "ferry",
    date: "2026-07-31",
    time: "Afternoon", // Can be updated manually
    title: "Ferry: Sifnos ➔ Piraeus",
    description: "Return trip.",
    location: "Kamares Port, Sifnos",
    mapLink: "https://maps.google.com/?q=Kamares+Port+Sifnos",
    docs: [
      { name: "Tickets", url: "./documents/04_Ferry_Roundtrip_Athens-Sifnos_Tickets.pdf" }
    ],
    contacts: "Ferryhopper code: FH54SX8397YK",
    cost: 0,
    completed: false
  },
  {
    id: "event-10",
    type: "hotel",
    date: "2026-07-31",
    time: "14:00",
    title: "Check-in: Airbnb (Athens)",
    description: "Cozy Room for a Peaceful Stay in Vibrant Petralona. (2 nights)",
    location: "Kinourias 8, Athens, 118 53",
    mapLink: "https://maps.google.com/?q=Kinourias+8,+Athens",
    docs: [
      { name: "Airbnb", url: "./documents/08_Hotel_Athens_Airbnb_2026-07-31_to_2026-08-02.pdf" }
    ],
    contacts: "Host: Nathalie (Self check-in with Lockbox)",
    cost: 0,
    completed: false
  },
  {
    id: "event-11",
    type: "hotel",
    date: "2026-08-02",
    time: "11:00",
    title: "Check-out: Airbnb (Athens)",
    description: "Check out by 11:00.",
    location: "Kinourias 8, Athens, 118 53",
    mapLink: "https://maps.google.com/?q=Kinourias+8,+Athens",
    docs: [],
    contacts: "",
    cost: 0,
    completed: false
  },
  {
    id: "event-12",
    type: "flight",
    date: "2026-08-02",
    time: "19:20 - 21:05",
    title: "Flight ATH ➔ SOF",
    description: "SKY express flight GQ680 from Athens to Sofia.",
    location: "Eleftherios Venizelos Airport (ATH)",
    mapLink: "https://maps.google.com/?q=Eleftherios+Venizelos+Airport",
    docs: [
      { name: "Ticket", url: "./documents/02_Flight_SOF-ATH-SOF_Ticket_B4D6DX.pdf" }
    ],
    contacts: "Confirmation: B4D6DX",
    cost: 0,
    completed: false
  }
];

// Allows usage as a global variable directly from the script tag
window.itineraryData = itineraryData;
