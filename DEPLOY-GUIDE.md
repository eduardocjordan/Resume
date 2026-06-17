# Deploying the chatbot — step by step, browser only

No terminal, no command line, anywhere in this guide. Everything happens by clicking around on websites: GitHub, Vercel, Supabase, Resend, Anthropic's console. Each one is a normal website with a normal login.

This covers getting the chatbot running and verified on a free `*.vercel.app` preview link first. The very last section covers flipping your real domain (`eduardo.casjor.com`) over once you've confirmed everything works.

## What you'll need accounts for

- **Vercel** (hosts the site) — sign up free at vercel.com, "Continue with GitHub" so it connects to your existing repo automatically.
- **Supabase** (the database — stores chat transcripts and summaries) — free tier at supabase.com.
- **Resend** (sends you the summary emails) — free tier at resend.com.
- **Anthropic** (the AI model that powers the replies) — console.anthropic.com, this one is pay-as-you-go, no free tier, but costs for a personal site are expected to be a few dollars a month at most.

## 1. Connect your repo to Vercel

1. Go to vercel.com, click **Sign Up**, choose **Continue with GitHub**, and authorize it.
2. Click **Add New… → Project**.
3. Find `eduardocjordan/resume` in the list and click **Import**.
4. Vercel will detect it's a Next.js project automatically. Leave all the build settings as-is.
5. Before clicking Deploy, open **Environment Variables** (see step 2) — you can also add these after the first deploy and redeploy, so don't worry if you deploy first.

## 2. Set the environment variables

In your Vercel project: **Settings → Environment Variables**. Add each one below, and for each, tick **all three** environment boxes (Production, Preview, Development) unless noted otherwise.

| Variable | What it is | Where to get it |
|---|---|---|
| `ANTHROPIC_API_KEY` | Lets the site talk to Claude (the AI model) | console.anthropic.com → API Keys → Create Key |
| `SUPABASE_URL` | Address of your database | supabase.com → your project → Settings → API → "Project URL" |
| `SUPABASE_SERVICE_ROLE_KEY` | A password-like key the server uses to read/write the database. **Never share this one or put it anywhere public** | Same Supabase page → "service_role" key (click reveal) |
| `RESEND_API_KEY` | Lets the site send you emails | resend.com → API Keys → Create API Key |
| `RESEND_FROM_EMAIL` | The "from" address on summary emails | An address on a domain you've verified in Resend's dashboard (Resend walks you through verifying a domain you own) |
| `OWNER_NOTIFICATION_EMAIL` | Where summary emails get sent | Your own inbox — e.g. eduardo@casjor.com |
| `CRON_SECRET` | A password you make up yourself (any long random string) so the daily cleanup job can prove it's really Vercel calling, not a stranger | Make one up — e.g. mash the keyboard for 30 characters |
| `TARGET_COMP_MIN`, `TARGET_COMP_MAX` | Your real target compensation range, used only so the bot can tell whether a visitor's number is in the right ballpark — it will never repeat this number back to anyone | You supply the actual figures. Leave blank for now if you're not ready — the bot will just avoid judging any number a visitor gives, which is the safe default |
| `TARGET_COMP_CURRENCY` | e.g. `USD` | — |
| `CHAT_MESSAGE_CAP` | Optional. Defaults to 20 if you skip it | — |
| `CHAT_DAILY_SPEND_CEILING_USD` | Optional. Defaults to $2/day if you skip it | — |

## 3. Set up the database tables

1. In Supabase, open your project, then **SQL Editor** in the left sidebar.
2. Click **New query**.
3. Open the file `supabase/schema.sql` from the GitHub repo (github.com → your repo → `supabase` folder → `schema.sql` → click it, then click the "Raw" or copy icon to get the plain text), copy its contents, and paste into the Supabase SQL editor.
4. Click **Run**. You should see "Success" — this creates the tables the chatbot needs. You only do this once.

## 4. Find and test your preview link

Vercel automatically gives every branch its own preview website. The chatbot work lives on a branch called `claude/awesome-cori-i7akex`.

1. In Vercel, open your project, click the **Deployments** tab.
2. Find the deployment for that branch (it'll be near the top if it's recent) and click it.
3. Click the preview URL (looks like `resume-git-claude-xxxxx.vercel.app`).
4. The site should look exactly like your live site. Look for a round chat icon in the bottom-right corner.
5. Click it, type a question like "What did Eduardo do at PepsiCo?", and send it.
   - If it replies with real information: it's working.
   - If it replies with an apology about something going wrong: double-check the environment variables from step 2 are saved, then redeploy (Vercel → Deployments → "..." menu on the latest one → Redeploy).

## 5. About the daily cleanup job

There's a `vercel.json` file in the repo that tells Vercel to run a daily cleanup job (it summarizes any chat conversations from the past day and emails you, then archives them). Vercel reads this automatically the moment you deploy — there's nothing else to click. You can see it listed (read-only) under **Settings → Cron Jobs** once deployed, just to confirm it's there.

Free Vercel accounts only allow a cron job to run once a day (not something we chose — it's a platform limit). Because of that, the chatbot also does an opportunistic check every time someone actually chats with it, to catch idle conversations sooner than once a day. The once-daily job is the guaranteed backstop for when nobody's chatted in a while.

## 6. Going live on eduardo.casjor.com

Only do this once you've verified step 4 works well on the preview link.

1. On GitHub, open your repo, switch to the `claude/awesome-cori-i7akex` branch, and click **Compare & pull request** (or **Pull requests → New pull request** if that button isn't visible). Merge it into `main`. This is all clickable in the browser.
2. Vercel automatically redeploys `main` as your **Production** deployment — same `*.vercel.app` link as before, just now backed by the merged code.
3. In Vercel: **Settings → Domains → Add**, type `eduardo.casjor.com`, and follow the on-screen instructions. Vercel will show you a record to add (usually an A record or CNAME) at whichever site you bought/manage the domain through. I don't have visibility into where that is for you (Namecheap, GoDaddy, Google Domains, etc.) — you'll need to log into that site separately and paste in what Vercel shows you.
4. DNS changes can take anywhere from a few minutes to a few hours to take effect. Vercel's Domains page will show a green checkmark once it's recognized the change.
5. The site previously used GitHub Pages with a `CNAME` file pointing at a slightly different domain (`edu.casjor.com` — likely a typo from before). That file and the GitHub Pages publishing workflow have both been removed as part of this move, since Vercel manages your domain through its own dashboard instead of a file in the repo.

## 7. Making future edits

You don't need this guide again for small changes:

1. On GitHub, navigate to the file you want to change, click the pencil (edit) icon.
2. Make your edit, scroll down, and click **Commit changes**.
3. That's it — Vercel sees the new commit and automatically rebuilds and redeploys within a minute or two. If you edited a branch other than `main`, it updates that branch's preview link; if you edited `main` directly, it updates the live site.
