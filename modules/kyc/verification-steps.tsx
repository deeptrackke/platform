"use client";

import { Card, CardHeader } from "@/components/ui/card";
import {
	Stepper,
	StepperIndicator,
	StepperItem,
	StepperTitle,
	StepperTrigger,
} from "@/components/ui/stepper";
import { Customer } from "@/lib/type";
import { KycScope, useKycStepper } from "@/modules/kyc/stepper-utils";
import VerifyCustomer from "@/modules/kyc/verify-customer";
import VerifyIdentity from "@/modules/kyc/verify-id";
import React from "react";
import BasicInfoForm from "./basic-info-form";

export default function VerificationSteps({
	userId,
	customer,
}: {
	userId: number;
	customer?: Customer;
}) {
	const stepper = useKycStepper();
	// Get the current step number based on the current step ID
	const currentStepNumber = stepper.current.stepNumber;

	return (
		<Card>
			<CardHeader>
				<KycScope>
					<div className="space-y-4">
						<div className="mx-auto max-w-2xl text-center">
							<Stepper
								defaultValue={1}
								value={currentStepNumber}
								onValueChange={(step) => {
									const targetStep = stepper.all.find(
										(s) => s.stepNumber === step,
									);
									if (targetStep) {
										stepper.goTo(targetStep.id);
									}
								}}
								className="items-start gap-4"
							>
								{stepper.all.map((step) => (
									<StepperItem
										key={step.id}
										step={step.stepNumber}
										className="flex-1"
										disabled={!customer && step.stepNumber > 1}
									>
										<StepperTrigger className="w-full flex-col items-start gap-2">
											<StepperIndicator
												asChild
												className="h-1 w-full bg-border"
											>
												<span className="sr-only">{step.title}</span>
											</StepperIndicator>
											<div className="space-y-0.5 text-center">
												<StepperTitle>{step.title}</StepperTitle>
											</div>
										</StepperTrigger>
									</StepperItem>
								))}
							</Stepper>
						</div>

						<div className="">
							{stepper.when("first", () => (
								<BasicInfoForm
									customer={customer}
									userId={userId}
									next={() => stepper.next()}
								/>
							))}
							{customer &&
								stepper.when("second", () => (
									<VerifyIdentity
										next={() => stepper.next()}
										customer={customer}
									/>
								))}
							{customer &&
								stepper.when("third", () => (
									<VerifyCustomer customer={customer} />
								))}
						</div>
					</div>
				</KycScope>
			</CardHeader>
		</Card>
	);
}
