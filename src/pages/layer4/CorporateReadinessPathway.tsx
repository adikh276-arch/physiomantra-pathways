import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Button } from '@/components/ui/button';
import { Download, FileText, Presentation, Eye, Package, Check } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const assets = [
  { id: 'letter', label: 'Corporate Appointment Letter', icon: FileText },
  { id: 'pitch', label: 'Corporate Pitch Deck', icon: Presentation },
  { id: 'templates', label: 'Outreach Templates', icon: Eye, isView: true },
];

const CorporateReadinessPathway = () => {
  const [downloaded, setDownloaded] = useState<string[]>([]);
  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const handleAction = (id: string, label: string) => {
    if (!downloaded.includes(id)) {
      setDownloaded([...downloaded, id]);
    }
    toast.success(`${label} ${id === 'templates' ? 'viewed' : 'downloaded'}!`);
  };

  const handleDownloadAll = () => {
    setDownloaded(['letter', 'pitch', 'templates']);
    toast.success('Complete Corporate Kit downloaded!');
  };

  const handleComplete = () => {
    completePathway('layer4', 'corporateReadiness');
    toast.success('Ready to share leads!');
    navigate('/layer4/share-leads');
  };

  return (
    <PathwayLayout
      title="Corporate Readiness"
      layerNumber={4}
      pathwayNumber={2}
      onComplete={handleComplete}
      completeButtonText="Continue"
    >
      <div className="space-y-6">
        <h3 className="font-semibold text-foreground">Tools:</h3>

        <div className="space-y-3">
          {assets.map((asset) => {
            const isDownloaded = downloaded.includes(asset.id);
            return (
              <div
                key={asset.id}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                  isDownloaded
                    ? 'border-success/30 bg-success/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className={`p-2 rounded-lg ${isDownloaded ? 'bg-success/20' : 'bg-muted'}`}>
                  <asset.icon className={`w-5 h-5 ${isDownloaded ? 'text-success' : 'text-muted-foreground'}`} />
                </div>
                <span className="flex-1 font-medium text-foreground">{asset.label}</span>
                <Button
                  variant={isDownloaded ? 'outline' : 'default'}
                  size="sm"
                  onClick={() => handleAction(asset.id, asset.label)}
                  className={isDownloaded ? 'border-success text-success' : ''}
                >
                  {isDownloaded ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Done
                    </>
                  ) : asset.isView ? (
                    <>
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </>
                  )}
                </Button>
              </div>
            );
          })}
        </div>

        <Button
          onClick={handleDownloadAll}
          variant="outline"
          className="w-full"
          disabled={downloaded.length === 3}
        >
          <Package className="w-4 h-4 mr-2" />
          {downloaded.length === 3 ? 'All Downloaded' : 'Download Complete Corporate Kit (ZIP)'}
        </Button>
      </div>
    </PathwayLayout>
  );
};

export default CorporateReadinessPathway;
