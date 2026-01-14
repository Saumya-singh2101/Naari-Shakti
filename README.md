# Digital Guardian - Cybersecurity Education Platform

A full-stack cybersecurity education platform empowering women through peer mentorship, community support, and digital safety training.

## Features

- ✅ User Authentication (Sign Up / Sign In)
- ✅ Avatar Selection System
- ✅ Role-based Access (Guardian/Protectee)
- ✅ User Profile Management
- ✅ Points & Leveling System
- ✅ Leaderboard
- ✅ Modern Cyberpunk UI/UX
- ✅ Responsive Design

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Modern UI with Neon/Cyberpunk Theme
- Responsive Design



## Setup Instructions



### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/digitalguardian
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   ```
   ```

3 **Start the Server**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Open the Application**
   
   Open `index.html` in your browser, or if using a server:
   - Frontend: Open `http://localhost:8000` (if using Python server)
   - Backend API: `http://localhost:5000/api`

## Project Structure

```
.
├── server.js              # Main server file
├── models/
│   └── User.js            # User model
├── routes/
│   ├── auth.js            # Authentication routes
│   └── user.js            # User profile routes
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── js/
│   ├── api.js             # API service
│   ├── main.js            # Main frontend logic
│   └── animations.js      # Animation effects
├── css/
│   ├── styles.css         # Main styles
│   └── neon-theme.css     # Neon theme styles
├── index.html             # Main HTML file
└── package.json           # Dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - Login user
- `GET /api/auth/verify` - Verify JWT token
- `GET /api/auth/avatars` - Get available avatars

### User
- `GET /api/user/profile` - Get user profile (requires auth)
- `PUT /api/user/profile` - Update user profile (requires auth)
- `PUT /api/user/points` - Update user points (requires auth)
- `GET /api/user/leaderboard` - Get leaderboard

## Usage

1. **Sign Up**: Click "Sign Up" button, fill in your details, select a role (Guardian/Protectee), choose an avatar, and create your account.

2. **Sign In**: Click "Login" button, enter your email and password.

3. **Profile**: Once logged in, your avatar and name will appear in the navigation bar.

4. **Logout**: Click the "Logout" button in the navigation bar.

## Development

### Running in Development Mode
```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when files change.





## Future Enhancements

- [ ] Mission system integration
- [ ] Real-time chat/messaging
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Social media integration
- [ ] Advanced analytics dashboard

## License

ISC

## Author

Saumya,Aarushi,Pranav

---

Built with 💜 for women to protect and raise their voice safely against the injustice


