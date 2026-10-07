<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep campaign-specific speaker additions and Suelen's four-topic editorial block gated by `page === "/"` so `/nrnb2026-nova` and backups remain unchanged.
- Keep campaign-only speaker additions, Suelen topics, and editorial schedule gated by the page prop so backup routes preserve their original content.
- Render the official cast Hero only for the main-page campaign, keeping the legacy Hero on other pages; preserve its intrinsic ratio on desktop and crop only empty space and lower bodies on mobile so all faces remain visible.
