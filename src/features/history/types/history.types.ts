import {
  AxisResult,
  ScenarioResult,
  WindtunnelResult,
  PredeterminedItem,
  UncertaintyItem,
} from "@/features/newScenario/types/newScenario.types";

export interface HistoryItem {
  _id: string;
  sessionId: string;
  creditsCost: number;
  creditsDeducted: boolean;
  status: "completed" | "failed";
  lastError: string | null;
  failedAt: string | null;
  company: {
    projectTitle: string;
    name: string;
    industry: string;
    summary: string;
    focalQuestion?: string;
    horizonYear?: string;
  } | null;
  forces?: string[];
  pdfUrl?: string | null;
  pdfFileName?: string | null;
  pdfGeneratedAt?: string | null;
  completedAt?: string | null;
  startedAt?: string | null;
  lastActivityAt?: string | null;
  createdAt: string;
  updatedAt: string;
  classification?: {
    predetermined: (string | PredeterminedItem)[];
    uncertainties: (string | UncertaintyItem)[];
  };
  axes?: {
    axisA: AxisResult;
    axisB: AxisResult;
    scenarios?: {
      topRight: { name: string; summary: string };
      topLeft: { name: string; summary: string };
      bottomLeft: { name: string; summary: string };
      bottomRight: { name: string; summary: string };
    };
  };
  scenarios?: {
    scenarios: ScenarioResult[];
  };
  windTunnelResults?: WindtunnelResult;
  report?: string;
}
