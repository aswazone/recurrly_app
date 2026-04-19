<div align="center">
  <br />
    <a href="" target="_blank">
      <img src="assets/images/recurrly_banner_2.png" alt="Project Banner" width="auto">
    </a>
  <br />

  <div>
      <img src="https://img.shields.io/badge/-React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
      <img src="https://img.shields.io/badge/-NativeWind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
      <img src="https://img.shields.io/badge/-Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
      <img src="https://img.shields.io/badge/-Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" />
      <img src="https://img.shields.io/badge/-PostHog-F0AD4E?style=for-the-badge&logo=posthog&logoColor=white" />
      <img src="https://img.shields.io/badge/-CodeRabbit-FF5100?style=for-the-badge&logo=coderabbit&logoColor=white" />
  </div>

  <h3 align="center">Recurrly - Subscription Management App</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. ✨ [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">✨ Introduction</a>

Recurrly is a smart, mobile-first subscription tracking application built to help you manage your recurring expenses effortlessly. Developed with **Expo** and **React Native**, it delivers a seamless native experience across iOS and Android. The app features robust authentication using **Clerk** and a beautiful, modern user interface styled with **NativeWind** (Tailwind CSS for React Native).

## <a name="tech-stack">⚙️ Tech Stack</a>

- **[Expo](https://expo.dev/)** is a framework and a platform for universal React applications that simplifies the development, build, and deployment process for cross-platform apps.
- **[React Native](https://reactnative.dev/)** allows you to build native apps using React, giving you access to platform-specific APIs while using a familiar JavaScript/TypeScript codebase.
- **[NativeWind](https://www.nativewind.dev/)** brings the power of Tailwind CSS to React Native, allowing you to style your components using utility classes for a consistent and highly customizable UI.
- **[Clerk](https://clerk.com/)** provides highly secure, seamless authentication and user management with out-of-the-box UI components tailored for smooth login experiences.
- **[Expo Router](https://docs.expo.dev/router/introduction/)** offers powerful file-based routing to manage navigation naturally and keep the app structure clean.
- **[TypeScript](https://www.typescriptlang.org/)** adds static typing out of the box to catch errors early and enhance developer productivity with better tooling.

## <a name="features">🔋 Features</a>

👉 **Secure Authentication Workflow**: Complete sign-in, sign-up, and sign-out capabilities powered by Clerk and protected routes.

👉 **Subscription Management**: Centralized hub to view and manage your active subscriptions easily.

👉 **File-Based Navigation**: Utilizing Expo Router for intuitive tab-based navigation and deep linking capabilities.

👉 **Modern UI Design**: Consistent, responsive interfaces built with NativeWind utilities keeping styling minimal and highly maintainable.

👉 **Custom Fonts & Icons**: Integrated `PlusJakartaSans` font family and standard Expo Vector Icons natively directly into the design.

👉 **Cross-Platform Compatibility**: A single codebase smoothly compiling for both iOS and Android platforms via Expo infrastructure.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Expo Go](https://expo.dev/go) app installed on your physical device, or an iOS Simulator / Android Emulator on your setup.

**Cloning the Repository**

```bash
git clone https://github.com/aswazone/react_native-recurrly.git

cd react_native-recurrly
```

---

## 💻 Local Setup

**1. Install Dependencies**

Install the project dependencies using npm:

```bash
npm install
```

**2. Set Up Environment Variables**

Create a new file named `.env` or `.env.local` in the root of your project and add the following content:

```env
# Clerk Authentication Configuration
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Replace the placeholder value with your actual Clerk Publishable Key. You can get this by signing up at [**Clerk**](https://clerk.com/).

**3. Running the Project**

Start the Expo development server:

```bash
npm run start
```

---

## 📚 Essential Commands

**Clear Metro Bundler Cache**
If you encounter caching issues with NativeWind or Expo Router:

```bash
npm run start -- -c
```

**Lint Code**
Ensure code quality with ESLint:

```bash
npm run lint
```
##

<div style="display: flex; align-items: center; margin-bottom: 20px;border:solid 1px #1cb5f1;border-radius:50px;padding:7px">
  <img src="https://avatars.githubusercontent.com/u/177445642?s=400&u=5504247eb9ea198d8fdac615f25b22655b16c2d9&v=4" width="50" alt="Aswazone" style="border-radius: 50%; margin-right: 10px; box-shadow:0px 0px 1px 2px #0b4d66;">
  <p style="margin: 0;">Follow <a href="https://github.com/aswazone">Aswazone</a> on GitHub for more projects similar to this.</p>
</div>
