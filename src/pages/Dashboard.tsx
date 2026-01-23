import DashboardLayout from '@/components/layout/DashboardLayout';
import Badge from '@/components/dashboard/Badge';
import LayerCard from '@/components/dashboard/LayerCard';
import { useProgress } from '@/contexts/ProgressContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RotateCcw, Target } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    progress,
    isLayerComplete,
    isLayerUnlocked,
    getLayerProgress,
    resetProgress,
  } = useProgress();

  const layer1Progress = getLayerProgress('layer1');
  const layer2Progress = getLayerProgress('layer2');
  const layer3Progress = getLayerProgress('layer3');
  const layer4Progress = getLayerProgress('layer4');

  const getLayer1Status = () => {
    if (isLayerComplete('layer1')) return 'complete';
    if (layer1Progress.completed > 0) return 'in-progress';
    return 'in-progress'; // default to enabled
  };

  const getLayer2Status = () => {
    if (!isLayerUnlocked('layer2')) return 'locked';
    if (isLayerComplete('layer2')) return 'complete';
    if (layer2Progress.completed > 0) return 'in-progress';
    return 'in-progress';
  };

  const getLayer3Status = () => {
    if (!isLayerUnlocked('layer3')) return 'locked';
    if (isLayerComplete('layer3')) return 'complete';
    if (layer3Progress.completed > 0) return 'in-progress';
    return 'in-progress';
  };

  const getLayer4Status = () => {
    if (!isLayerUnlocked('layer4')) return 'locked';
    if (isLayerComplete('layer4')) return 'complete';
    if (layer4Progress.completed > 0) return 'in-progress';
    return 'in-progress';
  };

  const getNextLayer1Step = () => {
    if (!progress.layer1.welcome) return 'Welcome to PhysioMantra';
    if (!progress.layer1.verification) return 'Profile Verification';
    if (!progress.layer1.howItWorks) return 'How MantraCare Works';
    if (!progress.layer1.clinicalTools) return 'Clinical Tools Overview';
    if (!progress.layer1.earnings) return 'Earnings & Payments';
    return '';
  };

  const getNextLayer2Step = () => {
    if (!progress.layer2.gettingPatients) return 'Start Getting Patients';
    if (!progress.layer2.bringPatients) return 'Bring Your Existing Patients';
    if (!progress.layer2.professionalIdentity) return 'Professional Identity Setup';
    if (!progress.layer2.localAwareness) return 'Local Awareness & Referrals';
    return '';
  };

  const handleLayer1Click = () => {
    if (!progress.layer1.welcome) navigate('/layer1/welcome');
    else if (!progress.layer1.verification) navigate('/layer1/verification');
    else if (!progress.layer1.howItWorks) navigate('/layer1/how-it-works');
    else if (!progress.layer1.clinicalTools) navigate('/layer1/clinical-tools');
    else if (!progress.layer1.earnings) navigate('/layer1/earnings');
    else navigate('/layer1/welcome');
  };

  const handleLayer2Click = () => {
    if (!isLayerUnlocked('layer2')) return;
    if (!progress.layer2.gettingPatients) navigate('/layer2/getting-patients');
    else if (!progress.layer2.bringPatients) navigate('/layer2/bring-patients');
    else if (!progress.layer2.professionalIdentity) navigate('/layer2/professional-identity');
    else if (!progress.layer2.localAwareness) navigate('/layer2/local-awareness');
    else navigate('/layer2/getting-patients');
  };

  const handleLayer3Click = () => {
    if (!isLayerUnlocked('layer3')) return;
    if (!progress.layer3.invitePhysios) navigate('/layer3/invite-physios');
    else if (!progress.layer3.clinicConnection) navigate('/layer3/clinic-connection');
    else if (!progress.layer3.specialistProfile) navigate('/layer3/specialist-profile');
    else navigate('/layer3/invite-physios');
  };

  const handleLayer4Click = () => {
    if (!isLayerUnlocked('layer4')) return;
    if (!progress.layer4.wellnessPartner) navigate('/layer4/wellness-partner');
    else if (!progress.layer4.corporateReadiness) navigate('/layer4/corporate-readiness');
    else if (!progress.layer4.shareLeads) navigate('/layer4/share-leads');
    else if (!progress.layer4.assistedOnboarding) navigate('/layer4/assisted-onboarding');
    else navigate('/layer4/wellness-partner');
  };

  const handleLayer5Click = () => {
    navigate('/layer5/community');
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
            <span className="text-2xl font-bold text-primary">PM</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              PhysioMantra Navigator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your roadmap to becoming a top-tier provider.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            {isLayerComplete('layer1') && <Badge label="Verified Physio" variant="verified" />}
            {isLayerComplete('layer1') && <Badge label="Foundation Master" variant="achievement" />}
            {isLayerComplete('layer2') && <Badge label="Patient Builder" variant="special" />}
          </div>
        </div>

        {/* Growth Journey */}
        <div className="relative">
          <div className="absolute left-[28px] top-6 bottom-6 w-0.5 bg-border/50 -z-10 hidden sm:block"></div>

          <div className="space-y-8">
            <LayerCard
              layerNumber={1}
              title="Foundation & Credibility"
              status={getLayer1Status()}
              progress={layer1Progress}
              nextStep={getNextLayer1Step()}
              onClick={handleLayer1Click}
            />
            <LayerCard
              layerNumber={2}
              title="Earnings & Patient Flow"
              status={getLayer2Status()}
              progress={layer2Progress}
              nextStep={getNextLayer2Step()}
              unlockCondition="Complete Layer 1"
              onClick={handleLayer2Click}
            />
            <LayerCard
              layerNumber={3}
              title="Network Expansion"
              status={getLayer3Status()}
              progress={layer3Progress}
              unlockCondition="Complete Layer 2"
              onClick={handleLayer3Click}
            />
            <LayerCard
              layerNumber={4}
              title="Corporate Growth"
              status={getLayer4Status()}
              progress={layer4Progress}
              unlockCondition="Complete Layer 2 + Trust Score >70"
              onClick={handleLayer4Click}
            />
            <LayerCard
              layerNumber={5}
              title="Community & Leadership"
              status="active" // Always visible/active for preview, or logic based on layer 4
              nextStep="Join the community"
              onClick={handleLayer5Click}
            />
          </div>
        </div>

        <div className="flex justify-center pt-8 pb-12">
          <Button
            variant="outline"
            size="sm"
            onClick={resetProgress}
            className="text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset All Progress
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
