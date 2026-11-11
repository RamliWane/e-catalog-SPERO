"use client"

import {
  BROWSE_FEATURED_IMAGE_OPTIONS,
  type BrowseCategoryContent,
  type BrowseContent,
  type FeaturedSolutionContent,
} from "@/lib/home-browse-data"
import {
  EditorGroup,
  SelectField,
  TextAreaField,
  TextField,
} from "../../ManageUIFormFields"

type BrowseSectionEditorProps = {
  content: BrowseContent
  onChange: (content: BrowseContent) => void
}

function CategoryFields({
  category,
  index,
  onChange,
}: {
  category: BrowseCategoryContent
  index: number
  onChange: (patch: Partial<BrowseCategoryContent>) => void
}) {
  return (
    <div className="rounded-lg border border-[#DDE7F8] bg-white p-3.5">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7A8CA8]">
        Category {index + 1}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          id={`browse-category-${index}-title`}
          label="Category Title"
          value={category.title}
          onChange={(title) => onChange({ title })}
        />
        <TextField
          id={`browse-category-${index}-count`}
          label="Supporting Label"
          value={category.count}
          onChange={(count) => onChange({ count })}
        />
      </div>
      <div className="mt-3">
        <TextAreaField
          id={`browse-category-${index}-description`}
          label="Category Description"
          value={category.description}
          onChange={(description) => onChange({ description })}
          rows={2}
        />
      </div>
    </div>
  )
}

export default function BrowseSectionEditor({
  content,
  onChange,
}: BrowseSectionEditorProps) {
  function updateContent(patch: Partial<BrowseContent>) {
    onChange({ ...content, ...patch })
  }

  function updateCategory(
    index: number,
    patch: Partial<BrowseCategoryContent>,
  ) {
    updateContent({
      categories: content.categories.map((category, itemIndex) =>
        itemIndex === index ? { ...category, ...patch } : category,
      ),
    })
  }

  function updateFeatured(patch: Partial<FeaturedSolutionContent>) {
    updateContent({
      featuredSolution: {
        ...content.featuredSolution,
        ...patch,
      },
    })
  }

  return (
    <div className="space-y-5">
      <EditorGroup title="Section Copy">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            id="browse-eyebrow"
            label="Eyebrow Text"
            value={content.eyebrow}
            onChange={(eyebrow) => updateContent({ eyebrow })}
          />
          <TextField
            id="browse-link-label"
            label="Link Label"
            value={content.linkLabel}
            onChange={(linkLabel) => updateContent({ linkLabel })}
          />
        </div>
        <TextAreaField
          id="browse-heading"
          label="Section Heading"
          value={content.heading}
          onChange={(heading) => updateContent({ heading })}
          rows={2}
        />
        <TextAreaField
          id="browse-description"
          label="Section Description"
          value={content.description}
          onChange={(description) => updateContent({ description })}
        />
      </EditorGroup>

      <EditorGroup
        title="Category Cards"
        description="Only the category copy is editable. The catalog data source stays unchanged."
      >
        <div className="space-y-3">
          {content.categories.map((category, index) => (
            <CategoryFields
              key={category.id}
              category={category}
              index={index}
              onChange={(patch) => updateCategory(index, patch)}
            />
          ))}
        </div>
      </EditorGroup>

      <EditorGroup
        title="Featured Solution"
        description="This card is embedded inside the Browse by Category section."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            id="browse-featured-label"
            label="Eyebrow Label"
            value={content.featuredSolution.label}
            onChange={(label) => updateFeatured({ label })}
          />
          <TextField
            id="browse-featured-button"
            label="Button Label"
            value={content.featuredSolution.buttonLabel}
            onChange={(buttonLabel) => updateFeatured({ buttonLabel })}
          />
        </div>
        <TextAreaField
          id="browse-featured-title"
          label="Solution Title"
          value={content.featuredSolution.title}
          onChange={(title) => updateFeatured({ title })}
          rows={2}
        />
        <TextAreaField
          id="browse-featured-description"
          label="Solution Description"
          value={content.featuredSolution.description}
          onChange={(description) => updateFeatured({ description })}
          rows={2}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            id="browse-featured-image"
            label="Featured Solution Asset"
            value={content.featuredSolution.image}
            options={BROWSE_FEATURED_IMAGE_OPTIONS}
            onChange={(image) => updateFeatured({ image })}
          />
          <TextField
            id="browse-featured-image-alt"
            label="Image Alt Text"
            value={content.featuredSolution.imageAlt}
            onChange={(imageAlt) => updateFeatured({ imageAlt })}
            maxLength={300}
          />
        </div>
      </EditorGroup>
    </div>
  )
}
