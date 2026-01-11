# 🧠 Fana Mind - AI-Powered Learning Management System

<div align="center">

![Fana Mind Logo](src/assets/logo.png)

**Transform Your Learning Journey with Cutting-Edge AI Technology**

[![Vue.js](https://img.shields.io/badge/Vue.js-3.2+-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-3.0+-FFD859?style=for-the-badge&logo=pinia&logoColor=black)](https://pinia.vuejs.org/)

[🚀 Live Demo](https://fanamind.com) • [📖 Documentation](https://docs.fanamind.com) • [🐛 Report Bug](https://github.com/fanamind/frontend/issues) • [💡 Request Feature](https://github.com/fanamind/frontend/issues)

</div>

---

## 🌟 Overview

Fana Mind is a revolutionary AI-powered Learning Management System (LMS) that transforms traditional education through personalized learning experiences, real-time analytics, and collaborative environments. Built with modern web technologies, it provides an intuitive platform for students, instructors, and administrators to engage in effective online learning.

### ✨ Key Features

- 🤖 **AI-Powered Personalization** - Adaptive learning paths tailored to individual needs
- 📊 **Real-Time Analytics** - Comprehensive progress tracking and performance insights
- 🎥 **Interactive Content** - Rich multimedia lessons with video, quizzes, and assignments
- 👥 **Collaborative Learning** - Live discussions, group projects, and peer interactions
- 📱 **Responsive Design** - Seamless experience across all devices
- 🔒 **Secure Authentication** - Multi-provider OAuth and robust security measures
- 🌐 **Real-Time Communication** - WebSocket-powered notifications and live updates
- 📈 **Advanced Reporting** - Detailed analytics for students and instructors

## 🏗️ Architecture

### Tech Stack

**Frontend Framework**
- **Vue.js 3.2+** - Progressive JavaScript framework with Composition API
- **TypeScript 5.8+** - Type-safe development with enhanced IDE support
- **Vite 5.0+** - Lightning-fast build tool and development server

**State Management & Routing**
- **Pinia 3.0+** - Intuitive state management with TypeScript support
- **Vue Router 4.0+** - Official router with dynamic routing capabilities

**UI & Styling**
- **SCSS/Sass** - Advanced CSS preprocessing with custom design system
- **Bootstrap Vue Next** - Modern Bootstrap components for Vue 3
- **FontAwesome** - Comprehensive icon library
- **Custom Design System** - Modern glassmorphism and gradient-based UI

**Development & Testing**
- **Vite** - Fast development server with HMR
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing
- **ESLint + Prettier** - Code quality and formatting

**Communication & Data**
- **Axios** - HTTP client with interceptors and error handling
- **Socket.IO** - Real-time bidirectional communication
- **Chart.js** - Interactive data visualizations

### Project Structure

```
src/
├── assets/              # Static assets (images, fonts)
├── components/          # Reusable Vue components
│   ├── Charts/         # Data visualization components
│   ├── Common/         # Shared UI components
│   ├── Layout/         # Layout components (navbar, footer)
│   ├── Sections/       # Page section components
│   └── UI/             # Basic UI elements
├── plugins/            # Vue plugins and configurations
├── router/             # Vue Router configuration
├── services/           # API services and business logic
├── store/              # Pinia store modules
│   └── modules/        # Feature-specific stores
├── styles/             # Global styles and design system
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and helpers
├── views/              # Page components
├── App.vue             # Root component
└── main.ts             # Application entry point
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 or **yarn** >= 1.22.0

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fanamind/frontend.git
   cd fana-mind-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables:
   ```env
   VITE_API_BASE_URL=https://api.fanamind.com
   VITE_WS_URL=wss://ws.fanamind.com
   VITE_OAUTH_GOOGLE_CLIENT_ID=your_google_client_id
   # ... other configurations
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run serve        # Alternative dev command

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Lint and fix code
npm run type-check   # TypeScript type checking

# Testing
npm run test:unit    # Run unit tests
npm run test:e2e     # Run end-to-end tests
```

### Development Workflow

1. **Feature Development**
   - Create feature branch: `git checkout -b feature/your-feature`
   - Follow component-based architecture
   - Use TypeScript for type safety
   - Write unit tests for new components

2. **Code Standards**
   - Follow Vue 3 Composition API patterns
   - Use Pinia for state management
   - Implement responsive design principles
   - Maintain accessibility standards (WCAG 2.1)

3. **Testing Strategy**
   - Unit tests with Vitest
   - Component testing with Vue Test Utils
   - E2E testing with Playwright
   - Visual regression testing

## 🎨 Design System

### Color Palette

```scss
// Primary Colors
--fana-primary: #6366f1;        // Indigo
--fana-secondary: #ec4899;      // Pink
--fana-accent-blue: #06b6d4;    // Cyan
--fana-accent-green: #10b981;   // Emerald

// Gradients
--fana-gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
--fana-gradient-secondary: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
```

### Typography

- **Display Font**: Poppins (headings, branding)
- **Body Font**: Inter (content, UI elements)
- **Monospace**: JetBrains Mono (code, technical content)

### Components

- **Modern Glass Morphism** - Translucent cards with backdrop blur
- **Gradient Buttons** - Interactive elements with smooth transitions
- **Responsive Grid System** - Mobile-first responsive layouts
- **Dark/Light Theme Support** - Automatic theme switching

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `https://api.fanamind.com` |
| `VITE_WS_URL` | WebSocket server URL | `wss://ws.fanamind.com` |
| `VITE_OAUTH_GOOGLE_CLIENT_ID` | Google OAuth client ID | - |
| `VITE_ANALYTICS_ENABLED` | Enable analytics tracking | `true` |
| `VITE_DEBUG_MODE` | Enable debug mode | `false` |

### Build Configuration

The project uses Vite for building with the following optimizations:

- **Code Splitting** - Automatic route-based code splitting
- **Tree Shaking** - Dead code elimination
- **Asset Optimization** - Image compression and optimization
- **Bundle Analysis** - Size analysis and optimization recommendations

## 📊 Features Deep Dive

### 🤖 AI-Powered Learning

- **Adaptive Learning Paths** - AI algorithms adjust content difficulty based on performance
- **Intelligent Recommendations** - Personalized course and content suggestions
- **Automated Assessment** - AI-powered quiz generation and grading
- **Learning Analytics** - Predictive insights for learning outcomes

### 📈 Analytics Dashboard

- **Student Progress Tracking** - Real-time progress monitoring
- **Performance Metrics** - Detailed analytics on learning patterns
- **Engagement Analytics** - Time spent, interaction rates, completion rates
- **Predictive Analytics** - Early warning systems for at-risk students

### 🎓 Course Management

- **Rich Content Editor** - TipTap-based WYSIWYG editor
- **Video Integration** - Seamless video upload and streaming
- **Interactive Quizzes** - Multiple question types with instant feedback
- **Assignment System** - File uploads, peer reviews, automated grading

### 👥 Collaboration Tools

- **Real-Time Chat** - Socket.IO powered messaging
- **Discussion Forums** - Threaded discussions with moderation
- **Group Projects** - Collaborative workspaces and file sharing
- **Live Sessions** - Virtual classrooms with screen sharing

## 🔒 Security

### Authentication & Authorization

- **JWT Token Management** - Secure token-based authentication
- **OAuth Integration** - Google, Microsoft, GitHub login support
- **Role-Based Access Control** - Student, Instructor, Admin roles
- **Session Management** - Automatic token refresh and logout

### Data Protection

- **HTTPS Enforcement** - All communications encrypted
- **Input Validation** - Client and server-side validation
- **XSS Protection** - Content Security Policy implementation
- **CSRF Protection** - Token-based CSRF prevention

## 🚀 Deployment

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Docker Deployment

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Environment-Specific Builds

- **Development**: Hot reload, source maps, debug tools
- **Staging**: Production build with debug information
- **Production**: Optimized build with minification and compression

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vue.js Team** - For the amazing framework
- **Vite Team** - For the lightning-fast build tool
- **Open Source Community** - For the incredible ecosystem of tools and libraries

## 📞 Support

- **Documentation**: [docs.fanamind.com](https://docs.fanamind.com)
- **Community Forum**: [community.fanamind.com](https://community.fanamind.com)
- **Email Support**: support@fanamind.com
- **GitHub Issues**: [Report bugs and request features](https://github.com/fanamind/frontend/issues)

---

<div align="center">

**Made with ❤️ by the Fana Mind Team**

[Website](https://fanamind.com) • [Twitter](https://twitter.com/fanamind) • [LinkedIn](https://linkedin.com/company/fanamind)

</div>