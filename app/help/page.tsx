import Link from "next/link"
import { ChevronLeft, MessageCircleQuestion, Mail, Phone, Shield, BookOpen } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "How do I report a maintenance issue?",
    answer: "Head over to the Maintenance tab from your dashboard or tap Report Issue. Fill in the details and our team will respond within the stated timeframes.",
  },
  {
    question: "What payment methods are supported?",
    answer: "We currently support Visa, Mastercard, bank transfer, and GCash. You can manage these inside the Payment Methods section of your account.",
  },
  {
    question: "How are listings verified?",
    answer: "Every dorm partner completes background checks, safety inspections, and provides business permits before being published on DormieGO.",
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="max-w-4xl mx-auto px-4 pb-6 pt-10">
          <Link href="/account" className="inline-flex">
            <Button
              variant="outline"
              className="group inline-flex items-center gap-2 rounded-full border-border/70 bg-background text-foreground hover:bg-muted"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Account
            </Button>
          </Link>
          <h1 className="mt-4 text-3xl font-bold">Help Center</h1>
          <p className="text-sm text-muted-foreground">
            Find quick answers or reach out to our support team anytime.
          </p>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <Card className="p-6 bg-accent/5 border-accent/20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <MessageCircleQuestion className="h-5 w-5 text-accent-foreground" /> Need a hand?
              </h2>
              <p className="text-sm text-muted-foreground">
                Our support team is online from 8 AM to 8 PM, Monday to Saturday.
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">Chat with Support</Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Card className="p-5">
            <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
              <Mail className="h-5 w-5" /> Email us
            </h3>
            <p className="text-sm text-muted-foreground">support@dormiego.com</p>
            <p className="mt-3 text-xs text-muted-foreground">Replies within 6 hours</p>
          </Card>
          <Card className="p-5">
            <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
              <Phone className="h-5 w-5" /> Call hotline
            </h3>
            <p className="text-sm text-muted-foreground">(+63) 2 123 4567</p>
            <p className="mt-3 text-xs text-muted-foreground">8 AM - 6 PM (Mon-Sat)</p>
          </Card>
        </div>

        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5" /> Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-border/70 p-4">
                <p className="font-semibold">{faq.question}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" /> Community safety tips
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Always verify visitors with the dorm front desk.</li>
            <li>Keep emergency contacts saved in your phone and posted near the door.</li>
            <li>Report suspicious activities through the maintenance or security hotline.</li>
          </ul>
        </Card>
      </section>
    </div>
  )
}
