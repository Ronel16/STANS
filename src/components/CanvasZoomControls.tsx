import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, Move } from "lucide-react";

interface CanvasZoomControlsProps {
  zoom: number;
  setZoom: (zoom: number) => void;
  resetView: () => void;
}

const CanvasZoomControls = ({ zoom, setZoom, resetView }: CanvasZoomControlsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-3 bg-muted/30 rounded-lg">
      <div className="flex items-center gap-2">
        <ZoomOut className="w-4 h-4 text-muted-foreground" />
        <Slider
          value={[zoom]}
          onValueChange={(v) => setZoom(v[0])}
          min={25}
          max={200}
          step={5}
          className="w-32"
        />
        <ZoomIn className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium ml-2">{zoom}%</span>
      </div>
      <Button variant="outline" size="sm" onClick={resetView}>
        <Move className="w-4 h-4 mr-1" />
        Reset View
      </Button>
      <span className="text-xs text-muted-foreground">
        Alt+Drag to pan, Scroll to zoom
      </span>
    </div>
  );
};

export default CanvasZoomControls;
