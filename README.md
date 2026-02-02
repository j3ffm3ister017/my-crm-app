# Twenty.com CRM Inbox Prototype

A modern, B2B CRM experience designed to help sales professionals maintain control over their deals and communications. This prototype focuses on an "Inbox as a System" philosophy, prioritizing clarity, ease of use, and action-oriented flows over purely decorative visuals.

## 🚀 Features

- **Urgency-Based Inbox:** Automatically prioritizes tasks based on urgency and importance, helping users focus on what matters now.
- **Deal Intelligence:** Integrated contextual views for Companies and Deals.
- **Smart Microinteractions:** Delightful animations (confetti, smooth transitions) to make the workflow engaging.
- **AI-Powered:** Leverages the Google Gemini API for intelligent context and assistance.
- **Task Management:** Seamless flow for snoozing, marking as waiting, and completing tasks.

## 🛠️ Tech Stack

- **Frontend:** React (v19)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **AI SDK:** Google GenAI SDK (@google/genai)
- **Deployment:** Vercel

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/twenty-crm-prototype.git
   cd twenty-crm-prototype
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🚀 Deployment

This project is optimized for deployment on **Vercel**.

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. In the Vercel Project Settings, navigate to **Environment Variables**.
4. Add `VITE_GEMINI_API_KEY` with your production API key.
5. Deploy!

## 📄 License

This project is a prototype and is available for educational and demonstration purposes.
