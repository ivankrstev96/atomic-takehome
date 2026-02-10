# Task Management App

Multi-project Gradle setup with:

- Backend: Spring Boot (Java 25) with In-memory H2 Database
- Frontend: React + Vite + TypeScript

### Requirements

- OpenJDK 25 (Java 25)
- Node.js (LTS recommended)
- npm
- Gradle (or use Gradle Wrapper)

### Getting Started

1. Clone the repository
   - git clone https://github.com/ivankrstev96/atomic-takehome.git
   - cd atomic-takehome

2. Run Gradle task **build**

   This step is required before running the frontend because it installs npm dependencies. 
   You can run it from your IDE (preferred) or through .\gradlew build
    
3. Run the applications

    Two run configurations are already included in the repository:

   - Backend: AtomicTakeHomeApplication
   - Frontend: AtomicTakeHomeFrontend

You can run them directly from your IDE.