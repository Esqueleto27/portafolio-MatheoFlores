CREATE TABLE `mensajes_contacto` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`service_id` text NOT NULL,
	`timeline` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'pendiente' NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`service_id`) REFERENCES `servicios`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `mensajes_contacto_status_idx` ON `mensajes_contacto` (`status`);--> statement-breakpoint
CREATE TABLE `proyectos` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`category` text NOT NULL,
	`service_id` text NOT NULL,
	`custom_tag_es` text,
	`custom_tag_en` text,
	`featured` integer DEFAULT false NOT NULL,
	`business_es` text NOT NULL,
	`business_en` text NOT NULL,
	`description_es` text,
	`description_en` text,
	`objective_es` text,
	`objective_en` text,
	`problem_es` text NOT NULL,
	`problem_en` text NOT NULL,
	`solution_es` text NOT NULL,
	`solution_en` text NOT NULL,
	`challenges_es` text,
	`challenges_en` text,
	`results_es` text,
	`results_en` text,
	`features` text DEFAULT '[]' NOT NULL,
	`technologies` text DEFAULT '[]' NOT NULL,
	`live_url` text,
	`github_url` text,
	`show_code` integer DEFAULT true NOT NULL,
	`video_url` text,
	`image_url` text,
	`mobile_image_url` text,
	`before_image_url` text,
	`before_mobile_image_url` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`service_id`) REFERENCES `servicios`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `proyectos_slug_unique` ON `proyectos` (`slug`);--> statement-breakpoint
CREATE INDEX `proyectos_service_id_idx` ON `proyectos` (`service_id`);--> statement-breakpoint
CREATE INDEX `proyectos_category_idx` ON `proyectos` (`category`);--> statement-breakpoint
CREATE INDEX `proyectos_featured_idx` ON `proyectos` (`featured`);--> statement-breakpoint
CREATE TABLE `servicios` (
	`id` text PRIMARY KEY NOT NULL,
	`name_es` text NOT NULL,
	`name_en` text NOT NULL,
	`description_es` text NOT NULL,
	`description_en` text NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
