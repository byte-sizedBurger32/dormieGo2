import Link from "next/link"
import { ChevronLeft, CreditCard, PlusCircle, Edit, Trash2, ShieldCheck } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const paymentMethods = [
  {
    id: "card-1",
    type: "Visa",
    last4: "3421",
    holder: "Maria Santos",
    expiry: "05/28",
    primary: true,
  },
  {
    id: "wallet-1",
    type: "GCash",
    last4: "8216",
    holder: "Maria Santos",
    primary: false,
  },
]

export default function PaymentsPage() {
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
          <h1 className="mt-4 text-3xl font-bold">Payment Methods</h1>
          <p className="text-sm text-muted-foreground">
            Manage how you pay for rent, deposits, and other dorm services securely.
          </p>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" /> Secure payments powered by DormieGO
              </h2>
              <p className="text-sm text-muted-foreground">
                We encrypt every transaction and support cards, e-wallets, and bank transfers.
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Method
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <Card key={method.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <CreditCard className="h-5 w-5" /> {method.type} ending in {method.last4}
                </p>
                <p className="text-sm text-muted-foreground">Cardholder: {method.holder}</p>
                <p className="text-sm text-muted-foreground">
                  {method.expiry ? `Expires ${method.expiry}` : "Linked mobile wallet"}
                </p>
                {method.primary && <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Primary method</span>}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Trash2 className="h-4 w-4 mr-2" /> Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
