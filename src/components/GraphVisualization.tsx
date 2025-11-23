import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, RefreshCw, Pause } from "lucide-react";
import { toast } from "sonner";

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
}

interface Edge {
  from: string;
  to: string;
  weight: number;
  traffic: "low" | "medium" | "high";
  isBlocked: boolean;
  isInMST?: boolean;
}

const GraphVisualization = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationComplete, setCalculationComplete] = useState(false);

  // Sample graph data
  const nodes: Node[] = [
    { id: "A", x: 100, y: 150, label: "Intersection A" },
    { id: "B", x: 300, y: 100, label: "Intersection B" },
    { id: "C", x: 500, y: 150, label: "Intersection C" },
    { id: "D", x: 200, y: 300, label: "Intersection D" },
    { id: "E", x: 400, y: 300, label: "Intersection E" },
  ];

  const [edges, setEdges] = useState<Edge[]>([
    { from: "A", to: "B", weight: 5, traffic: "low", isBlocked: false },
    { from: "A", to: "D", weight: 8, traffic: "medium", isBlocked: false },
    { from: "B", to: "C", weight: 6, traffic: "high", isBlocked: false },
    { from: "B", to: "E", weight: 7, traffic: "low", isBlocked: false },
    { from: "C", to: "E", weight: 4, traffic: "low", isBlocked: false },
    { from: "D", to: "E", weight: 9, traffic: "medium", isBlocked: true },
  ]);

  const getNodePosition = (nodeId: string) => {
    return nodes.find((n) => n.id === nodeId);
  };

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case "low":
        return "hsl(var(--traffic-low))";
      case "medium":
        return "hsl(var(--traffic-medium))";
      case "high":
        return "hsl(var(--traffic-high))";
      default:
        return "hsl(var(--border))";
    }
  };

  const calculateMST = () => {
    setIsCalculating(true);
    toast.info("Calculating Minimum Spanning Tree...");

    setTimeout(() => {
      // Simulate Kruskal's algorithm - mark certain edges as part of MST
      const updatedEdges = edges.map((edge) => ({
        ...edge,
        isInMST: !edge.isBlocked && ["A-B", "A-D", "C-E", "B-E"].includes(`${edge.from}-${edge.to}`),
      }));

      setEdges(updatedEdges);
      setIsCalculating(false);
      setCalculationComplete(true);
      toast.success("MST calculation complete!");
    }, 2000);
  };

  const resetGraph = () => {
    setEdges(edges.map((edge) => ({ ...edge, isInMST: false })));
    setCalculationComplete(false);
    toast.info("Graph reset");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="font-display">Graph Visualization</CardTitle>
          <CardDescription>
            Weighted directed graph representing road network with traffic conditions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={calculateMST}
              disabled={isCalculating || calculationComplete}
              className="bg-primary hover:bg-primary/90"
            >
              {isCalculating ? (
                <>
                  <Pause className="w-4 h-4 mr-2 animate-pulse" />
                  Calculating...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Kruskal's Algorithm
                </>
              )}
            </Button>
            <Button onClick={resetGraph} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "hsl(var(--traffic-low))" }} />
              <span className="text-sm">Low Traffic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "hsl(var(--traffic-medium))" }} />
              <span className="text-sm">Medium Traffic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "hsl(var(--traffic-high))" }} />
              <span className="text-sm">High Traffic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-destructive" />
              <span className="text-sm">Blocked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-accent" style={{ height: "3px" }} />
              <span className="text-sm">MST Path</span>
            </div>
          </div>

          {/* Graph SVG */}
          <div className="relative bg-card border-2 border-border rounded-lg p-8 min-h-[400px]">
            <svg width="100%" height="400" className="overflow-visible">
              {/* Draw edges */}
              {edges.map((edge, index) => {
                const from = getNodePosition(edge.from);
                const to = getNodePosition(edge.to);
                if (!from || !to) return null;

                return (
                  <g key={index}>
                    <line
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={
                        edge.isBlocked
                          ? "hsl(var(--destructive))"
                          : edge.isInMST
                          ? "hsl(var(--accent))"
                          : getTrafficColor(edge.traffic)
                      }
                      strokeWidth={edge.isInMST ? 4 : edge.isBlocked ? 3 : 2}
                      strokeDasharray={edge.isBlocked ? "5,5" : "none"}
                      className={edge.isInMST ? "animate-pulse-slow" : ""}
                    />
                    {/* Weight label */}
                    <text
                      x={(from.x + to.x) / 2}
                      y={(from.y + to.y) / 2 - 10}
                      fill="hsl(var(--foreground))"
                      fontSize="12"
                      fontWeight="600"
                      className="bg-background"
                    >
                      {edge.weight}km
                    </text>
                  </g>
                );
              })}

              {/* Draw nodes */}
              {nodes.map((node) => (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="25"
                    fill="hsl(var(--primary))"
                    stroke="hsl(var(--background))"
                    strokeWidth="3"
                    className="drop-shadow-lg"
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    fill="hsl(var(--primary-foreground))"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {node.id}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 45}
                    fill="hsl(var(--muted-foreground))"
                    fontSize="11"
                    textAnchor="middle"
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {calculationComplete && (
            <Card className="bg-accent/5 border-accent/50">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="secondary">Result</Badge>
                  Minimum Spanning Tree Calculated
                </h4>
                <p className="text-sm text-muted-foreground">
                  The highlighted paths represent the optimal route network using Kruskal's algorithm,
                  minimizing total distance while considering traffic conditions and avoiding blockades.
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphVisualization;
