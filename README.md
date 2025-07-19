# Staff Intranet

A modern Angular-based staff intranet application for internal company communications and resources.

## Features

- Modern Angular 20 application
- Tailwind CSS for styling
- Authentication system
- Dashboard interface
- Landing page
- Login functionality

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Strawhats-Sanji/internal-web.git
cd internal-web
```

2. Install dependencies:
```bash
npm install
```

## Development

### Development server

To start a local development server, run:

```bash
npm start
# or
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Building

To build the project for production:

```bash
npm run build
# or
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. The production build optimizes your application for performance and speed.

### Testing

To execute unit tests:

```bash
npm test
# or
ng test
```

## Deployment

This project is configured for deployment to GitHub Pages. The deployment is handled automatically through GitHub Actions.

### Manual Deployment

To manually deploy to GitHub Pages:

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
ng deploy --base-href=/internal-web/
```

## Project Structure

```
src/
├── app/
│   ├── auth-callback/     # Authentication callback handling
│   ├── dashboard-page/    # Main dashboard interface
│   ├── landing-page/      # Landing page component
│   ├── login-page/        # Login functionality
│   ├── app.config.ts      # Application configuration
│   ├── app.routes.ts      # Routing configuration
│   └── app.ts            # Main application component
├── index.html            # Main HTML file
└── main.ts              # Application entry point
```

## Technologies Used

- **Angular 20** - Frontend framework
- **TypeScript** - Programming language
- **Tailwind CSS** - Utility-first CSS framework
- **RxJS** - Reactive programming library
- **Angular Router** - Client-side routing

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary to the organization.

## Support

For support and questions, please contact the development team.
