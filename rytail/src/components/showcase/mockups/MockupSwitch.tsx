"use client";

import type { ShowcaseCard } from "@/data/showcase";
import { AssistantMockup } from "./AssistantMockup";
import { ConnectorMockup } from "./ConnectorMockup";
import { ReportMockup } from "./ReportMockup";
import { WorkflowMockup } from "./WorkflowMockup";

interface MockupSwitchProps {
  card: ShowcaseCard;
  isExpanded: boolean;
  reducedMotion: boolean;
  isMobileLayout?: boolean;
}

// Illustrative UI, not functional.
export function MockupSwitch({
  card,
  isExpanded,
  reducedMotion,
  isMobileLayout = false,
}: MockupSwitchProps) {
  const renderMockup = () => {
    switch (card.mockupType) {
      case "assistant":
        return card.assistantData ? (
          <AssistantMockup
            data={card.assistantData}
            isExpanded={isExpanded}
            reducedMotion={reducedMotion}
          />
        ) : null;
      case "connector":
        return card.connectorData ? (
          <ConnectorMockup
            data={card.connectorData}
            isExpanded={isExpanded}
            reducedMotion={reducedMotion}
          />
        ) : null;
      case "report":
        return card.reportData ? (
          <ReportMockup
            data={card.reportData}
            isExpanded={isExpanded}
            reducedMotion={reducedMotion}
          />
        ) : null;
      case "workflow":
        return card.workflowData ? (
          <WorkflowMockup
            data={card.workflowData}
            isExpanded={isExpanded}
            reducedMotion={reducedMotion}
          />
        ) : null;
    }
  };

  return (
    <div
      aria-hidden="true"
      className={
        isMobileLayout
          ? "w-full max-w-[320px] origin-top-left scale-[0.85] rounded-[20px] border border-white/[0.14] bg-[#1A1816] p-4 shadow-2xl"
          : isExpanded
            ? "w-[58%] min-w-[260px] max-w-[440px] rounded-[20px] border border-white/[0.14] bg-[#1A1816] p-4 shadow-2xl"
          : "inline-block max-w-full rounded-full border border-white/[0.14] bg-[#1A1816]/90 p-1.5 shadow-xl backdrop-blur-md"
}
    >
  { renderMockup() }
    </div >
  );
}
