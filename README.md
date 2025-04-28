# Pokémon Explorer

A React application that fetches data from the PokeAPI and allows users to search and filter through the first 150 Pokémon.

## Features

- **Pokémon Display**: Shows the first 150 Pokémon with their names, images, types, and ID numbers in a responsive card layout.
- **Search Functionality**: Filter Pokémon by name in real-time.
- **Type Filtering**: Filter Pokémon by their elemental type (Fire, Water, Grass, etc.).
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Loading & Error States**: Proper handling of loading states and API errors.

## Tech Stack

- **React.js**: Frontend library for building the user interface
- **Tailwind CSS**: Utility-first CSS framework for styling
- **PokeAPI**: RESTful API for Pokémon data (https://pokeapi.co/)

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Mayank-Pandey-ji/pokemon-explorer.git
   cd pokemon-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── App.js         # Main application component
├── index.js       # Entry point
├── components/    # Reusable components
│   └── PokemonCard.js
└── styles/        # CSS styles
```

## How It Works

- The application fetches data from the PokeAPI when it first loads
- Users can search for Pokémon by typing in the search bar
- Users can filter Pokémon by type using the dropdown menu
- Results update in real-time as users type or select filters
- If no Pokémon match the criteria, a friendly message is shown

## Future Enhancements

- Add pagination or infinite scrolling for viewing more Pokémon
- Implement detailed view for each Pokémon
- Add sorting options (by ID, name, etc.)
- Include more filtering options (by abilities, stats, etc.)
- Add favorites functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing the Pokémon data
- [React](https://reactjs.org/) for the amazing frontend library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
