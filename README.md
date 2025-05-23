# mycompany Amazon Connect CCP (Contact Center Panel)

This project is a custom Contact Center Panel (CCP) for Amazon Connect, designed for mycompany's E911 and address validation workflows. It provides a modern, responsive UI for agents to handle calls, validate addresses, and interact with Amazon Connect.

## Features
- Amazon Connect CCP integration (with mock mode for development)
- E911 address validation and options
- System-validated address display
- API response panel
- Responsive layout for desktop and mobile
- CCP mockup toggle for UI/UX demonstration

## Project Structure
```
amazon-connect-ccp/
├── app/                # Next.js app directory
├── components/         # React components (CCPContainer, AddressValidation, etc.)
├── public/             # Static assets (mockup images, etc.)
├── styles/             # Global and component CSS
├── README.md           # Project documentation
└── ...
```

## Getting Started
1. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Usage
- The left panel displays the Amazon Connect CCP or a mockup image (toggle with the switch).
- The right panel provides address validation, system-validated address, E911 options, and API response.
- All panels are fully responsive and adapt to browser/device size.

## Customization
- To use your own CCP mockup, place an image at `public/mockup/ccp-mockup.png`.
- Update environment variables in `.env.local` for your Amazon Connect instance.

## Development Notes
- The project uses a mock `connect` object for local development. In production, it connects to the real Amazon Connect CCP.
- All static assets (images, etc.) should be placed in the `public/` directory.

## License
This project is proprietary to mycompany. For internal use only.
