export const hotels = [
  {
    id: "h1",
    name: "The Fern House",
    featured: true,
    location: "Ooty, Tamil Nadu",
    area: "Ooty",
    rating: 4.9,
    reviews: 284,
    price: 6800,
    tag: "Guest favourite",
    type: "Boutique hotel",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "A peaceful hideaway wrapped in rolling hills, misty mornings and thoughtfully designed rooms. Slow down with garden breakfasts and views that make you want to stay a little longer.",
    amenities: ["Free Wi-Fi", "Breakfast included", "Mountain view", "Restaurant", "Parking", "Room service"],
    rooms: [
      { id: "r1", name: "Garden Classic", description: "A cosy room with garden views", guests: 2, price: 6800 },
      { id: "r2", name: "Hill View Suite", description: "A spacious suite with a private balcony", guests: 3, price: 9400 }
    ]
  },
  {
    id: "h2",
    name: "Palm & Tide Resort",
    location: "Kovalam, Kerala",
    area: "Kovalam",
    rating: 4.8,
    reviews: 391,
    price: 9200,
    tag: "Rare find",
    type: "Beach resort",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "A sunlit coastal escape where days move to the rhythm of the waves. Enjoy open-air dining, a sparkling pool and relaxed rooms just moments from the shoreline.",
    amenities: ["Beach access", "Pool", "Free Wi-Fi", "Spa", "Restaurant", "Airport shuttle"],
    rooms: [
      { id: "r1", name: "Coastal Deluxe", description: "Airy room with a garden or pool view", guests: 2, price: 9200 },
      { id: "r2", name: "Oceanfront Villa", description: "Private villa with a wide sea view", guests: 4, price: 14800 }
    ]
  },
  {
    id: "h3",
    name: "Mango Grove Retreat",
    location: "Pondicherry, India",
    area: "Pondicherry",
    rating: 4.7,
    reviews: 176,
    price: 5400,
    tag: "Design pick",
    type: "Heritage stay",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "An intimate heritage-inspired stay with courtyard greenery, warm textures and easy access to the colourful streets and cafés of Pondicherry.",
    amenities: ["Free Wi-Fi", "Breakfast included", "Courtyard", "Bicycle rental", "Restaurant", "Air conditioning"],
    rooms: [
      { id: "r1", name: "Courtyard Room", description: "A quiet room opening to the courtyard", guests: 2, price: 5400 },
      { id: "r2", name: "Heritage Suite", description: "A larger suite with vintage details", guests: 3, price: 7600 }
    ]
  },
  {
    id: "h4",
    name: "Cloudline Hideaway",
    location: "Kodaikanal, Tamil Nadu",
    area: "Kodaikanal",
    rating: 4.6,
    reviews: 208,
    price: 7200,
    tag: "Nature escape",
    type: "Mountain lodge",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "A tucked-away mountain lodge made for crisp air, forest walks and unhurried evenings. Find simple comforts, panoramic scenery and welcoming hospitality.",
    amenities: ["Mountain view", "Fireplace", "Free Wi-Fi", "Breakfast", "Parking", "Garden"],
    rooms: [
      { id: "r1", name: "Forest Room", description: "Warm interiors overlooking the trees", guests: 2, price: 7200 },
      { id: "r2", name: "Panorama Cabin", description: "A private cabin with a large deck", guests: 4, price: 11200 }
    ]
  },
  {
    id: "h5",
    name: "The Ivory Courtyard",
    location: "Jaipur, Rajasthan",
    area: "Jaipur",
    rating: 4.5,
    reviews: 143,
    price: 6100,
    tag: "Cultural stay",
    type: "Boutique hotel",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "A calm courtyard hotel inspired by Rajasthan's rich craft traditions. Return from city explorations to shaded verandas, local flavours and elegant rooms.",
    amenities: ["Pool", "Free Wi-Fi", "Restaurant", "Airport shuttle", "Breakfast", "Concierge"],
    rooms: [
      { id: "r1", name: "Classic Courtyard", description: "Comfortable room facing the courtyard", guests: 2, price: 6100 },
      { id: "r2", name: "Royal Suite", description: "A refined suite with a sitting area", guests: 3, price: 8900 }
    ]
  },
  {
    id: "h6",
    name: "Blue Banyan Stay",
    location: "Bengaluru, Karnataka",
    area: "Bengaluru",
    rating: 4.4,
    reviews: 319,
    price: 3900,
    tag: "Great value",
    type: "City hotel",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "A contemporary city base with thoughtful essentials, comfortable work-friendly spaces and easy access to cafés, shopping and business districts.",
    amenities: ["Free Wi-Fi", "Work desk", "Restaurant", "Air conditioning", "Parking", "24-hour reception"],
    rooms: [
      { id: "r1", name: "Smart Double", description: "A practical, comfortable city room", guests: 2, price: 3900 },
      { id: "r2", name: "Executive Room", description: "Extra space with a dedicated work area", guests: 2, price: 5200 }
    ]
  },
  {
    id: "h7",
    name: "Cedar & Mist Retreat",
    featured: true,
    location: "Munnar, Kerala",
    area: "Munnar",
    rating: 4.8,
    reviews: 227,
    price: 7900,
    tag: "Tea country escape",
    type: "Mountain retreat",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Wake to cool mountain air and green tea gardens at this quiet Munnar retreat. Come back from the trails to a warm room, a garden-side breakfast and a slower pace.",
    amenities: ["Mountain view", "Breakfast included", "Free Wi-Fi", "Restaurant", "Garden", "Room service"],
    rooms: [
      { id: "r1", name: "Tea Garden Room", description: "A bright room with views of the hills", guests: 2, price: 7900 },
      { id: "r2", name: "Cedar View Suite", description: "A roomy suite with a private balcony", guests: 3, price: 11200 }
    ]
  },
  {
    id: "h8",
    name: "Sunroom House Goa",
    featured: true,
    location: "Assagao, Goa",
    area: "Goa",
    rating: 4.7,
    reviews: 316,
    price: 8800,
    tag: "Slow-coast favourite",
    type: "Boutique villa",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "A laid-back Goan villa with sunlit rooms, a leafy courtyard and space to gather between beach days. Local cafés and the coast are an easy drive away.",
    amenities: ["Pool", "Free Wi-Fi", "Garden", "Air conditioning", "Breakfast", "Parking"],
    rooms: [
      { id: "r1", name: "Sunroom Double", description: "A calm, light-filled room for two", guests: 2, price: 8800 },
      { id: "r2", name: "Courtyard Suite", description: "A generous suite with a private sitting area", guests: 4, price: 13500 }
    ]
  },
  {
    id: "h9",
    name: "Lake & Loom Haveli",
    location: "Udaipur, Rajasthan",
    area: "Udaipur",
    rating: 4.9,
    reviews: 198,
    price: 10800,
    tag: "Heritage highlight",
    type: "Heritage haveli",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "A characterful haveli stay with carved details, a peaceful inner courtyard and lake-city views. Explore Udaipur by day, then return for an unhurried evening.",
    amenities: ["Courtyard", "Restaurant", "Free Wi-Fi", "Breakfast included", "Concierge", "Room service"],
    rooms: [
      { id: "r1", name: "Haveli Classic", description: "A heritage room with handcrafted details", guests: 2, price: 10800 },
      { id: "r2", name: "Lakeview Suite", description: "A spacious suite with a sitting room", guests: 3, price: 15400 }
    ]
  },
  {
    id: "h10",
    name: "Riverstone Hideaway",
    location: "Rishikesh, Uttarakhand",
    area: "Rishikesh",
    rating: 4.6,
    reviews: 164,
    price: 6900,
    tag: "Riverside reset",
    type: "Nature lodge",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "A restful base near the river, made for early walks, fresh mountain air and quiet evenings. Find simple comforts and a little room to reset between adventures.",
    amenities: ["Mountain view", "River access", "Free Wi-Fi", "Restaurant", "Garden", "Parking"],
    rooms: [
      { id: "r1", name: "River Room", description: "A restful room with a balcony", guests: 2, price: 6900 },
      { id: "r2", name: "Stone Cottage", description: "A private cottage with extra living space", guests: 4, price: 10400 }
    ]
  },
  {
    id: "h11",
    name: "Amber Dune House",
    location: "Alibaug, Maharashtra",
    area: "Alibaug",
    rating: 4.5,
    reviews: 121,
    price: 9600,
    tag: "Weekend by the sea",
    type: "Coastal villa",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "A breezy coastal home for long lunches and unplanned beach walks. Settle into a generous private space with a garden and the easy feel of a weekend away.",
    amenities: ["Pool", "Garden", "Free Wi-Fi", "Air conditioning", "Parking", "Room service"],
    rooms: [
      { id: "r1", name: "Garden Room", description: "A relaxed room opening to the garden", guests: 2, price: 9600 },
      { id: "r2", name: "Dune Villa", description: "A private villa with a poolside terrace", guests: 4, price: 14600 }
    ]
  },
  {
    id: "h12",
    name: "The Deccan House",
    location: "Hyderabad, Telangana",
    area: "Hyderabad",
    rating: 4.4,
    reviews: 203,
    price: 4900,
    tag: "City-smart stay",
    type: "Design hotel",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "A polished, comfortable city base with thoughtful design and easy access to Hyderabad's food, culture and business districts. Ideal for a restful night between plans.",
    amenities: ["Free Wi-Fi", "Work desk", "Restaurant", "Air conditioning", "Parking", "24-hour reception"],
    rooms: [
      { id: "r1", name: "Deccan Double", description: "A comfortable room with city essentials", guests: 2, price: 4900 },
      { id: "r2", name: "Studio Plus", description: "Extra room to unwind or work", guests: 2, price: 6900 }
    ]
  },
  {
    id: "h13",
    name: "Lagoon Light Houseboat",
    location: "Alleppey, Kerala",
    area: "Alleppey",
    rating: 4.9,
    reviews: 186,
    price: 12500,
    tag: "Backwater favourite",
    type: "Private houseboat",
    image: "https://images.unsplash.com/photo-1624554305378-0f440dd3a8c1?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1624554305378-0f440dd3a8c1?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1661174607003-d9d36388c916?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1624554305378-0f440dd3a8c1?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Spend a night drifting through Alleppey's palm-lined backwaters aboard a private Kerala houseboat. Watch village life unfold from the deck, enjoy freshly prepared Kerala meals, and wind down in a comfortable cabin as the water turns gold at sunset.",
    amenities: ["Backwater cruise", "Private deck", "All meals included", "Air conditioning", "Crew service", "Sunset views"],
    rooms: [
      { id: "r1", name: "Lakeview Cabin", description: "A private double cabin with a window beside the water", guests: 2, price: 12500, image: "https://images.unsplash.com/photo-1782520788496-6650adca4059?auto=format&fit=crop&w=800&q=85" },
      { id: "r2", name: "Family Houseboat Suite", description: "A larger private cabin with extra space for family", guests: 4, price: 17500, image: "https://images.unsplash.com/photo-1782520788496-6650adca4059?auto=format&fit=crop&w=800&q=85" }
    ]
  }
];
