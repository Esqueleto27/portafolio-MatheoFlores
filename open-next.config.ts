import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incremental cache override: every page that reads D1 is rendered per
// request (force-dynamic), so there's nothing worth persisting in an R2
// ISR cache for a site with this traffic.
export default defineCloudflareConfig({});
