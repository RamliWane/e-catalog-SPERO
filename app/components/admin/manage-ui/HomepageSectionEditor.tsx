"use client"

import Image from "next/image"
import { CircleAlert, Loader2, RotateCcw, Save } from "lucide-react"
import {
  ABOUT_IMAGE_OPTIONS,
  CLIENT_LOGO_OPTIONS,
  HOMEPAGE_SECTION_META,
  PROJECT_IMAGE_OPTIONS,
  type AboutContent,
  type ClientsContent,
  type CtaContent,
  type HomepageContentMap,
  type HomepageEditorState,
  type HomepageSectionId,
  type SelectedWorkContent,
} from "./manage-ui-data"
import {
  ContextNote,
  EditorGroup,
  SelectField,
  TextAreaField,
  TextField,
} from "./ManageUIFormFields"
import BrowseSectionEditor from "./homepage/browse/BrowseSectionEditor"
import HeroSectionEditor from "./homepage/hero/HeroSectionEditor"

type HomepageSectionEditorProps = {
  sectionId: HomepageSectionId
  state: HomepageEditorState
  isSectionDirty: boolean
  isSaving: boolean
  onStateChange: (state: HomepageEditorState) => void
  onDiscardSection: () => void
  onSave: () => void
}

function updateItem<Item extends object>(
  items: Item[],
  index: number,
  patch: Partial<Item>,
): Item[] {
  return items.map((item, itemIndex) =>
    itemIndex === index ? { ...item, ...patch } : item,
  )
}

export default function HomepageSectionEditor({
  sectionId,
  state,
  isSectionDirty,
  isSaving,
  onStateChange,
  onDiscardSection,
  onSave,
}: HomepageSectionEditorProps) {
  const meta = HOMEPAGE_SECTION_META.find((section) => section.id === sectionId)
  const visibility = state.visibility[sectionId]
  const isPersisted = sectionId === "hero" || sectionId === "browse"
  const sectionName = sectionId === "browse" ? "Browse by Category" : "Hero"

  function updateContent<Key extends keyof HomepageContentMap>(
    key: Key,
    patch: Partial<HomepageContentMap[Key]>,
  ) {
    const nextSectionContent = {
      ...state.content[key],
      ...patch,
    } as HomepageContentMap[Key]

    onStateChange({
      ...state,
      content: {
        ...state.content,
        [key]: nextSectionContent,
      },
    })
  }

  function updateSelectedWork(patch: Partial<SelectedWorkContent>) {
    updateContent("selected-work", patch)
  }

  function updateAbout(patch: Partial<AboutContent>) {
    updateContent("about", patch)
  }

  function updateClients(logos: ClientsContent["logos"]) {
    updateContent("clients", { logos })
  }

  function updateCta(patch: Partial<CtaContent>) {
    updateContent("cta", patch)
  }

  function renderHeroEditor() {
    return (
      <HeroSectionEditor
        content={state.content.hero}
        onChange={(hero) => updateContent("hero", hero)}
      />
    )
  }

  function renderSelectedWorkEditor() {
    const content = state.content["selected-work"]

    return (
      <div className="space-y-5">
        <EditorGroup title="Section Copy">
          <TextField
            id="selected-work-eyebrow"
            label="Eyebrow Text"
            value={content.eyebrow}
            onChange={(value) => updateSelectedWork({ eyebrow: value })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id="selected-work-heading-1"
              label="Heading Line 1"
              value={content.headingLine1}
              onChange={(value) =>
                updateSelectedWork({ headingLine1: value })
              }
            />
            <TextField
              id="selected-work-heading-2"
              label="Heading Line 2"
              value={content.headingLine2}
              onChange={(value) =>
                updateSelectedWork({ headingLine2: value })
              }
            />
          </div>
          <TextAreaField
            id="selected-work-description"
            label="Section Description"
            value={content.description}
            onChange={(value) =>
              updateSelectedWork({ description: value })
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id="selected-work-button-label"
              label="Button Label"
              value={content.buttonLabel}
              onChange={(value) =>
                updateSelectedWork({ buttonLabel: value })
              }
            />
            <TextField
              id="selected-work-button-href"
              label="Button Destination"
              value={content.buttonHref}
              onChange={(value) =>
                updateSelectedWork({ buttonHref: value })
              }
            />
          </div>
        </EditorGroup>

        <EditorGroup
          title="Featured Project"
          description="The large project card in the Selected Work section."
        >
          <TextField
            id="selected-work-featured-badge"
            label="Badge Label"
            value={content.featuredBadge}
            onChange={(value) =>
              updateSelectedWork({ featuredBadge: value })
            }
          />
          <TextField
            id="selected-work-featured-title"
            label="Project Title"
            value={content.featuredTitle}
            onChange={(value) =>
              updateSelectedWork({ featuredTitle: value })
            }
          />
          <TextAreaField
            id="selected-work-featured-description"
            label="Project Description"
            value={content.featuredDescription}
            onChange={(value) =>
              updateSelectedWork({ featuredDescription: value })
            }
            rows={2}
          />
          <SelectField
            id="selected-work-featured-image"
            label="Project Image"
            value={content.featuredImage}
            options={PROJECT_IMAGE_OPTIONS}
            onChange={(value) =>
              updateSelectedWork({ featuredImage: value })
            }
          />
        </EditorGroup>

        <EditorGroup
          title="Supporting Projects"
          description="The two smaller project cards beside the featured project."
        >
          <div className="space-y-3">
            {content.secondaryProjects.map((project, index) => (
              <div
                key={project.id}
                className="rounded-lg border border-[#DDE7F8] bg-white p-3.5"
              >
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7A8CA8]">
                  Supporting Project {index + 1}
                </p>
                <TextField
                  id={`selected-work-secondary-${index}-title`}
                  label="Project Title"
                  value={project.title}
                  onChange={(value) =>
                    updateSelectedWork({
                      secondaryProjects: updateItem(
                        content.secondaryProjects,
                        index,
                        { title: value },
                      ),
                    })
                  }
                />
                <div className="mt-3">
                  <TextAreaField
                    id={`selected-work-secondary-${index}-description`}
                    label="Project Description"
                    value={project.description}
                    onChange={(value) =>
                      updateSelectedWork({
                        secondaryProjects: updateItem(
                          content.secondaryProjects,
                          index,
                          { description: value },
                        ),
                      })
                    }
                    rows={2}
                  />
                </div>
                <div className="mt-3">
                  <SelectField
                    id={`selected-work-secondary-${index}-image`}
                    label="Project Image"
                    value={project.image}
                    options={PROJECT_IMAGE_OPTIONS}
                    onChange={(value) =>
                      updateSelectedWork({
                        secondaryProjects: updateItem(
                          content.secondaryProjects,
                          index,
                          { image: value },
                        ),
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </EditorGroup>
      </div>
    )
  }

  function renderAboutEditor() {
    const content = state.content.about

    return (
      <div className="space-y-5">
        <EditorGroup title="About Intro">
          <SelectField
            id="about-image"
            label="About Visual Asset"
            value={content.image}
            options={ABOUT_IMAGE_OPTIONS}
            onChange={(value) => updateAbout({ image: value })}
          />
          <TextField
            id="about-eyebrow"
            label="Eyebrow Text"
            value={content.aboutEyebrow}
            onChange={(value) => updateAbout({ aboutEyebrow: value })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id="about-heading-1"
              label="Heading Line 1"
              value={content.aboutHeadingLine1}
              onChange={(value) =>
                updateAbout({ aboutHeadingLine1: value })
              }
            />
            <TextField
              id="about-heading-2"
              label="Heading Line 2"
              value={content.aboutHeadingLine2}
              onChange={(value) =>
                updateAbout({ aboutHeadingLine2: value })
              }
            />
          </div>
          <TextAreaField
            id="about-description"
            label="About Description"
            value={content.aboutDescription}
            onChange={(value) => updateAbout({ aboutDescription: value })}
          />
        </EditorGroup>

        <EditorGroup
          title="About Metrics"
          description="The three metrics displayed below the About description."
        >
          <div className="space-y-3">
            {content.metrics.map((metric, index) => (
              <div
                key={metric.id}
                className="grid gap-3 rounded-lg border border-[#DDE7F8] bg-white p-3 sm:grid-cols-2"
              >
                <TextField
                  id={`about-metric-${index}-value`}
                  label="Value"
                  value={metric.value}
                  onChange={(value) =>
                    updateAbout({
                      metrics: updateItem(content.metrics, index, {
                        value,
                      }),
                    })
                  }
                />
                <TextField
                  id={`about-metric-${index}-label`}
                  label="Label"
                  value={metric.label}
                  onChange={(value) =>
                    updateAbout({
                      metrics: updateItem(content.metrics, index, {
                        label: value,
                      }),
                    })
                  }
                />
              </div>
            ))}
          </div>
        </EditorGroup>

        <EditorGroup title="Process Copy">
          <TextField
            id="about-process-eyebrow"
            label="Process Eyebrow Text"
            value={content.processEyebrow}
            onChange={(value) => updateAbout({ processEyebrow: value })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id="about-process-heading-1"
              label="Process Heading Line 1"
              value={content.processHeadingLine1}
              onChange={(value) =>
                updateAbout({ processHeadingLine1: value })
              }
            />
            <TextField
              id="about-process-heading-2"
              label="Process Heading Line 2"
              value={content.processHeadingLine2}
              onChange={(value) =>
                updateAbout({ processHeadingLine2: value })
              }
            />
          </div>
          <TextAreaField
            id="about-process-description"
            label="Process Description"
            value={content.processDescription}
            onChange={(value) =>
              updateAbout({ processDescription: value })
            }
          />
        </EditorGroup>

        <EditorGroup
          title="Process Steps"
          description="The five numbered steps in the process timeline."
        >
          <div className="space-y-2">
            {content.steps.map((step, index) => (
              <div
                key={step.id}
                className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 rounded-lg border border-[#DDE7F8] bg-white p-3"
              >
                <TextField
                  id={`about-step-${index}-number`}
                  label="Number"
                  value={step.number}
                  onChange={(value) =>
                    updateAbout({
                      steps: updateItem(content.steps, index, {
                        number: value,
                      }),
                    })
                  }
                />
                <TextField
                  id={`about-step-${index}-title`}
                  label="Step Title"
                  value={step.title}
                  onChange={(value) =>
                    updateAbout({
                      steps: updateItem(content.steps, index, {
                        title: value,
                      }),
                    })
                  }
                />
              </div>
            ))}
          </div>
        </EditorGroup>
      </div>
    )
  }

  function renderClientsEditor() {
    const content = state.content.clients

    return (
      <div className="space-y-5">
        <ContextNote>
          The current Partners / Clients section has no heading. This editor
          controls the logo list and the visibility of each individual logo.
        </ContextNote>

        <EditorGroup
          title="Partner Logos"
          description="Use the local logo assets that already exist in the project."
        >
          <div className="space-y-3">
            {content.logos.map((logo, index) => (
              <div
                key={logo.id}
                className="rounded-lg border border-[#DDE7F8] bg-white p-3.5"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-16 shrink-0 items-center justify-center rounded-md border border-[#DDE7F8] bg-[#F8FAFC] px-2">
                      <Image
                        src={logo.src}
                        alt=""
                        width={64}
                        height={24}
                        className="h-5 w-auto object-contain"
                      />
                    </span>
                    <p className="truncate text-[11px] font-semibold text-[#14213D]">
                      Logo {index + 1}
                    </p>
                  </div>

                  <label className="inline-flex shrink-0 items-center gap-1.5 text-[10px] font-medium text-[#526786]">
                    <input
                      type="checkbox"
                      checked={logo.visible}
                      onChange={(event) =>
                        updateClients(
                          updateItem(content.logos, index, {
                            visible: event.target.checked,
                          }),
                        )
                      }
                      className="h-3.5 w-3.5 accent-[#3978FF]"
                    />
                    Visible
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    id={`clients-logo-${index}-name`}
                    label="Partner Name"
                    value={logo.name}
                    onChange={(value) =>
                      updateClients(
                        updateItem(content.logos, index, { name: value }),
                      )
                    }
                  />
                  <SelectField
                    id={`clients-logo-${index}-src`}
                    label="Logo Asset"
                    value={logo.src}
                    options={CLIENT_LOGO_OPTIONS}
                    onChange={(value) =>
                      updateClients(
                        updateItem(content.logos, index, { src: value }),
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </EditorGroup>
      </div>
    )
  }

  function renderCtaEditor() {
    const content = state.content.cta

    return (
      <div className="space-y-5">
        <EditorGroup title="CTA Copy">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id="cta-heading-1"
              label="Heading Line 1"
              value={content.headingLine1}
              onChange={(value) => updateCta({ headingLine1: value })}
            />
            <TextField
              id="cta-heading-2"
              label="Heading Line 2"
              value={content.headingLine2}
              onChange={(value) => updateCta({ headingLine2: value })}
            />
          </div>
          <TextAreaField
            id="cta-description"
            label="Description"
            value={content.description}
            onChange={(value) => updateCta({ description: value })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id="cta-button-label"
              label="Button Label"
              value={content.buttonLabel}
              onChange={(value) => updateCta({ buttonLabel: value })}
            />
            <TextField
              id="cta-button-href"
              label="Button Destination"
              value={content.buttonHref}
              onChange={(value) => updateCta({ buttonHref: value })}
              hint="Use a local anchor or destination path."
            />
          </div>
        </EditorGroup>
      </div>
    )
  }

  function renderEditor() {
    switch (sectionId) {
      case "hero":
        return renderHeroEditor()
      case "browse":
        return (
          <BrowseSectionEditor
            content={state.content.browse}
            onChange={(browse) => updateContent("browse", browse)}
          />
        )
      case "selected-work":
        return renderSelectedWorkEditor()
      case "about":
        return renderAboutEditor()
      case "clients":
        return renderClientsEditor()
      case "cta":
        return renderCtaEditor()
      default:
        return (
          <div className="flex items-start gap-2 rounded-lg border border-[#DDE7F8] bg-[#F8FAFC] px-4 py-3 text-[11px] text-[#526786]">
            <CircleAlert size={14} aria-hidden="true" className="mt-0.5" />
            <p>An editor for this section is not available yet.</p>
          </div>
        )
    }
  }

  return (
    <section className="overflow-hidden rounded-xl border border-[#DDE7F8] bg-white shadow-[0_2px_8px_rgba(20,33,61,0.04)]">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#DDE7F8] px-5 py-4">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#7A8CA8]">
            {meta?.typeLabel ?? "Section"} editor
          </p>
          <h2 className="mt-1 text-[17px] font-semibold tracking-tight text-[#14213D]">
            {meta?.name ?? "Section"}
          </h2>
          <p className="mt-1 text-[11px] text-[#526786]">
            {isPersisted
              ? `${sectionName} changes are saved to the database and reflected on the public homepage.`
              : "This section's changes are saved to this browser session."}
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
            visibility === "Visible"
              ? "bg-[#EFF6FF] text-[#183B56]"
              : "bg-[#F1F5F9] text-[#526786]"
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${
              visibility === "Visible" ? "bg-[#3978FF]" : "bg-[#94A3B8]"
            }`}
          />
          {visibility}
        </span>
      </div>

      <div className="p-4 sm:p-5">{renderEditor()}</div>

      <div className="flex flex-col gap-2 border-t border-[#DDE7F8] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <button
          type="button"
          onClick={onDiscardSection}
          disabled={!isSectionDirty}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#DDE7F8] bg-white px-3 text-[12px] font-medium text-[#526786] transition-colors hover:border-[#3978FF]/40 hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Discard Changes
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={!isSectionDirty || isSaving}
          aria-busy={isSaving}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#14213D] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#183B56] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 size={14} aria-hidden="true" className="animate-spin" />
          ) : (
            <Save size={14} aria-hidden="true" />
          )}
          {isSaving
            ? "Saving..."
            : isPersisted
              ? `Save ${sectionName}`
              : "Save Section"}
        </button>
      </div>
    </section>
  )
}
