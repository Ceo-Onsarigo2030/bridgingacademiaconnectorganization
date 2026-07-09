# B.A Connect Organization — Website

Full stack website for B.A Connect Organization: public site, admin panel, cookie
consent, newsletter, feedback wall, push notifications, and the Bridge AI
support widget. Built with React, TypeScript, Tailwind CSS, and Supabase, ready
to deploy on Vercel.

## 1. Local setup

```bash
npm install
cp .env.example .env
```

Fill in `.env` with your Supabase project's URL and anon key (see step 2), then:

```bash
npm run dev
```

## 2. Create your Supabase project

1. Go to supabase.com and create a **new** project (separate from your existing one).
2. In **Project Settings > API**, copy the Project URL and anon public key into `.env`.
3. Open the **SQL Editor**, paste the contents of `supabase/migrations/schema.sql`,
   and run it. This creates every table, security policy, and storage bucket
   the site needs (site content, newsletter, feedback, department projects,
   push subscriptions, notifications, and the photos/videos/articles buckets).
4. Go to **Authentication > Users** and click **Add user** to create an account
   for each admin (email + password). They will sign in at `yoursite.com/admin`.
   Since your team shares one permission level, every account you add here has
   full admin access, no extra setup needed.

## 3. Bridge AI (the floating support widget)

Bridge AI now runs on B.A Connect's own training manuals — the Constitution, the Personality guide, and 13 topic manuals (GBV, mental health, trauma, child protection, domestic violence, sexual harassment, youth empowerment, civic education, and more). These were split into 227 searchable sections and are stored permanently in the `bridge_ai_knowledge` table. Every time someone messages Bridge AI, the edge function searches that table for the most relevant sections and hands them to Claude as grounded reference material, alongside a condensed, always-on version of the Constitution's identity, values, and tone rules.

**One-time setup:**

```bash
npm install -g supabase
supabase login
supabase link --project-ref your-project-ref
supabase secrets set ANTHROPIC_API_KEY=sk-ant-your-key-here
supabase functions deploy bridge-ai --no-verify-jwt
```

That's the only secret you need to set — `SUPABASE_URL` and `SUPABASE_ANON_KEY` are provided automatically inside every edge function.

**Loading the knowledge base:** after running `schema.sql` (which creates the `bridge_ai_knowledge` table), also run `supabase/migrations/knowledge_seed.sql` in the SQL Editor — this is the one that actually loads all 227 sections from your manuals. It's a separate file because it's large; run `schema.sql` first, then this one.

**Updating what Bridge AI knows later:** you don't need to redeploy anything to update its knowledge — just edit or add rows in the `bridge_ai_knowledge` table (via SQL Editor or Table Editor in Supabase), and the next message Bridge AI answers will pull from the updated content immediately. To change its personality or core behavior rules, edit the `CORE_IDENTITY` text inside `supabase/functions/bridge-ai/index.ts` and redeploy with the same command above.

## 4. Push notifications

1. Generate a VAPID key pair:
   ```bash
   npx web-push generate-vapid-keys
   ```
2. Add the public key to `.env` as `VITE_VAPID_PUBLIC_KEY`.
3. Set the private key and subject as Supabase secrets:
   ```bash
   supabase secrets set VAPID_PUBLIC_KEY=your-public-key
   supabase secrets set VAPID_PRIVATE_KEY=your-private-key
   supabase secrets set VAPID_SUBJECT=mailto:b.aconnect254@gmail.com
   supabase functions deploy send-push --no-verify-jwt
   ```
4. Visitors opt in from the button in the footer ("Get notified of news &
   events"). Admins send a push from the **Push Notifications** tab in
   `/admin/dashboard`, tagged as an Article, Event, Drive, Newsletter, Post, or
   Announcement.

## 5. Deploying

- **GitHub**: push this project to your repository as usual.
- **Vercel**: import the repo, add the same environment variables from `.env`
  in Vercel's Project Settings, and deploy. `vercel.json` is already set up so
  routes like `/admin` work correctly on refresh.
- **Supabase**: your database and edge functions live in Supabase directly, no
  separate deployment step beyond what's in steps 2 to 4.

## 6. Using the admin panel

Visit `/admin`, sign in, and you'll find six tabs:

- **Site Content** — edit the moving welcome message, the Take Action drive
  details, and the stats bar numbers. More fields can be added by dropping a
  new entry into the `FIELDS` array in `src/components/admin/ContentEditor.tsx`
  and reading it in the matching component with the `useSiteContent` hook.
- **Media Library** — upload photos, short videos, and articles to Supabase
  Storage. Copy a file's URL to paste into a project card or elsewhere.
- **Projects & Events** — add the dated project cards that appear inside the
  Gender Empowerment and Mental Health departments, with photos, a date, a
  title, description, and an optional social video link.
- **Feedback Wall** — approve or delete visitor feedback before it appears
  publicly.
- **Newsletter** — see and export subscriber emails as a CSV.
- **Push Notifications** — send a push to everyone who has opted in.

## 7. What's already wired with your content

- Logo, hero photo, and the four achievement photos are in `public/` and
  `public/media/`, pulled straight from what you shared.
- About, Mission, Philosophy, the Six Pillars, all four Departments, the
  Inter-Universities Nexus Platform section, and the 2026 GVEA award story are
  written in full using your text, each behind a "Read more" so the page stays
  fast to scroll on mobile.
- Social links, email, and the closing line are in the footer.

## 8. Still to do before launch

- Swap in your own trained admin passwords once accounts are created.
- Add the actual event photos and dates for the Gender Empowerment and Mental
  Health project cards, through the admin panel, whenever you're ready.
- Test the Bridge AI and push notification flows end to end once secrets are
  set, since both depend on the Edge Functions being deployed.
