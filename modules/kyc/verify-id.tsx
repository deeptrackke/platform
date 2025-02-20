"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type DocumentType = "id" | "passport" | "driversLicense"

export default function VerifyIdentity() {
  const [documentType, setDocumentType] = useState<DocumentType | null>(null)

  const renderUploadBoxes = () => {
    switch (documentType) {
      case "id":
        return [
          { title: "FRONT OF ID", active: true },
          { title: "BACK OF ID", active: false },
        ]
      case "passport":
        return [{ title: "PASSPORT PHOTO", active: true }]
      case "driversLicense":
        return [
          { title: "FRONT OF LICENSE", active: true },
          { title: "BACK OF LICENSE", active: false },
        ]
      default:
        return []
    }
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4 h-auto p-0 hover:bg-transparent">
            <span className="text-2xl font-medium">Verify Identity</span>
          </Button>

          {/* Progress Section */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Step 2 of 3: Uploading documents</p>
            <Progress value={66} className="h-1" />
          </div>
        </div>

        {/* Document Type Selection */}
        {!documentType && (
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Select Document Type</h2>
            <RadioGroup onValueChange={(value) => setDocumentType(value as DocumentType)}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="id" id="id" />
                  <Label htmlFor="id">ID Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="passport" id="passport" />
                  <Label htmlFor="passport">Passport</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="driversLicense" id="driversLicense" />
                  <Label htmlFor="driversLicense">Driver's License</Label>
                </div>
              </div>
            </RadioGroup>
          </Card>
        )}

        {/* Upload Boxes */}
        {documentType && (
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {renderUploadBoxes().map((box, index) => (
              <Card
                key={index}
                className={cn(
                  "flex min-h-[240px] flex-col items-center justify-center border border-dashed p-6 text-center",
                  box.active && "border-2 border-primary",
                )}
              >
                <Button variant="outline" size="icon" className="mb-4 h-12 w-12 rounded-full">
                  <Upload className="h-6 w-6" />
                </Button>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">{box.title}</h3>
                  <p className="text-sm font-medium">Click to upload</p>
                  <p className="text-sm text-muted-foreground">or drag and drop</p>
                  <p className="text-xs text-muted-foreground">
                    Maximum file size 15 MB.
                    <br />
                    JPG, PNG, WAVV or PDF
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Submit Button */}
        {documentType && (
          <Button size="lg" className="w-full py-6 text-base">
            Save and proceed to view results
          </Button>
        )}
      </div>
    </div>
  )
}

