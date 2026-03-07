# 📋 Task Management System

A full-stack Task Management application built with **Spring Boot** (backend) and **React** (frontend), featuring AI assistance, OAuth integrations, Google Sheets sync, and real-time notifications.

🌐 **Live Demo:** [https://task-management-system-five-eta.vercel.app](https://task-management-system-five-eta.vercel.app)

---

## 🚀 Features

- **Task Management** — Create, assign, update, and delete tasks with priority and status tracking
- **User Authentication** — JWT-based secure login and registration with email verification
- **OAuth Integrations** — Login and connect with Google, GitHub, and Slack
- **AI Assistant** — OpenAI-powered help for task suggestions and productivity tips
- **Google Sheets Sync** — Export and sync tasks to Google Sheets via Service Account
- **Email Notifications** — Gmail SMTP integration for task reminders and alerts
- **Notes & Todos** — Personal notes and todo lists per user
- **Reports & Dashboard** — Visual task analytics and productivity reports
- **User Settings & Preferences** — Profile management, theme, and notification preferences
- **File Uploads** — Attach files to tasks (up to 10MB)
- **Encryption** — Sensitive data encrypted at rest

---

## 🛠️ Tech Stack

### Backend
| Technology | Usage |
|---|---|
| Java 17 | Core language |
| Spring Boot 3.2.1 | Application framework |
| Spring Security + JWT | Authentication & authorization |
| Spring Data JPA + Hibernate | ORM & database access |
| PostgreSQL | Production database |
| Google Sheets API | Spreadsheet integration |
| Spring Mail (Gmail SMTP) | Email notifications |
| OpenAI API | AI assistant |
| Docker | Containerization |

### Frontend
| Technology | Usage |
|---|---|
| React | UI framework |
| Axios | HTTP client |
| Vercel | Hosting & deployment |

### DevOps
| Tool | Usage |
|---|---|
| Render | Backend hosting |
| Vercel | Frontend hosting |
| GitHub | Version control |
| Docker | Multi-stage build |

---

## 📁 Project Structure

```
Task_Management_System/
├── Task_Management_Tool_Backend/     # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/TaskManagementTool/
│   │   │   │   ├── Config/           # Security, CORS, Google Sheets config
│   │   │   │   ├── Controller/       # REST API endpoints
│   │   │   │   ├── Service/          # Business logic
│   │   │   │   ├── Repository/       # JPA repositories
│   │   │   │   └── Model/            # Entity classes
│   │   │   └── resources/
│   │   │       └── application.properties
│   └── Dockerfile
└── taskmanagementsystem_Frontend/    # React frontend
    ├── src/
    │   ├── Api/                      # Axios API config and calls
    │   ├── Components/               # React components
    │   └── pages/                    # Page components
    └── .env
```

---

## ⚙️ Environment Variables

### Backend (Render)
```
SPRING_DATASOURCE_URL         = jdbc:postgresql://<host>/<dbname>
DB_USERNAME                   = <postgres username>
DB_PASSWORD                   = <postgres password>
MAIL_USERNAME                 = <gmail address>
MAIL_PASSWORD                 = <gmail app password>
CORS_ALLOWED_ORIGINS          = <frontend URL>
OPENAI_API_KEY                = <openai key>
GOOGLE_CREDENTIALS_JSON       = <service account JSON as single line>
GOOGLE_CLIENT_ID              = <google oauth client id>
GOOGLE_CLIENT_SECRET          = <google oauth client secret>
GOOGLE_REDIRECT_URI           = <backend URL>/api/integrations/oauth/google/callback
GITHUB_CLIENT_ID              = <github oauth client id>
GITHUB_CLIENT_SECRET          = <github oauth client secret>
GITHUB_REDIRECT_URI           = <backend URL>/api/integrations/oauth/github/callback
SLACK_APP_ID                  = <slack app id>
SLACK_CLIENT_ID               = <slack client id>
SLACK_CLIENT_SECRET           = <slack client secret>
SLACK_REDIRECT_URI            = <backend URL>/api/integrations/oauth/slack/callback
SLACK_SIGNING_SECRET          = <slack signing secret>
ENCRYPTION_KEY                = <32 character key>
SPRING_PROFILES_ACTIVE        = prod
```

### Frontend (Vercel)
```
REACT_APP_API_URL = https://<backend-url>/api
```

---

## 🐳 Docker

Multi-stage Dockerfile for optimized production builds:

```dockerfile
# Build stage
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /build
COPY Task_Management_Tool_Backend/pom.xml .
COPY Task_Management_Tool_Backend/src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /build/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Xms256m", "-Xmx384m", "-jar", "app.jar"]
```

---

## 🚀 Deployment

### Backend — Render
1. Connect GitHub repo to Render
2. Select **Docker** environment
3. Add all environment variables
4. Deploy

### Frontend — Vercel
1. Connect GitHub repo to Vercel
2. Set `REACT_APP_API_URL` environment variable
3. Deploy

---

## 🏃 Running Locally

### Backend
```bash
cd Task_Management_Tool_Backend
mvn spring-boot:run
```
Requires `application-local.properties` with local database and credentials.

### Frontend
```bash
cd taskmanagementsystem_Frontend
npm install
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT |
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/{id}` | Update a task |
| DELETE | `/api/tasks/{id}` | Delete a task |
| GET | `/api/notes` | Get all notes |
| GET | `/api/todos` | Get all todos |
| GET | `/api/dashboard` | Get dashboard data |
| POST | `/api/integrations/oauth/google` | Google OAuth |
| POST | `/api/integrations/oauth/github` | GitHub OAuth |
| POST | `/api/integrations/oauth/slack` | Slack OAuth |

---

## 👨‍💻 Author

**Franklin Surya**
- GitHub: [@franklinsurya4](https://github.com/franklinsurya4)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
