import CreateOrganizationDialog from "@/modules/organization/create-organization-form";
import React from "react";

export default function MembersPage() {
	return (
		<div className="p-4">
			<div className="flex items-center justify-end">
				<CreateOrganizationDialog />
			</div>
		</div>
	);
}
