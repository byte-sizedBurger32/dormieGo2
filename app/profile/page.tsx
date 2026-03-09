"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Mail, Phone, Shield, Lock, Camera, Edit, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import dynamic from "next/dynamic"
import { AppleIcon as BaseAppleIcon, FacebookIcon as BaseFacebookIcon, GoogleIcon as BaseGoogleIcon } from "@/app/login/page"

const GoogleLogo = dynamic(async () => ({ default: BaseGoogleIcon }), { ssr: false })
const FacebookLogo = dynamic(async () => ({ default: BaseFacebookIcon }), { ssr: false })
const AppleLogo = dynamic(async () => ({ default: BaseAppleIcon }), { ssr: false })

const socialLoginOptions = [
  {
    id: "google",
    label: "Google",
    icon: GoogleLogo,
    description: "Sign in instantly using your Google account.",
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: FacebookLogo,
    description: "Use your Facebook profile to access DormieGO.",
  },
  {
    id: "apple",
    label: "Apple",
    icon: AppleLogo,
    description: "Enable Sign in with Apple for added privacy.",
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState({
    firstName: "Maria",
    lastName: "Santos",
    email: "maria.santos@email.com",
    phone: "+63 917-123-4567",
    dorm: "Urban Dorm Plus",
    roomNumber: "204B",
    university: "University of the Philippines",
    verificationStatus: "verified",
  })
  const [linkedSocials, setLinkedSocials] = useState<Record<string, boolean>>({
    google: true,
    facebook: false,
    apple: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  const toggleSocialLink = (providerId: string) => {
    setLinkedSocials((prev) => ({
      ...prev,
      [providerId]: !prev[providerId],
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background">
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
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="md:col-span-1 p-6 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <img src="/placeholder.svg?key=profile" alt="Profile" className="w-full h-full rounded-full bg-muted" />
              <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold mb-1">
              {formData.firstName} {formData.lastName}
            </h2>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-green-700 font-semibold">Verified Resident</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{formData.dorm}</p>

            {!isEditing && (
              <Button className="w-full bg-primary hover:bg-primary/90 mb-2" onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}

            <div className="mt-6 pt-6 border-t border-border space-y-4">
              <div className="text-left">
                <p className="text-xs text-muted-foreground mb-1">Member Since</p>
                <p className="font-semibold">August 2024</p>
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground mb-1">Account Status</p>
                <p className="font-semibold text-green-600">Active</p>
              </div>
            </div>
          </Card>

          {/* Tabs & Content */}
          <div className="md:col-span-2">
            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-border">
              <button
                onClick={() => setActiveTab("profile")}
                className={`pb-3 px-4 font-semibold transition border-b-2 ${
                  activeTab === "profile"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Personal Info
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`pb-3 px-4 font-semibold transition border-b-2 ${
                  activeTab === "security"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Security
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`pb-3 px-4 font-semibold transition border-b-2 ${
                  activeTab === "notifications"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Notifications
              </button>
            </div>

            {/* Personal Info Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                {isEditing ? (
                  <>
                    <Card className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full border border-border rounded-lg px-4 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full border border-border rounded-lg px-4 py-2"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border border-border rounded-lg px-4 py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full border border-border rounded-lg px-4 py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">University</label>
                        <input
                          type="text"
                          name="university"
                          value={formData.university}
                          onChange={handleChange}
                          className="w-full border border-border rounded-lg px-4 py-2"
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsEditing(false)}>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                        <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={handleSave}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </Card>
                  </>
                ) : (
                  <>
                    <Card className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">First Name</p>
                          <p className="font-semibold">{formData.firstName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Last Name</p>
                          <p className="font-semibold">{formData.lastName}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Email</p>
                        <p className="font-semibold flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {formData.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                        <p className="font-semibold flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {formData.phone}
                        </p>
                      </div>
                    </Card>

                    <Card className="p-6 space-y-4">
                      <h3 className="font-bold text-lg">Current Accommodation</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Dorm</p>
                          <p className="font-semibold">{formData.dorm}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Room Number</p>
                          <p className="font-semibold">{formData.roomNumber}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">University</p>
                        <p className="font-semibold">{formData.university}</p>
                      </div>
                    </Card>
                  </>
                )}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Password</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Change your password to keep your account secure.
                  </p>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Lock className="w-4 h-4" />
                    Change Password
                  </Button>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account.</p>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg mb-4">
                    <span className="font-semibold">Status</span>
                    <span className="text-green-600 font-semibold">Enabled</span>
                  </div>
                  <Button variant="outline">Manage 2FA Settings</Button>
                </Card>

                <Card className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg">Social & Single Sign-On</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Link your social accounts to make signing in faster across all of your devices.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {socialLoginOptions.map((provider) => {
                      const isLinked = linkedSocials[provider.id]
                      return (
                        <div
                          key={provider.id}
                          className="flex flex-col gap-3 rounded-2xl border border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <provider.icon />
                            <div>
                              <p className="font-semibold text-foreground">{provider.label}</p>
                              <p className="text-sm text-muted-foreground">{provider.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-3 sm:justify-end">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                isLinked ? "bg-green-50 text-green-700 border border-green-200" : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {isLinked ? "Linked" : "Not linked"}
                            </span>
                            <Button
                              variant={isLinked ? "outline" : "secondary"}
                              className="rounded-full"
                              onClick={() => toggleSocialLink(provider.id)}
                            >
                              {isLinked ? "Disconnect" : "Link account"}
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Active Sessions</h3>
                  <p className="text-sm text-muted-foreground mb-4">Manage your active login sessions.</p>
                  <div className="space-y-3">
                    <div className="p-4 border border-border rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Chrome on MacOS</p>
                        <p className="text-sm text-muted-foreground">Last active: Today at 2:30 PM</p>
                      </div>
                      <span className="text-xs font-semibold text-green-600">Current</span>
                    </div>
                    <div className="p-4 border border-border rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Safari on iPhone</p>
                        <p className="text-sm text-muted-foreground">Last active: 3 days ago</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <Card className="p-6 space-y-4">
                  <h3 className="font-bold text-lg mb-4">Notification Preferences</h3>

                  {[
                    { label: "Payment Reminders", description: "Get notified about upcoming rent payments" },
                    { label: "Maintenance Updates", description: "Updates on your maintenance requests" },
                    { label: "Community Posts", description: "New posts in the community forum" },
                    { label: "Announcements", description: "Important dorm announcements" },
                    { label: "Reviews & Messages", description: "Responses to your reviews" },
                  ].map((notif, idx) => (
                    <label
                      key={idx}
                      className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition"
                    >
                      <div>
                        <p className="font-semibold">{notif.label}</p>
                        <p className="text-sm text-muted-foreground">{notif.description}</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                  ))}
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Notification Channels</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 border border-primary/20 bg-primary/5 rounded-lg">
                      <span className="font-semibold">Email</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <span className="font-semibold">SMS</span>
                      <input type="checkbox" className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <span className="font-semibold">In-App</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
