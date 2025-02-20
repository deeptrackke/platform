
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

interface VerificationData {
  idNumber: string;
  name: string;
  sex: string;
  dateOfBirth: string;
  districtOfBirth: string;
  placeOfIssue: string;
  dateOfIssue: string;
  serialNumber: string;
  pin: string;
  districtOfResidence: string;
  location: string;
  serialNumberZone: string;
}

const VerificationResults = () => {
  // Mock data - replace with actual data in production
  const verificationData: VerificationData = {
    idNumber: "28974512",
    name: "EMMAH MAINA MURUGI",
    sex: "FEMALE",
    dateOfBirth: "12/07/1995",
    districtOfBirth: "KISUMU",
    placeOfIssue: "NAIROBI",
    dateOfIssue: "10/03/2017",
    serialNumber: "C567893421",
    pin: "P134567892",
    districtOfResidence: "NAIROBI",
    location: "LANGATA",
    serialNumberZone: "SOUTH C"
  };

  const ResultSection = ({ title, items }: { title: string; items: { label: string; status: "PASSED" }[] }) => (
    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">{item.label}</span>
            </div>
            <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const DataRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-2 gap-4 py-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-700">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-block px-6 py-2 bg-cyan-100 text-cyan-800 rounded-full font-medium">
              VERIFICATION SUCCESSFUL
            </div>
            <div className="inline-block px-4 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              97.5% PASS RATE
            </div>
          </div>

          {/* Personal Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-800 text-white p-6 rounded-lg">
            <DataRow label="ID NUMBER" value={verificationData.idNumber} />
            <DataRow label="NAME" value={verificationData.name} />
            <DataRow label="SEX" value={verificationData.sex} />
            <DataRow label="DATE OF BIRTH" value={verificationData.dateOfBirth} />
            <DataRow label="DISTRICT OF BIRTH" value={verificationData.districtOfBirth} />
            <DataRow label="PLACE/DISTRICT OF ISSUE" value={verificationData.placeOfIssue} />
            <DataRow label="DATE OF ISSUE" value={verificationData.dateOfIssue} />
            <DataRow label="SERIAL NUMBER" value={verificationData.serialNumber} />
            <DataRow label="PIN" value={verificationData.pin} />
            <DataRow label="DISTRICT OF RESIDENCE" value={verificationData.districtOfResidence} />
            <DataRow label="LOCATION" value={verificationData.location} />
            <DataRow label="SERIAL NUMBER" value={verificationData.serialNumberZone} />
          </div>

          {/* Verification Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResultSection 
              title="Image quality and metadata"
              items={[
                { label: "No IMAGE MANIPULATION detected", status: "PASSED" },
                { label: "ID MARKERS are authentic", status: "PASSED" },
                { label: "No duplicates found", status: "PASSED" }
              ]}
            />
            <ResultSection 
              title="Returning Personal Info"
              items={[
                { label: "Records found in the Government Database", status: "PASSED" },
                { label: "Positively matches Government Records", status: "PASSED" }
              ]}
            />
            <ResultSection 
              title="Verifying Attachments"
              items={[
                { label: "SELFIE VIDEO looks authentic", status: "PASSED" },
                { label: "FRONT ID looks authentic", status: "PASSED" },
                { label: "BACK ID looks authentic", status: "PASSED" }
              ]}
            />
            <ResultSection 
              title="Liveness Check to ID Analysis"
              items={[
                { label: "No IMPERSONATION FRAUD detected", status: "PASSED" },
                { label: "No SYNTHETIC FRAUD detected", status: "PASSED" },
                { label: "No Facial inconsistencies detected", status: "PASSED" }
              ]}
            />
          </div>

          {/* Footer Action */}
          <div className="flex justify-end">
            <Link href="/verifications">
            <button className="text-cyan-500 hover:text-cyan-600 font-medium flex items-center gap-2">
              Go to All Verifications
              <span className="text-lg">»</span>
            </button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VerificationResults;