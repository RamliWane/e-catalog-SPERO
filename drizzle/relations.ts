import { relations } from "drizzle-orm/relations";
import { catalogCategories, catalogItems, users, mediaAssets, pages, pageSections, serviceCategories, services } from "./schema";

export const catalogItemsRelations = relations(catalogItems, ({one}) => ({
	catalogCategory: one(catalogCategories, {
		fields: [catalogItems.categoryId],
		references: [catalogCategories.id]
	}),
	user: one(users, {
		fields: [catalogItems.createdBy],
		references: [users.id]
	}),
}));

export const catalogCategoriesRelations = relations(catalogCategories, ({many}) => ({
	catalogItems: many(catalogItems),
}));

export const usersRelations = relations(users, ({many}) => ({
	catalogItems: many(catalogItems),
	mediaAssets: many(mediaAssets),
	services: many(services),
}));

export const mediaAssetsRelations = relations(mediaAssets, ({one}) => ({
	user: one(users, {
		fields: [mediaAssets.uploadedBy],
		references: [users.id]
	}),
}));

export const pageSectionsRelations = relations(pageSections, ({one}) => ({
	page: one(pages, {
		fields: [pageSections.pageId],
		references: [pages.id]
	}),
}));

export const pagesRelations = relations(pages, ({many}) => ({
	pageSections: many(pageSections),
}));

export const servicesRelations = relations(services, ({one}) => ({
	serviceCategory: one(serviceCategories, {
		fields: [services.categoryId],
		references: [serviceCategories.id]
	}),
	user: one(users, {
		fields: [services.createdBy],
		references: [users.id]
	}),
}));

export const serviceCategoriesRelations = relations(serviceCategories, ({many}) => ({
	services: many(services),
}));