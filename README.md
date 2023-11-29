# <img src="https://github.com/akash-singh8/duelXO/assets/85285176/314da644-d415-4036-9474-32af7def5c29" alt="logo" width="180px">

DuelXO is a modern and engaging Tic Tac Toe game that offers two exciting gameplay options:

1. **Play on the Same Device:**
   - Players can enjoy a classic game of Tic Tac Toe on the same device, making it a perfect option for friends sitting together.

2. **Multiplayer:**
   - Create a room and invite a friend to join from a different device.
   - Utilizes WebSockets to establish a real-time connection between players, making the multiplayer experience seamless and interactive.


## Table of Contents

- [Features and Tech](#features-and-tech)
- [Gameplay](#gameplay)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)


## Features and Tech

- **Web App:**
  - The web app is built using Next.js, providing a smooth and responsive user interface.
  - Modern design crafted with Figma for an aesthetic look and feel.

- **Server:**
  - Express is used as the server framework to handle HTTP requests.
  - WebSockets are employed to create a persistent, bidirectional communication channel between players, ensuring real-time updates during gameplay.

- **Optimized WebSocket Logic:**
  - Efficient logic to manage and store WebSocket connections for players in the same room.
  - Seamless synchronization of moves and updates for a lag-free multiplayer experience.


## Gameplay

https://github.com/akash-singh8/duelXO/assets/85285176/5a61a5d4-5c0f-42d5-b081-5ed6feb33b12


## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/akash-singh8/duelxo.git
   cd duelxo
   ```

2. **Install Dependencies:**
   ```bash
   npm install -g pnpm
   pnpm install
   ```

3. **Run Apps:**
   ```bash
   pnpm run dev
   ```

4. **Enjoy the game:**
   - Web App: http://localhost:3000
   - Server: http://localhost:3053


## Contributing
Contributions are welcome! If you'd like to enhance the game, fix bugs, or add new features, please follow these steps:

1. Fork the repository.
2. Create a new branch: git checkout -b feature-name.
3. Make your changes and commit them: git commit -m 'Add new feature'.
4. Push to the branch: git push origin feature-name.
5. Submit a pull request.


## License

This project is licensed under the [MIT License](LICENSE)

