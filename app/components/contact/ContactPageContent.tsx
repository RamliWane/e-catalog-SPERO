import ContactForm from "./ContactForm"
import LocationMap from "./LocationMap"
import OfficeInformation from "./OfficeInformation"

export default function ContactPageContent() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="sr-only">Contact Spero</h1>

      <div className="grid items-stretch gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:gap-6">
        <ContactForm />
        <OfficeInformation />
      </div>

      <LocationMap />
    </div>
  )
}
