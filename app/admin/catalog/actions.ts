"use server"

import { updateTag } from "next/cache"
import {
  validateCatalogInput,
  type CatalogAdminItem,
} from "@/lib/catalog-admin"
import {
  CATALOG_CACHE_TAG,
  createCatalogItemRecord,
  deleteCatalogItemRecord,
  updateCatalogItemRecord,
} from "@/lib/catalog-db"

export type CatalogMutationResult =
  | { ok: true; item: CatalogAdminItem }
  | { ok: false; message: string }

export type DeleteCatalogItemResult =
  | { ok: true; id: number }
  | { ok: false; message: string }

export async function createCatalogItem(
  input: unknown,
): Promise<CatalogMutationResult> {
  const result = validateCatalogInput(input)

  if (!result.ok) {
    return { ok: false, message: result.message }
  }

  try {
    const item = await createCatalogItemRecord(result.data)
    updateTag(CATALOG_CACHE_TAG)
    return { ok: true, item }
  } catch {
    return {
      ok: false,
      message: "The catalog item could not be created. Please try again.",
    }
  }
}

export async function updateCatalogItem(
  input: unknown,
): Promise<CatalogMutationResult> {
  const result = validateCatalogInput(input)

  if (!result.ok) {
    return { ok: false, message: result.message }
  }

  const id = result.data.id

  if (!id) {
    return { ok: false, message: "A catalog item must be selected." }
  }

  try {
    const item = await updateCatalogItemRecord({ ...result.data, id })
    updateTag(CATALOG_CACHE_TAG)
    return { ok: true, item }
  } catch {
    return {
      ok: false,
      message: "The catalog item could not be updated. Please try again.",
    }
  }
}

export async function deleteCatalogItem(
  input: unknown,
): Promise<DeleteCatalogItemResult> {
  const id =
    typeof input === "number"
      ? input
      : typeof input === "object" && input !== null
        ? Number((input as { id?: unknown }).id)
        : NaN

  if (!Number.isInteger(id) || id <= 0) {
    return { ok: false, message: "A valid catalog item is required." }
  }

  try {
    await deleteCatalogItemRecord(id)
    updateTag(CATALOG_CACHE_TAG)
    return { ok: true, id }
  } catch {
    return {
      ok: false,
      message: "The catalog item could not be deleted. Please try again.",
    }
  }
}
