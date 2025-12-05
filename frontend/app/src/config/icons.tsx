import { 
  Upload, 
  Download, 
  ArrowLeft, 
  ArrowRight, 
  ArrowDown, 
  Home, 
  FileJson, 
  FileType, 
  Moon, 
  Sun, 
  Check, 
  X, 
  AlertCircle,
  Clock,
  Zap,
  TrendingUp,
  DollarSign,
  Timer,
  Activity,
  RefreshCw,
  LayoutGrid,
  Replace
} from 'lucide-react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export const IconUpload: React.FC<IconProps> = (props) => <Upload {...props} />;
export const IconDownload: React.FC<IconProps> = (props) => <Download {...props} />;
export const IconArrowLeft: React.FC<IconProps> = (props) => <ArrowLeft {...props} />;
export const IconArrowRight: React.FC<IconProps> = (props) => <ArrowRight {...props} />;
export const IconArrowDown: React.FC<IconProps> = (props) => <ArrowDown {...props} />;
export const IconHome: React.FC<IconProps> = (props) => <Home {...props} />;
export const IconFileJson: React.FC<IconProps> = (props) => <FileJson {...props} />;
export const IconFileType: React.FC<IconProps> = (props) => <FileType {...props} />;
export const IconMoon: React.FC<IconProps> = (props) => <Moon {...props} />;
export const IconSun: React.FC<IconProps> = (props) => <Sun {...props} />;
export const IconCheck: React.FC<IconProps> = (props) => <Check {...props} />;
export const IconClose: React.FC<IconProps> = (props) => <X {...props} />;
export const IconAlert: React.FC<IconProps> = (props) => <AlertCircle {...props} />;
export const IconClock: React.FC<IconProps> = (props) => <Clock {...props} />;
export const IconZap: React.FC<IconProps> = (props) => <Zap {...props} />;
export const IconTrendingUp: React.FC<IconProps> = (props) => <TrendingUp {...props} />;
export const IconDollarSign: React.FC<IconProps> = (props) => <DollarSign {...props} />;
export const IconTimer: React.FC<IconProps> = (props) => <Timer {...props} />;
export const IconActivity: React.FC<IconProps> = (props) => <Activity {...props} />;
export const IconRefreshCw: React.FC<IconProps> = (props) => <RefreshCw {...props} />;
export const IconLayoutGrid: React.FC<IconProps> = (props) => <LayoutGrid {...props} />;
export const IconReplace: React.FC<IconProps> = (props) => <Replace {...props} />;
