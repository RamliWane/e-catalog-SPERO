import "dotenv/config"
import { validateCatalogInput } from "../lib/catalog-admin"
import {
  createCatalogItemRecord,
  deleteCatalogItemRecord,
  updateCatalogItemRecord,
} from "../lib/catalog-db"

void (async () => {
  const payload = validateCatalogInput({
    name: "Smoke Test Catalog",
    categoryId: 1,
    shortDescription: "Temporary smoke test item.",
    description: "Temporary item used to verify catalog CRUD.",
    imageUrl: "/dummy-image-catalog.jpeg",
    status: "published",
    isFeatured: true,
    sortOrder: 999,
  })

  if (!payload.ok) {
    throw new Error(payload.message)
  }

  const created = await createCatalogItemRecord(payload.data)
  const updated = await updateCatalogItemRecord({
    ...payload.data,
    id: created.id,
    name: "Smoke Test Catalog Updated",
    status: "draft",
    isFeatured: false,
  })

  await deleteCatalogItemRecord(created.id)

  console.log(
    JSON.stringify({
      created: {
        id: created.id,
        slug: created.slug,
        status: created.status,
        isFeatured: created.isFeatured,
      },
      updated: {
        id: updated.id,
        name: updated.name,
        status: updated.status,
        isFeatured: updated.isFeatured,
      },
    }),
  )
})()
