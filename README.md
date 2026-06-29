# Xebia Enterprise LMS Portal - Frontend

An enterprise-level learning management system (LMS) portal frontend built for Xebia Consultants and Tech Architects. This repository contains the complete user interface, modular widgets, layouts, routing, caching hooks, and SSI authentication flows. It is pre-configured to consume a Spring Boot REST backend or automatically run in standalone demo/mock mode using `localStorage`.

---

## 1. Tech Stack
- **Framework**: Next.js (v16 App Router)
- **Runtime**: React (v19)
- **Styling**: Tailwind CSS (v4)
- **State Management & Caching**: Tanstack React Query (v5)
- **Authentication**: NextAuth.js (v4)
- **Icons**: Lucide React

---

## 2. Folder Structure
The codebase is structured around clean system design principles with a highly modular and separation-of-concerns architecture:

```text
xebia-lms-portal/
├── src/
│   ├── app/                 # App Router page nodes & layout shells
│   │   ├── api/auth/        # NextAuth authentication credentials route
│   │   ├── admin/           # Admin panel console view nodes
│   │   ├── categories/      # Category pathways view nodes
│   │   ├── courses/         # Courses listing catalog & details view nodes
│   │   ├── learn/           # Interactive course lesson player view nodes
│   │   ├── dashboard/       # Core cockpit dashboard page
│   │   ├── signin/          # Login credentials SSO interface page
│   │   ├── globals.css      # Base CSS stylesheet including custom fonts
│   │   ├── layout.js        # Root html/body document wrapper
│   │   └── not-found.js     # Custom branded 404 page
│   ├── components/
│   │   ├── common/          # Reusable shared blocks (Sidebar, Navbar, Button, Card, Modal, Input)
│   │   └── content/         # ContentRenderer block formatting parser
│   ├── services/
│   │   ├── mockData.js      # Mock datasets (categories, courses, submodules, blocks)
│   │   └── api.js           # Reusable API fetch wrappers and fallback handlers
│   ├── hooks/               # Custom hooks for categories, courses, modules, submodules, contents
│   ├── context/             # Global providers (QueryProvider, ToastProvider)
│   └── middleware.js        # NextAuth protected routing middleware
├── public/                  # Static brand assets (xebia-logo.png)
├── .env.example             # Project configuration template
├── package.json             # Package configuration
├── next.config.mjs          # Next.js configurations
└── tailwind.config.js       # Tailwind theme and custom color palettes config
```

---

## 3. Installation

1. Clone the frontend project.
2. Install node dependencies:
   ```bash
   npm install
   ```

---

## 4. Environment Variables
To customize runtime configurations, copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Define the variables in `.env.local`:
- `NEXT_PUBLIC_API_URL`: The entrypoint URL of the Spring Boot REST API (default: `http://localhost:8080/api`).
- `NEXT_PUBLIC_USE_MOCK_API`: Set to `true` to run the application in full Mock Demo Mode (bypasses all backend calls and reads/writes to `localStorage`). Set to `false` to communicate with the Spring Boot server.
- `NEXTAUTH_URL`: The application URL (default: `http://localhost:3000`).
- `NEXTAUTH_SECRET`: A secure randomly-generated key for signing sessions.

---

## 5. Running the Project

To launch the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development Login Credentials (Demo SSO Mode)

| Profile | Email Address | Password | Role |
| :--- | :--- | :--- | :---: |
| **Learner** | `learner@xebia.com` | `learner123` | `learner` |
| **Admin** | `admin@xebia.com` | `admin123` | `admin` |

---

## 6. Backend Integration Instructions (For Spring Boot Team)

### 6.1 API endpoints mapping
Centralized fetching resides in `src/services/api.js`. The frontend expects endpoints to implement the following routes:

#### Categories
- `GET /categories` - Retrieve list of categories.
- `GET /categories/slug/{slug}` - Retrieve category detail by its slug.
- `POST /categories` - Create a new category.
- `PUT /categories/{id}` - Update a category.
- `DELETE /categories/{id}` - Delete a category.

#### Courses
- `GET /courses` - Retrieve courses. Query params: `search` (string), `categoryId` (string), `level` (string: `All` | `Beginner` | `Intermediate` | `Advanced`).
- `GET /courses/slug/{slug}` - Retrieve course details by slug.
- `POST /courses` - Create a new course.
- `PUT /courses/{id}` - Update a course.
- `DELETE /courses/{id}` - Delete a course.

#### Modules
- `GET /courses/{courseId}/modules` - Retrieve modules belonging to a course, ordered by `order` asc.
- `POST /modules` - Create a new module.
- `PUT /modules/{id}` - Update a module.
- `DELETE /modules/{id}` - Delete a module.
- `POST /courses/{courseId}/modules/reorder` - Reorder modules list. Payload: `{ orderedIds: [id1, id2, ...] }`.

#### Submodules
- `GET /modules/{moduleId}/submodules` - Retrieve submodules list.
- `GET /courses/{courseSlug}/learn/{submoduleSlug}` - Retrieve submodule detail by course slug and submodule slug.
- `POST /submodules` - Create a new submodule.
- `PUT /submodules/{id}` - Update a submodule.
- `DELETE /submodules/{id}` - Delete a submodule.
- `POST /modules/{moduleId}/submodules/reorder` - Reorder submodules list. Payload: `{ orderedIds: [id1, id2, ...] }`.

#### Contents
- `GET /submodules/{submoduleId}/contents` - Retrieve content blocks list.
- `POST /contents` - Create a new content block.
- `PUT /contents/{id}` - Update a content block.
- `DELETE /contents/{id}` - Delete a content block.
- `POST /submodules/{submoduleId}/contents/reorder` - Reorder content blocks list. Payload: `{ orderedIds: [id1, id2, ...] }`.

### 6.2 Switch from Mock API to Spring Boot API
1. Start your Spring Boot backend on port `8080`.
2. Configure `.env.local` parameters:
   ```text
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   NEXT_PUBLIC_USE_MOCK_API=false
   ```
3. Restart the Next.js development server. The frontend will now call your API endpoints directly. If the server is offline or connection is refused, it will fallback to local mock mode and present a `"Demo Mode"` status pill.

---

## 7. Build and Deployment

### Production Build
To create an optimized production build:
```bash
npm run build
```

### Start Server
To spin up the compiled Next.js production build:
```bash
npm run start
```

### Deployment
The frontend is ready for containerization or immediate hosting:
- **Docker**: A standard node environment package using multi-stage builds.
- **Hosting Platforms**: Compatible with Vercel, Netlify, AWS Amplify, or a Node.js container (ECS, Kubernetes).
