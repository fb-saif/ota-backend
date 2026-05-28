import { createHotUpdater } from "@hot-updater/server";
import { supabaseDatabase, supabaseStorage } from "@hot-updater/supabase";

export const hotUpdater = createHotUpdater({
  // Use Supabase's native database adapter instead of drizzle
  database: supabaseDatabase({
    supabaseUrl: process.env.SUPABASE_URL!,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  storages: [
    supabaseStorage({
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      bucketName: process.env.SUPABASE_BUCKET_NAME!,
    }),
  ],
  basePath: "/hot-updater",
  // Enable both updateCheck and bundles routes for CLI and app
  routes: {
    updateCheck: true,
    bundles: true,
  },
});
