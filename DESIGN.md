# 🌸 Bloom — Design System & Technical Specifications

> **Bloom Card** is Africa's next-generation NFC digital business card and identity platform. Tap any physical card, wristband, or accessory to instantly share contact cards (`.vcf`), social profiles, portfolios, and capture high-converting leads without requiring an app.

---

## 🎨 1. Brand Identity & Design Philosophy

### Core Design Principles
1. **Premium & High-Impact First Impression**: Modern dark-mode aesthetics paired with vibrant neon cyan (`#00BCFF`), subtle glassmorphism, and ambient backdrops.
2. **Tactile Digital Hardware**: Physical NFC product finishes (aerospace steel, matte black PVC, eco bamboo) mirrored seamlessly in software interfaces.
3. **Zero-Friction Sharing**: Contacts are transferred in less than 500ms via native browser vCard stream or interactive web profiles.

### Color Palette

| Token Name | Hex Code / Tailwind Class | Visual Purpose |
| :--- | :--- | :--- |
| **Bloom Cyan (Primary Accent)** | `#00BCFF` (`text-[#00BCFF]`, `bg-[#00BCFF]`) | Primary CTAs, active states, active tab highlights, glow effects |
| **Obsidian Dark (Background)** | `#0F172A` / `#020617` (`bg-slate-950`, `bg-slate-900`) | Main dark mode container & card surfaces |
| **Pure Slate Light** | `#F8FAFC` (`bg-[#F8FAFC]`) | Clean light mode canvas background |
| **Emerald Verification** | `#10B981` (`emerald-500`, `emerald-400`) | Universal NFC compatibility badge, positive status, success toasts |
| **Purple Cyber Accent** | `#A855F7` (`purple-500`, `purple-400`) | Hardware chip technology badges, secondary highlight states |
| **Amber Warning / Gold** | `#F59E0B` (`amber-500`, `amber-400`) | Rose Gold Metallic finish accent, security warning alerts |
| **Rose Error State** | `#F43F5E` (`rose-500`, `rose-400`) | Unregistered card / tampered HMAC signature warning states |

### Typography System
- **Brand Title & Headlines**: `Plus Jakarta Sans` (`font-['Plus_Jakarta_Sans']`, bold & black weights).
- **Body & Interactive Controls**: `Inter` / `sans-serif` (clean, highly legible at small viewports).
- **Hardware IDs & Technical Badges**: `font-mono` for card UIDs (e.g. `BLM-88A92K-NFC`) and cryptographic signatures.

---

## 🚀 2. Hero Section Architecture

The hero section draws inspiration from modern high-converting fintech and SaaS web applications.

### Desktop Layout
- **Left Column**: High-converting headline (*"Meet once. Stay connected forever."*), value proposition description, primary CTA (**"Customize Your Card"**), and live trust badges (50,000+ taps, zero-app requirement).
- **Right Column (Slanted Cards Stack)**: 4 asymmetrical brand metric cards placed with static slant angles to accentuate tactile depth without distracting hover rotations:
  - **Card 1 (`-rotate-5`)**: NFC Tap Speed (`< 0.5s`, 100% iOS & Android Compatibility).
  - **Card 2 (`rotate-4`)**: Smart Networking (`+340% More Saved Connections`, High ROI Networking). Shifted upwards to create dynamic depth.
  - **Card 3 (`rotate-3`)**: Enterprise Tech (`NTAG216 High-Speed Chip`, AES-256 Encrypted Profile).
  - **Card 4 (`-rotate-3`)**: Lead Capture (`Instant Contact Sync`, Auto-Sync to Phonebook).

### Mobile Layout (`< 1024px`)
- **Staggered Stack Layout**: Cards 1 & 2 float above the headline text; Cards 3 & 4 float below the description. This guarantees headline text is **100% unobscured and legible** on mobile screens while maintaining identical slanted visual orientations.

---

## 💳 3. Product Catalog & Hardware Finishes

| Hardware Finish | Material / Spec | Base Price | Target Audience |
| :--- | :--- | :--- | :--- |
| **Stealth Matte Black** | Heavyweight PVC with matte soft-touch coating | ₦35,000 | Founders, Tech Executives, Creators |
| **Stainless Steel Edition** | Aerospace-grade brushed steel with laser engraving | ₦50,000 | C-Suite Executives, Investors |
| **Rose Gold Metallic** | Metallic rose gold finish with mirror accents | ₦45,000 | Creatives, Designers, Fashion |
| **Eco Bamboo Wood** | Sustainably sourced natural bamboo wood | ₦35,000 | Sustainability & ESG Advocates |
| **Active NFC Wristband** | Waterproof silicone wristband with embedded chip | ₦25,000 | Athletes, Event Organizers, Speakers |

---

## 🔒 4. NFC Card Tap Routing & Security Gatekeeper

When a physical Bloom card is tapped against an NFC-enabled smartphone (e.g. `https://www.enlazer.com.ng/card/BLM-88A92K-NFC?sig=a9f4c3b2`), the client evaluates the backend response (`GET /api/profile/:cardUid?sig=:sig`).

```
                              [ Physical NFC Card Tap ]
                                          │
                                          ▼
                      GET /api/profile/:cardUid?sig=:sig
                                          │
        ┌─────────────────────────────────┼─────────────────────────────────┐
        ▼                                 ▼                                 ▼
   HTTP 200 OK                     HTTP 409 Conflict                HTTP 401 / 404
(Claimed Profile)                  (Unclaimed Card)                (Invalid / Fake)
        │                                 │                                 │
        ▼                                 ▼                                 ▼
 Render Public Profile          Redirect to /claim               Redirect to /invalid-card
 `<ProfileView />`             `<ClaimCardPage />`               `<InvalidCardPage />`
Record Tap Event               Link Card to Account              Show Security Warning
`POST /api/taps/record`       `POST /api/cards/claim`            Suggest Official Order
```

### 1. Public Profile View (`/card/:cardUid` -> Status `200 OK`)
- Displays owner avatar, name, title, company, bio, location, phone, email, and social links.
- Supports 5 customizable themes (`Midnight Obsidian`, `Cyberpunk Glow`, `Sahara Sunset`, `Lagos Emerald`, `Minimal Pure Light`).
- Primary actions:
  - **"Save Contact to Phone"**: Downloads native `.vcf` contact file automatically.
  - **"Share Your Info Back"**: Opens `<ShareBackModal />` allowing tap recipients to exchange details back to the owner's dashboard.

### 2. Card Claiming Page (`/claim` -> Status `409 Conflict`)
- Query parameter: `?cardUid=BLM-XXXX-NFC`.
- Display: *"🎉 Welcome to Bloom! You've tapped a brand new NFC Card."*
- **Authenticated State**: Displays **"Claim Card & Link to My Profile"** calling `POST /api/cards/claim`. Upon success, redirects to the dashboard with a success toast.
- **Unauthenticated State**: Displays **"Log In to Claim"** and **"Create Account to Claim"**, preserving the pending `cardUid` in `localStorage` to complete claiming immediately post-authentication.

### 3. Invalid Card Page (`/invalid-card` -> Status `401 / 404`)
- **`401 Unauthorized` (`tampered_signature`)**: Displays *"Invalid NFC Signature. This card signature is fake or modified."*
- **`404 Not Found` (`unregistered_card`)**: Displays *"Unregistered Card. This card has not been registered or provisioned in our system."*
- Primary CTA: **"Order Official Bloom Card"** -> routes to physical card catalog.

---

## 🛠️ 5. Application Router & Page Directory

| Route / State Identifier | Component Path | Purpose |
| :--- | :--- | :--- |
| `'home'` | [App.jsx](file:///home/onuigbo-precious/infarbloom/src/App.jsx) | Landing page with Hero, Showcase, Steps, FAQs |
| `'card-tap'` (`/card/*`) | [CardTapHandler.jsx](file:///home/onuigbo-precious/infarbloom/src/pages/CardTapHandler.jsx) | NFC tap evaluator & status gatekeeper |
| `'claim-card'` (`/claim`) | [ClaimCardPage.jsx](file:///home/onuigbo-precious/infarbloom/src/pages/ClaimCardPage.jsx) | Hardware card claiming workflow |
| `'invalid-card'` (`/invalid-card`)| [InvalidCardPage.jsx](file:///home/onuigbo-precious/infarbloom/src/pages/InvalidCardPage.jsx) | Hardware security warning page |
| `'login'` | [LoginPage.jsx](file:///home/onuigbo-precious/infarbloom/src/components/auth/LoginPage.jsx) | User login screen |
| `'signup'` | [SignUpPage.jsx](file:///home/onuigbo-precious/infarbloom/src/components/auth/SignUpPage.jsx) | User registration screen |
| `'forgot-password'` | [ForgotPasswordPage.jsx](file:///home/onuigbo-precious/infarbloom/src/pages/ForgotPasswordPage.jsx) | Password reset link request |
| `'reset-password'` | [ResetPasswordPage.jsx](file:///home/onuigbo-precious/infarbloom/src/pages/ResetPasswordPage.jsx) | Set new password view (`?token=...`) |
| `'dashboard'` | [DashboardPage.jsx](file:///home/onuigbo-precious/infarbloom/src/components/dashboard/DashboardPage.jsx) | User analytics, profile editor & leads table |
| `'customizer'` | [CardBuilderPage.jsx](file:///home/onuigbo-precious/infarbloom/src/components/builder/CardBuilderPage.jsx) | Interactive 3D/2D card preview & engraver |
| `'cards'` | [NfcCardsPage.jsx](file:///home/onuigbo-precious/infarbloom/src/components/products/NfcCardsPage.jsx) | Physical card finish selector & shop |
| `'wristbands'` | [NfcWristbandsPage.jsx](file:///home/onuigbo-precious/infarbloom/src/components/products/NfcWristbandsPage.jsx) | Active wristband catalog |
| `'about'` | [AboutUsPage.jsx](file:///home/onuigbo-precious/infarbloom/src/pages/AboutUsPage.jsx) | Mission, team, and company stats |
| `'press'` | [PressMediaPage.jsx](file:///home/onuigbo-precious/infarbloom/src/pages/PressMediaPage.jsx) | Media kit, press releases, vector logos |
| `'support'` | [ContactSupportPage.jsx](file:///home/onuigbo-precious/infarbloom/src/pages/ContactSupportPage.jsx) | 24/7 support ticket form & contact info |
| `'legal'` | [LegalPage.jsx](file:///home/onuigbo-precious/infarbloom/src/pages/LegalPage.jsx) | Central legal & trust hub |
| `'privacy'` | [PrivacyPolicyPage.jsx](file:///home/onuigbo-precious/infarbloom/src/pages/PrivacyPolicyPage.jsx) | Privacy policy & data protection terms |
| `'terms'` | [TermsOfServicePage.jsx](file:///home/onuigbo-precious/infarbloom/src/pages/TermsOfServicePage.jsx) | Platform & hardware terms of service |
| `'security'` | [SecurityPage.jsx](file:///home/onuigbo-precious/infarbloom/src/pages/SecurityPage.jsx) | NTAG216 chip security & AES-256 encryption |
| `'returns'` | [ReturnsGuaranteePage.jsx](file:///home/onuigbo-precious/infarbloom/src/pages/ReturnsGuaranteePage.jsx) | 30-day money-back guarantee & 1-yr warranty |

---

## 🔌 6. Frontend API Integration Layer

Centralized HTTP client located at [src/api/client.js](file:///home/onuigbo-precious/infarbloom/src/api/client.js):
- **Base URL**: `https://bloombe.onrender.com` (overridable via `VITE_API_URL`).
- **Credentials**: Configured with `credentials: 'include'` to pass HTTP-only session cookies across domain boundaries.
- **Local Dev Proxy**: `vite.config.js` automatically proxies `/api/*` requests to the live backend server.

### Key API Modules
- **Auth**: `loginApi`, `signupApi`, `logoutApi`, `getMeApi`, `forgotPasswordApi`, `resetPasswordApi`.
- **Profiles**: `getPublicProfileApi`, `getCardTapProfileApi`, `updateProfileApi`, `checkHandleApi`, `claimCardApi`, `getVCardUrl`.
- **Leads**: `createLeadApi`, `getLeadsApi`, `deleteLeadApi`.
- **Analytics**: `recordTapApi`, `getAnalyticsApi`.
- **Store & Waitlist**: `createOrderApi`, `joinWaitlistApi`.
- **Admin**: `provisionCardsApi`.

---

© 2026 Bloom Card Technologies Ltd. All rights reserved.
