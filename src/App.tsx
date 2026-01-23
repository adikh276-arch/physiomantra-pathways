import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "@/contexts/ProgressContext";

// Main Pages
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Layer 1 Pathways
import WelcomePathway from "./pages/layer1/WelcomePathway";
import VerificationPathway from "./pages/layer1/VerificationPathway";
import HowItWorksPathway from "./pages/layer1/HowItWorksPathway";
import ClinicalToolsPathway from "./pages/layer1/ClinicalToolsPathway";
import EarningsPathway from "./pages/layer1/EarningsPathway";

// Layer 2 Pathways
import GettingPatientsPathway from "./pages/layer2/GettingPatientsPathway";
import BringPatientsPathway from "./pages/layer2/BringPatientsPathway";
import ProfessionalIdentityPathway from "./pages/layer2/ProfessionalIdentityPathway";
import LocalAwarenessPathway from "./pages/layer2/LocalAwarenessPathway";

// Layer 3 Pathways
import InvitePhysiosPathway from "./pages/layer3/InvitePhysiosPathway";
import ClinicConnectionPathway from "./pages/layer3/ClinicConnectionPathway";
import SpecialistProfilePathway from "./pages/layer3/SpecialistProfilePathway";

// Layer 4 Pathways
import WellnessPartnerPathway from "./pages/layer4/WellnessPartnerPathway";
import CorporateReadinessPathway from "./pages/layer4/CorporateReadinessPathway";
import ShareLeadsPathway from "./pages/layer4/ShareLeadsPathway";
import AssistedOnboardingPathway from "./pages/layer4/AssistedOnboardingPathway";

// Layer 5 Pathways
import CommunityPathway from "./pages/layer5/CommunityPathway";
import TrainingPathway from "./pages/layer5/TrainingPathway";
import RecognitionPathway from "./pages/layer5/RecognitionPathway";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProgressProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Dashboard />} />

            {/* Layer 1: Foundation */}
            <Route path="/layer1/welcome" element={<WelcomePathway />} />
            <Route path="/layer1/verification" element={<VerificationPathway />} />
            <Route path="/layer1/how-it-works" element={<HowItWorksPathway />} />
            <Route path="/layer1/clinical-tools" element={<ClinicalToolsPathway />} />
            <Route path="/layer1/earnings" element={<EarningsPathway />} />

            {/* Layer 2: Earnings & Patient Flow */}
            <Route path="/layer2/getting-patients" element={<GettingPatientsPathway />} />
            <Route path="/layer2/bring-patients" element={<BringPatientsPathway />} />
            <Route path="/layer2/professional-identity" element={<ProfessionalIdentityPathway />} />
            <Route path="/layer2/local-awareness" element={<LocalAwarenessPathway />} />

            {/* Layer 3: Network Expansion */}
            <Route path="/layer3/invite-physios" element={<InvitePhysiosPathway />} />
            <Route path="/layer3/clinic-connection" element={<ClinicConnectionPathway />} />
            <Route path="/layer3/specialist-profile" element={<SpecialistProfilePathway />} />

            {/* Layer 4: Corporate Growth */}
            <Route path="/layer4/wellness-partner" element={<WellnessPartnerPathway />} />
            <Route path="/layer4/corporate-readiness" element={<CorporateReadinessPathway />} />
            <Route path="/layer4/share-leads" element={<ShareLeadsPathway />} />
            <Route path="/layer4/assisted-onboarding" element={<AssistedOnboardingPathway />} />

            {/* Layer 5: Community */}
            <Route path="/layer5/community" element={<CommunityPathway />} />
            <Route path="/layer5/training" element={<TrainingPathway />} />
            <Route path="/layer5/recognition" element={<RecognitionPathway />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ProgressProvider>
  </QueryClientProvider>
);

export default App;
