import "dotenv/config"
import { seedCatalogDefaults } from "../lib/catalog-db"

void (async () => {
  const result = await seedCatalogDefaults()
  console.log(
    `Catalog seed complete: ${result.categories} categories, ${result.items} items inserted.`,
  )
  process.exit(0)
})()
