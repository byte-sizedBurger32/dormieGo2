"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Upload, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ReportMaintenancePage() {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    priority: "medium",
    location: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const categories = [
    "Air Conditioning",
    "Heating",
    "Plumbing",
    "Electrical",
    "Lighting",
    "Door/Lock",
    "Walls/Paint",
    "Furniture",
    "WiFi/Internet",
    "Other",
  ]

  const priorities = [
    { value: "low", label: "Low - Can wait", description: "Minor cosmetic issues" },
    { value: "medium", label: "Medium - Soon", description: "Functional but uncomfortable" },
    { value: "high", label: "High - Urgent", description: "Significant impact on daily life" },
    { value: "critical", label: "Critical - ASAP", description: "Safety hazard or emergency" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ category: "", title: "", description: "", priority: "medium", location: "" })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="max-w-2xl mx-auto px-4 pb-6 pt-10">
          <Link href="/dashboard" className="inline-flex">
            <Button
              variant="outline"
              className="group inline-flex items-center gap-2 rounded-full border-border/70 bg-background text-foreground hover:bg-muted"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {submitted ? (
          <Card className="p-12 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-900 mb-2">Request Submitted!</h2>
            <p className="text-green-800 mb-4">
              Your maintenance request has been received. Our team will contact you shortly.
            </p>
            <p className="text-sm text-green-700">Request ID: #MRT-2025-00{Math.floor(Math.random() * 1000)}</p>
          </Card>
        ) : (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Report a Maintenance Issue</h1>
              <p className="text-muted-foreground">
                Let us know what needs to be fixed and we'll get it resolved as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category */}
              <div>
                <label className="block font-semibold mb-3">Issue Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-border rounded-lg px-4 py-3"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block font-semibold mb-3">Issue Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Brief description of the issue"
                  required
                  className="w-full border border-border rounded-lg px-4 py-3"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block font-semibold mb-3">Location in Room</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="E.g., Bathroom, Near window, etc."
                  className="w-full border border-border rounded-lg px-4 py-3"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold mb-3">Detailed Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Please provide as much detail as possible..."
                  rows={5}
                  required
                  className="w-full border border-border rounded-lg px-4 py-3"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block font-semibold mb-4">Priority Level *</label>
                <div className="space-y-3">
                  {priorities.map((p) => (
                    <label
                      key={p.value}
                      className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition"
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={p.value}
                        checked={formData.priority === p.value}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-semibold">{p.label}</p>
                        <p className="text-sm text-muted-foreground">{p.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block font-semibold mb-3">Photos (Optional)</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="font-semibold mb-1">Upload photos</p>
                  <p className="text-xs text-muted-foreground">Drag and drop or click to select (up to 3 images)</p>
                </div>
              </div>

              {/* Alert */}
              <Card className="p-4 bg-yellow-50 border-yellow-200">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-yellow-900 mb-1">Emergency?</p>
                    <p className="text-sm text-yellow-800">
                      For critical safety issues, call the emergency hotline immediately: +63 2 8234-5678
                    </p>
                  </div>
                </div>
              </Card>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">
                Submit Maintenance Request
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                We'll review your request and contact you within 24 hours.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
