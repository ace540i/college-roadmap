# College Roadmap — Architecture

```mermaid
%%{init: {'theme': 'base'}}%%
graph TB
    subgraph Client["Browser / React 19 + TypeScript"]
        direction TB
        subgraph Auth["Auth Layer"]
            MSAL["MSAL Browser\n@azure/msal-react"]
            AuthCtx["AuthContext\nsrc/auth/AuthContext.tsx"]
            ProtRoute["ProtectedRoute\n15-min idle timeout"]
        end

        subgraph Pages["Pages (React Router v7)"]
            Login["/login — LoginPage"]
            Home["/ — HomePage"]
            G9["/grade-9 — Grade9Page"]
            G10["/grade-10 — Grade10Page"]
            G11["/grade-11 — Grade11Page"]
            G12["/grade-12 — Grade12Page"]
            Dash["/dashboard — DashboardPage"]
            Prof["/profile — ProfilePage"]
            Timeline["/timeline — TimelinePage"]
            Resources["/resources — ResourcesPage"]
            Placeholder["15× Placeholder Routes\n(coming soon)"]
        end

        subgraph UIComponents["UI Components"]
            Layout["Layout.tsx"]
            NavBar["NavBar.tsx\n(dropdown menus + external links)"]
            Sidebar["Sidebar.tsx\n(expandable grade menu)"]
            MilestoneSection["MilestoneSection.tsx\n(tasks + progress bar)"]
            GradeCard["GradeCard.tsx"]
            Chatbot["Chatbot.tsx"]
        end

        subgraph Hooks["Custom Hooks"]
            useMilestones["useMilestones.ts\n(fetch milestones + toggle tasks)"]
        end
    end

    subgraph Server["Azure App Service — Express + Node.js 20"]
        direction TB
        Entry["server/index.ts\nPORT 8080\nHelmet · CORS · JSON body"]

        subgraph Routes["API Routes (/api)"]
            Health["GET /api/health"]
            ProfRoute["POST /api/profile\nGET  /api/profile/:userId"]
            MilRoute["GET  /api/milestones/:grade"]
            ProgRoute["POST /api/progress\nGET  /api/progress/:userId"]
            DashRoute["GET  /api/dashboard/:userId"]
            SumRoute["GET  /api/summary/:userId"]
        end

        Static["Static Serve\n/build → React SPA\ncatch-all → index.html"]
        DBConn["server/db.ts\nMongoose connectDB()"]
    end

    subgraph Models["Mongoose Models (Cosmos DB)"]
        Student["Student\n─────────────\nuserId (unique)\ndisplayName · email\nfirstName · middleName · lastName\nstate · grade (9-12)"]
        Progress["Progress\n─────────────\nstudentId → Student\ntaskId (compound unique)\ngrade · milestoneTitle\ntaskTitle · completed\ncompletedAt · notes"]
        MilestoneCatalog["MilestoneCatalog\n─────────────\ngrade · title · description\norder\ntasks[ taskId, title,\n  description, order,\n  steps[order, text] ]"]
    end

    subgraph ExternalServices["External Services"]
        B2C["Azure AD B2C (CIAM)\ncollegeroadmap.onmicrosoft.com\nOpenID Connect / SSO"]
        CosmosDB["Azure Cosmos DB\n(MongoDB API)\nFree tier: 1000 RU/s · 25 GB"]
        GHActions["GitHub Actions CI/CD\nbuild-and-deploy.yml\nprovision-infra.yml"]
        Terraform["Terraform\nAzure infrastructure IaC"]
        EduLinks["External Educational APIs\nCollege Board · College Scorecard\nKhan Academy · BLS · MyNextMove\nCommon App · FAFSA · Fastweb"]
    end

    %% Auth flow
    MSAL -->|"Azure AD B2C OIDC"| B2C
    B2C -->|"JWT / session token"| MSAL
    MSAL --> AuthCtx --> ProtRoute --> Pages

    %% Frontend → Backend API
    useMilestones -->|"fetch /api/*"| Routes
    Pages --> useMilestones
    Pages --> UIComponents
    UIComponents --> Layout
    Layout --> NavBar & Sidebar

    %% NavBar external links
    NavBar -.->|"external links"| EduLinks

    %% Backend internals
    Entry --> Routes & Static
    Entry --> DBConn
    Routes --> Models
    DBConn --> CosmosDB
    Models --> CosmosDB

    %% Route → Model mapping
    ProfRoute --> Student
    MilRoute --> MilestoneCatalog
    ProgRoute --> Progress & Student
    DashRoute --> Student & MilestoneCatalog & Progress
    SumRoute --> Student & Progress

    %% CI/CD
    GHActions -->|"deploy"| Server
    GHActions --> Terraform -->|"provision"| CosmosDB
    Terraform -->|"provision"| Server

    %% Styling
    classDef authNode fill:#9b59b6,color:#fff,stroke:#7d3c98
    classDef pageNode fill:#2980b9,color:#fff,stroke:#1a5276
    classDef uiNode fill:#1abc9c,color:#fff,stroke:#148f77
    classDef hookNode fill:#e67e22,color:#fff,stroke:#ca6f1e
    classDef serverNode fill:#2c3e50,color:#fff,stroke:#1a252f
    classDef routeNode fill:#f39c12,color:#fff,stroke:#d68910
    classDef modelNode fill:#27ae60,color:#fff,stroke:#1e8449
    classDef azureNode fill:#0078d4,color:#fff,stroke:#005a9e
    classDef ciNode fill:#c0392b,color:#fff,stroke:#922b21
    classDef tfNode fill:#7b42bc,color:#fff,stroke:#5b2d8e
    classDef extNode fill:#5d6d7e,color:#fff,stroke:#424949

    class MSAL,AuthCtx,ProtRoute authNode
    class Login,Home,G9,G10,G11,G12,Dash,Prof,Timeline,Resources,Placeholder pageNode
    class Layout,NavBar,Sidebar,MilestoneSection,GradeCard,Chatbot uiNode
    class useMilestones hookNode
    class Entry,Static,DBConn serverNode
    class Health,ProfRoute,MilRoute,ProgRoute,DashRoute,SumRoute routeNode
    class Student,Progress,MilestoneCatalog modelNode
    class B2C,CosmosDB azureNode
    class GHActions ciNode
    class Terraform tfNode
    class EduLinks extNode
```

## Layer Summary

| Layer | Technology | Key detail |
|---|---|---|
| **Frontend** | React 19 + TypeScript + React Router v7 | 10 active pages, 15 placeholder routes, `useMilestones` hook drives all task data |
| **Auth** | MSAL React → Azure AD B2C (OIDC) | JWT stored in sessionStorage, 15-min idle timeout enforced by `ProtectedRoute` |
| **Backend** | Express 4 + Node.js 20 on Azure App Service | 6 route families; also serves the React SPA as static files via catch-all |
| **Database** | Mongoose → Azure Cosmos DB (MongoDB API) | 3 collections: `Student`, `Progress`, `MilestoneCatalog` (seeded with 4-grade catalog) |
| **Infra / CI/CD** | Terraform + GitHub Actions | Build → artifact → Azure deploy; infra provisioned separately via Terraform |
| **External links** | No API calls — NavBar links only | College Board, Khan Academy, BLS, FAFSA, etc. open in browser tabs |
