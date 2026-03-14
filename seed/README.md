# VCS Pro — Sanity Seed Script

Populates your Sanity dataset with all VCS Pro content derived from the project files.

## What Gets Seeded

| Document Type     | Count | Content Source                              |
|-------------------|-------|---------------------------------------------|
| Global Settings   | 1     | Navigation + social icons + footer columns  |
| Page: Home        | 1     | Workday_Solutions + Web_Development_page    |
| Page: Workday     | 1     | Workday_Solutions (full content)            |
| Page: Web & AI    | 1     | Web_Development_page (full content)         |
| Page: About Us    | 1     | About_Us.docx (full content)                |
| Page: Contact     | 1     | Contact_Us.docx (full content)              |
| Page: Blog        | 1     | Blog_Page_Structure.docx                    |
| Blog Post (feat.) | 1     | Workday Integration Roadmap 2026            |
| Blog Post         | 1     | Bi-Annual Workday Update Strategy           |
| Blog Post         | 1     | Strapi for Enterprise CMS                   |
| Blog Post         | 1     | WhatsApp API + NLP Bots                     |
| Blog Post         | 1     | HIPAA Compliance in Modern Apps             |
| Blog Post (feat.) | 1     | Ideation to Go-Live Lifecycle               |
| **Total**         | **13**|                                             |

## Setup

### Step 1 — Create a write token in Sanity

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project → **API** tab → **Tokens**
3. Click **Add API token**
4. Name: `Seed Script` | Role: **Editor**
5. Copy the token

### Step 2 — Configure studio/.env

```bash
# From the studio/ directory:
cp .env.example .env
```

Edit `.env`:
```
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_TOKEN=your_editor_token_here
```

### Step 3 — Run the seed

```bash
# From the studio/ directory:
npm install
npm run seed
```

Expected output:
```
🌱 VCS Pro Sanity Seed Script
═══════════════════════════════════════════════
📡 Project ID : abc123xyz
🗄️  Dataset    : production
═══════════════════════════════════════════════

  ✅ settings → "settings"
  ✅ page → "Home"
  ✅ page → "Workday Solutions"
  ✅ page → "Web & AI Development"
  ✅ page → "About Us"
  ✅ page → "Contact Us"
  ✅ page → "Blog & Insights"
  ✅ blogPost → "The 2026 Roadmap for Workday Integration..."
  ✅ blogPost → "Navigating Bi-Annual Workday Updates..."
  ✅ blogPost → "Why We Choose Strapi for Enterprise CMS..."
  ✅ blogPost → "WhatsApp Business API for Enterprise..."
  ✅ blogPost → "HIPAA Compliance in Modern Web Applications..."
  ✅ blogPost → "From Ideation to Go-Live..."

═══════════════════════════════════════════════
✅ Created/Updated : 13
═══════════════════════════════════════════════

🎉 Seed complete!
```

## Re-running

The seed uses `createOrReplace` — it is safe to run multiple times.
Re-running will overwrite any manual edits made to seeded documents.

## Running from Docker

```bash
# If your studio container is already running:
docker exec -it vcspro_studio node seed/seed.js

# Or run a one-off container:
docker compose run --rm studio node seed/seed.js
```
