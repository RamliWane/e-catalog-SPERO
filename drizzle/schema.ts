import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, bigint, varchar, text, int, timestamp, index, foreignKey, longtext, mysqlEnum, json, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const catalogCategories = mysqlTable("catalog_categories", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 150 }).notNull(),
	slug: varchar({ length: 191 }).notNull(),
	description: text(),
	imageUrl: varchar("image_url", { length: 500 }),
	isActive: tinyint("is_active").default(1).notNull(),
	sortOrder: int("sort_order").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "catalog_categories_id"}),
	unique("slug").on(table.slug),
]);

export const catalogItems = mysqlTable("catalog_items", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	categoryId: bigint("category_id", { mode: "number", unsigned: true }).references(() => catalogCategories.id, { onDelete: "set null", onUpdate: "cascade" } ),
	name: varchar({ length: 200 }).notNull(),
	slug: varchar({ length: 191 }).notNull(),
	shortDescription: varchar("short_description", { length: 500 }),
	description: longtext(),
	imageUrl: varchar("image_url", { length: 500 }),
	status: mysqlEnum(['draft','published','archived']).default('draft').notNull(),
	isFeatured: tinyint("is_featured").default(0).notNull(),
	sortOrder: int("sort_order").default(0).notNull(),
	createdBy: bigint("created_by", { mode: "number", unsigned: true }).references(() => users.id, { onDelete: "set null", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("idx_catalog_items_status").on(table.status),
	index("idx_catalog_items_category").on(table.categoryId),
	index("idx_catalog_items_featured").on(table.isFeatured),
	primaryKey({ columns: [table.id], name: "catalog_items_id"}),
	unique("slug").on(table.slug),
]);

export const contactSubmissions = mysqlTable("contact_submissions", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 150 }).notNull(),
	email: varchar({ length: 191 }).notNull(),
	company: varchar({ length: 200 }),
	subject: varchar({ length: 255 }),
	message: text().notNull(),
	status: mysqlEnum(['new','read','replied','archived']).default('new').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("idx_contact_submissions_status").on(table.status),
	index("idx_contact_submissions_created").on(table.createdAt),
	primaryKey({ columns: [table.id], name: "contact_submissions_id"}),
]);

export const mediaAssets = mysqlTable("media_assets", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	fileName: varchar("file_name", { length: 255 }).notNull(),
	fileUrl: varchar("file_url", { length: 1000 }).notNull(),
	fileType: varchar("file_type", { length: 100 }),
	fileSize: bigint("file_size", { mode: "number", unsigned: true }),
	altText: varchar("alt_text", { length: 255 }),
	uploadedBy: bigint("uploaded_by", { mode: "number", unsigned: true }).references(() => users.id, { onDelete: "set null", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "media_assets_id"}),
]);

export const pageSections = mysqlTable("page_sections", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	pageId: bigint("page_id", { mode: "number", unsigned: true }).notNull().references(() => pages.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	sectionKey: varchar("section_key", { length: 150 }).notNull(),
	title: varchar({ length: 200 }),
	content: json(),
	isVisible: tinyint("is_visible").default(1).notNull(),
	sortOrder: int("sort_order").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("idx_page_sections_order").on(table.pageId, table.sortOrder),
	primaryKey({ columns: [table.id], name: "page_sections_id"}),
	unique("uq_page_section").on(table.pageId, table.sectionKey),
]);

export const pages = mysqlTable("pages", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 150 }).notNull(),
	slug: varchar({ length: 191 }).notNull(),
	description: text(),
	status: mysqlEnum(['draft','published']).default('published').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "pages_id"}),
	unique("slug").on(table.slug),
]);

export const serviceCategories = mysqlTable("service_categories", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 150 }).notNull(),
	slug: varchar({ length: 191 }).notNull(),
	description: text(),
	icon: varchar({ length: 100 }),
	isActive: tinyint("is_active").default(1).notNull(),
	sortOrder: int("sort_order").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "service_categories_id"}),
	unique("slug").on(table.slug),
]);

export const services = mysqlTable("services", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	categoryId: bigint("category_id", { mode: "number", unsigned: true }).references(() => serviceCategories.id, { onDelete: "set null", onUpdate: "cascade" } ),
	name: varchar({ length: 200 }).notNull(),
	slug: varchar({ length: 191 }).notNull(),
	shortDescription: varchar("short_description", { length: 500 }),
	description: longtext(),
	icon: varchar({ length: 100 }),
	imageUrl: varchar("image_url", { length: 500 }),
	status: mysqlEnum(['draft','published','archived']).default('draft').notNull(),
	isFeatured: tinyint("is_featured").default(0).notNull(),
	sortOrder: int("sort_order").default(0).notNull(),
	createdBy: bigint("created_by", { mode: "number", unsigned: true }).references(() => users.id, { onDelete: "set null", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("idx_services_status").on(table.status),
	index("idx_services_category").on(table.categoryId),
	index("idx_services_featured").on(table.isFeatured),
	primaryKey({ columns: [table.id], name: "services_id"}),
	unique("slug").on(table.slug),
]);

export const users = mysqlTable("users", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 150 }).notNull(),
	email: varchar({ length: 191 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	role: mysqlEnum(['admin','user']).default('user').notNull(),
	status: mysqlEnum(['active','inactive','suspended']).default('active').notNull(),
	avatarUrl: varchar("avatar_url", { length: 500 }),
	lastLoginAt: timestamp("last_login_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "users_id"}),
	unique("email").on(table.email),
]);
