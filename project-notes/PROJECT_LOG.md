# Project log

Keep this up to date as you go — a few lines per work session is enough. It's much harder to reconstruct at the end.

Team name: Individual Project
Startup name: CampusSkillSwap
Live site link: https://legendary-space-halibut-wv4rj7v64rg725xqg-5500.app.github.dev/

---

## Work sessions

Copy this block for each session.

### Session — November 21, 2026 — driver: Individual

**Goal for this session:**
- Set up the CampusSkillSwap prototype using the professor's GitHub template.
- Customize the website branding, sample skill listings, and design.

**Key prompts we gave Copilot:**
1. Customize the existing template for CampusSkillSwap.
2. Update the sample listings and website styling to match the skill-exchange idea.

**What worked:**
- Created the CampusSkillSwap website structure.
- Updated the branding, sample listings, and responsive design.

**What broke, and how we fixed it:**
- The original template needed to be customized to match the startup idea. Copilot helped update the existing files while keeping the original structure.

**Committed?** Yes — CampusSkillSwap foundation: branding, data, styling.

---

## Things that broke (running list)

| Date | What went wrong | What we tried | What finally fixed it |
| November 23, 2026 | The website preview was not opening. | Tried opening the page directly. | Started the Python server and opened port 5500 in Codespaces. |
| | | | |

## What a real version would need

Everything we wanted but faked or left out — real logins, a real database, payments, security, moderation, an app, staff, etc. For each one, say **why** it's needed and roughly **how hard or expensive** you think it would be.

| Feature we faked or skipped | Why a real company would need it | How hard / expensive? |
| Student accounts and verification | To confirm that users are StFX students and help prevent fake accounts. | Medium — requires secure account registration and student verification. |
| Real database and cloud hosting | To store student profiles, skill listings, bookings, and credit balances safely online. | Medium to high — requires database setup and hosting costs. |
| Notifications and scheduling | To remind students about booked sessions and prevent missed appointments. | Medium — requires notification services and scheduling features. |
| Reporting and moderation | To allow students to report inappropriate behaviour, fake listings, or unsafe interactions. | Medium to high — requires moderation tools and people to review reports. |
| Privacy and security | To protect student information and prevent unauthorized access to accounts. | High — requires secure systems, regular updates, and ongoing monitoring. |
## Reflection (fill in at the end)

1. What surprised you most about building software with AI?
What surprised me most was how much decision-making was involved in building the website. I thought I would spend most of my time writing code, but I spent more time deciding how the platform should work and what would be fair to students. Copilot helped with the coding, but I still had to make the important decisions.

2. Which parts were easy, and which were hard? Why do you think that is?
The easiest part was making the website look good because Copilot helped with the colours, layout, and design.

The hardest part was making the website work properly and remember changes after refreshing. I had to think about things like what happens when someone books a session twice or has no credits left. I learned that AI can help write the code, but I still need to think about how the features should work.

3. If a competitor had the same AI tool, how long would it take them to copy your site?
I think someone could copy my website in a few hours using the same AI tool. However, getting students to use their website would be more difficult. CampusSkillSwap is made for StFX students, and it takes time to build trust and get people involved. Students are more likely to join when they see other students already using the platform. So, copying the website may be easy, but building a good student community would take more time.
