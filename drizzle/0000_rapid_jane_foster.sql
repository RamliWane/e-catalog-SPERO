-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `catalog_categories` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(150) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`description` text,
	`image_url` varchar(500),
	`is_active` tinyint(1) NOT NULL DEFAULT 1,
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `catalog_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `slug` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `catalog_items` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`category_id` bigint unsigned,
	`name` varchar(200) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`short_description` varchar(500),
	`description` longtext,
	`image_url` varchar(500),
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
	`is_featured` tinyint(1) NOT NULL DEFAULT 0,
	`sort_order` int NOT NULL DEFAULT 0,
	`created_by` bigint unsigned,
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `catalog_items_id` PRIMARY KEY(`id`),
	CONSTRAINT `slug` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `contact_submissions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(150) NOT NULL,
	`email` varchar(191) NOT NULL,
	`company` varchar(200),
	`subject` varchar(255),
	`message` text NOT NULL,
	`status` enum('new','read','replied','archived') NOT NULL DEFAULT 'new',
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contact_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media_assets` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`file_name` varchar(255) NOT NULL,
	`file_url` varchar(1000) NOT NULL,
	`file_type` varchar(100),
	`file_size` bigint unsigned,
	`alt_text` varchar(255),
	`uploaded_by` bigint unsigned,
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `media_assets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page_sections` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`page_id` bigint unsigned NOT NULL,
	`section_key` varchar(150) NOT NULL,
	`title` varchar(200),
	`content` json,
	`is_visible` tinyint(1) NOT NULL DEFAULT 1,
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `page_sections_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_page_section` UNIQUE(`page_id`,`section_key`)
);
--> statement-breakpoint
CREATE TABLE `pages` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(150) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`description` text,
	`status` enum('draft','published') NOT NULL DEFAULT 'published',
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pages_id` PRIMARY KEY(`id`),
	CONSTRAINT `slug` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `service_categories` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(150) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`description` text,
	`icon` varchar(100),
	`is_active` tinyint(1) NOT NULL DEFAULT 1,
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `service_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `slug` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`category_id` bigint unsigned,
	`name` varchar(200) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`short_description` varchar(500),
	`description` longtext,
	`icon` varchar(100),
	`image_url` varchar(500),
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
	`is_featured` tinyint(1) NOT NULL DEFAULT 0,
	`sort_order` int NOT NULL DEFAULT 0,
	`created_by` bigint unsigned,
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `services_id` PRIMARY KEY(`id`),
	CONSTRAINT `slug` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(150) NOT NULL,
	`email` varchar(191) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`role` enum('admin','user') NOT NULL DEFAULT 'user',
	`status` enum('active','inactive','suspended') NOT NULL DEFAULT 'active',
	`avatar_url` varchar(500),
	`last_login_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `catalog_items` ADD CONSTRAINT `fk_catalog_items_category` FOREIGN KEY (`category_id`) REFERENCES `catalog_categories`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `catalog_items` ADD CONSTRAINT `fk_catalog_items_creator` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `media_assets` ADD CONSTRAINT `fk_media_assets_uploader` FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `page_sections` ADD CONSTRAINT `fk_page_sections_page` FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `services` ADD CONSTRAINT `fk_services_category` FOREIGN KEY (`category_id`) REFERENCES `service_categories`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `services` ADD CONSTRAINT `fk_services_creator` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX `idx_catalog_items_status` ON `catalog_items` (`status`);--> statement-breakpoint
CREATE INDEX `idx_catalog_items_category` ON `catalog_items` (`category_id`);--> statement-breakpoint
CREATE INDEX `idx_catalog_items_featured` ON `catalog_items` (`is_featured`);--> statement-breakpoint
CREATE INDEX `idx_contact_submissions_status` ON `contact_submissions` (`status`);--> statement-breakpoint
CREATE INDEX `idx_contact_submissions_created` ON `contact_submissions` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_page_sections_order` ON `page_sections` (`page_id`,`sort_order`);--> statement-breakpoint
CREATE INDEX `idx_services_status` ON `services` (`status`);--> statement-breakpoint
CREATE INDEX `idx_services_category` ON `services` (`category_id`);--> statement-breakpoint
CREATE INDEX `idx_services_featured` ON `services` (`is_featured`);
*/