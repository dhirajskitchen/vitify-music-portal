
const express = require('express');
const cors = require('cors');
const { join, dirname } = require('path');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const { fileURLToPath } = require('url');

const app = express();
const PORT = 3001;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Set up the database file location
const __dirname = process.cwd();
const file = join(__dirname, 'src/server/db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Initialize database with default data if empty
const initializeDb = async () => {
  await db.read();
  db.data ||= { artists: [] };
  
  // If no artists in DB, add our initial dataset
  if (db.data.artists.length === 0) {
    db.data.artists = [
      {
        id: "kendrick-lamar",
        name: "Kendrick Lamar",
        image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1000",
        coverImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000",
        genre: "Hip Hop",
        bio: "Kendrick Lamar Duckworth is an American rapper and songwriter. Known for his progressive musical styles and socially conscious songwriting, he is widely regarded as one of the most influential hip hop artists of his generation.",
        monthlyListeners: "66.8M",
        discography: [
          {
            title: "Mr. Morale & the Big Steppers",
            type: "Album",
            year: "2022",
            description: "Fifth studio album featuring 'N95' and 'Silent Hill'.",
            tracks: 18,
            image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=774"
          },
          {
            title: "DAMN.",
            type: "Album",
            year: "2017",
            description: "Pulitzer Prize-winning album with 'HUMBLE.' and 'LOYALTY.'",
            tracks: 14,
            image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=774"
          },
          {
            title: "To Pimp a Butterfly",
            type: "Album",
            year: "2015",
            description: "Critically acclaimed album featuring 'Alright' and 'King Kunta'.",
            tracks: 16,
            image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=774"
          }
        ],
        achievements: [
          "17 Grammy Awards",
          "Pulitzer Prize for Music (2018)",
          "Time's 100 most influential people (2016)",
          "Billboard Music Award for Top Rap Artist"
        ],
        topTracks: [
          { title: "HUMBLE.", album: "DAMN.", plays: "1.9B" },
          { title: "Alright", album: "To Pimp a Butterfly", plays: "724M" },
          { title: "N95", album: "Mr. Morale & the Big Steppers", plays: "510M" },
          { title: "DNA.", album: "DAMN.", plays: "830M" },
          { title: "LOYALTY. (feat. Rihanna)", album: "DAMN.", plays: "605M" }
        ]
      },
      {
        id: "billie-eilish",
        name: "Billie Eilish",
        image: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?q=80&w=774",
        coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd552e8a?q=80&w=1000",
        genre: "Alternative / Pop",
        bio: "Billie Eilish Pirate Baird O'Connell is an American singer and songwriter. She first gained public attention in 2015 with her debut single 'Ocean Eyes', which was subsequently released by Darkroom, an imprint of Interscope Records.",
        monthlyListeners: "78.5M",
        discography: [
          {
            title: "HIT ME HARD AND SOFT",
            type: "Album",
            year: "2024",
            description: "Third studio album featuring 'Birds of a Feather' and 'Lunch'.",
            tracks: 10,
            image: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?q=80&w=774"
          },
          {
            title: "Happier Than Ever",
            type: "Album",
            year: "2021",
            description: "Second studio album featuring the title track and 'NDA'.",
            tracks: 16,
            image: "https://images.unsplash.com/photo-1614613535308-eb5fbd552e8a?q=80&w=774"
          },
          {
            title: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
            type: "Album",
            year: "2019",
            description: "Breakthrough debut album with 'Bad Guy' and 'Bury a Friend'.",
            tracks: 14,
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=774"
          }
        ],
        achievements: [
          "9 Grammy Awards",
          "Two Academy Awards (Oscars)",
          "Three Billboard Music Awards",
          "Golden Globe Award for Best Original Song"
        ],
        topTracks: [
          { title: "bad guy", album: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?", plays: "2.4B" },
          { title: "Happier Than Ever", album: "Happier Than Ever", plays: "1.2B" },
          { title: "lovely (with Khalid)", album: "Single", plays: "1.8B" },
          { title: "when the party's over", album: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?", plays: "1.3B" },
          { title: "Birds of a Feather", album: "HIT ME HARD AND SOFT", plays: "640M" }
        ]
      }
    ];
    await db.write();
  }
};

// Initialize DB before starting server
initializeDb().catch(console.error);

// API Routes
app.get('/api/artists', async (req, res) => {
  await db.read();
  // Return a simplified list for the artists section
  const simplifiedArtists = db.data.artists.map(artist => ({
    id: artist.id,
    name: artist.name,
    image: artist.image,
    genre: artist.genre,
    filePath: `/artist-files/${artist.id}`
  }));
  res.json(simplifiedArtists);
});

app.get('/api/artists/:id', async (req, res) => {
  await db.read();
  const artist = db.data.artists.find(a => a.id === req.params.id);
  
  if (!artist) {
    return res.status(404).json({ error: 'Artist not found' });
  }
  
  res.json(artist);
});

// Add a new artist
app.post('/api/artists', async (req, res) => {
  await db.read();
  const newArtist = req.body;
  
  // Basic validation
  if (!newArtist.name || !newArtist.id) {
    return res.status(400).json({ error: 'Name and ID are required' });
  }
  
  // Check if artist already exists
  if (db.data.artists.some(a => a.id === newArtist.id)) {
    return res.status(409).json({ error: 'Artist with this ID already exists' });
  }
  
  db.data.artists.push(newArtist);
  await db.write();
  
  res.status(201).json(newArtist);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
