-- Let signed-in users read their own usage days.
--
-- Recording a day goes through the API as
--   INSERT ... ON CONFLICT (user_id, day) DO NOTHING
-- and Postgres only allows a conflict check on columns the caller can read.
-- Seeing your own active days reveals nothing new, so this is safe.

create policy "Users can read their own usage days"
  on public.usage_days for select
  to authenticated
  using (user_id = (select auth.uid()));

grant select on public.usage_days to authenticated;
