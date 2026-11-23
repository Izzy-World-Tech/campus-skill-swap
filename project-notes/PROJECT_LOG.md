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


### Session — November 21, 2026 — driver: Individual

**Goal for this session:**
- Add a Skill Credits balance that stays saved when the page is refreshed.

**Key prompts we gave Copilot:**
1. Add a Skill Credits balance to the website.
2. Make the credit balance save using the browser's local storage.

**What worked:**
- The website displayed the student's credit balance.
- The balance remained saved after refreshing the page.

**What broke, and how we fixed it:**
- The credit balance needed to remain available after refreshing. Copilot used local storage to save it in the browser.

**Committed?** Yes — Add persistent Skill Credits balance.

### Session — November 22, 2026 — driver: Individual

**Goal for this session:**
- Allow students to book a skill session using their Skill Credits.

**Key prompts we gave Copilot:**
1. Add a Book Session button to the skill listings.
2. Deduct one credit when a student books a session.
3. Prevent students from booking the same session more than once.

**What worked:**
- Students could book a skill session.
- One credit was deducted after booking.
- The booking remained saved after refreshing the page.

**What broke, and how we fixed it:**
- The booking feature needed to prevent duplicate bookings and update the credit balance correctly. Copilot added checks to handle these situations.

**Committed?** Yes — Add skill booking and credit deduction.

### Session — November 22, 2026 — driver: Individual

**Goal for this session:**
- Allow students to post skills they can teach and earn credits after completing a session.

**Key prompts we gave Copilot:**
1. Add a Post a Skill page with a form for students.
2. Display posted skills under My Teaching.
3. Add a button to mark a teaching session as complete and award one credit.

**What worked:**
- Students could post their own skills.
- Posted skills appeared under My Teaching.
- Completing a teaching session added one credit to the balance.

**What broke, and how we fixed it:**
- The system needed to prevent students from earning credits more than once for the same session. Copilot added a check to prevent duplicate credit awards.

**Committed?** Yes — Add skill posting and teaching completion.
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
What surprised me most about using AI to build software was that it was not just about writing code. I expected Copilot to help me write code, but I did not expect to spend so much time thinking about how the website should work.

One example was the Skill Credits system. At first, I thought it would be easy. Students teach a skill and earn one credit, then use that credit to learn something from another student. But when I asked Copilot to add the system, it did not get all the rules right.

For example, it was giving students credits for posting a skill. I realized this could be a problem because someone could post many skills and earn credits without teaching anyone. I had to explain the rules more clearly: posting a skill gives no credit, completing a teaching session gives one credit, and booking a session costs one credit. I also had to make sure students could not earn credits twice for the same session.

This experience taught me that AI can help with coding, but it cannot make every important decision for me. I still need to understand what I want to build and explain how it should work.

2. Which parts were easy, and which were hard? Why do you think that is?
The easiest part of building the website was the design. When I asked Copilot to change the colours, improve the skill cards, or add a badge to the header, it made the changes quickly. If I did not like how something looked, I could easily ask it to change it. I found this part easier because I could see the results immediately.

The hardest part was making sure the features worked properly. For example, booking a session sounds simple because a student only needs to click a button and use one credit. But I had to think about other situations. What happens if the student has no credits? What happens if they refresh the page? Can they book the same session twice? I had to make sure the website handled all these situations correctly.

Testing was also difficult because a feature could look like it was working even when something was wrong. For example, the booking button could work, but I still needed to refresh the page to check if the booking and credit balance were saved.

I learned that building a website is not only about making it look good. It is also important to test everything and make sure the features work as expected. Copilot helped me write the code, but I still had to check the results and find problems.

3. If a competitor had the same AI tool, how long would it take them to copy your site?
I think someone with the same AI tool could copy the basic design and features of my website in a few hours. AI makes it easier to build websites, so copying the pages and buttons would not take very long.

However, I think it would take much longer to build a real community of students using the platform. CampusSkillSwap is meant for StFX students, and students need to trust the platform before they start using it. They also need other students to teach and learn from.

For example, a student may not want to join if there are only two or three skills available. But if many students are already using the platform, more students may become interested. This means that copying the website is easier than building a strong community around it.