import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Grid3x3, GitBranch, Circle, GitMerge, Layout, MapPin } from "lucide-react";
import { toast } from "sonner";
import type { Edge } from "@/utils/kruskal";

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
}

interface GraphTemplatesProps {
  onLoadTemplate: (nodes: Node[], edges: Edge[]) => void;
}

const GraphTemplates = ({ onLoadTemplate }: GraphTemplatesProps) => {
  const generateGrid = () => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const gridSize = 4;
    const spacing = 100;
    const offsetX = 50;
    const offsetY = 50;

    // Create grid nodes
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const id = String.fromCharCode(65 + row * gridSize + col);
        nodes.push({
          id,
          x: offsetX + col * spacing,
          y: offsetY + row * spacing,
          label: `Node ${id}`,
        });
      }
    }

    // Create grid edges
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const currentId = String.fromCharCode(65 + row * gridSize + col);
        
        // Right edge
        if (col < gridSize - 1) {
          const rightId = String.fromCharCode(65 + row * gridSize + col + 1);
          edges.push({
            from: currentId,
            to: rightId,
            weight: Math.floor(Math.random() * 10) + 3,
            traffic: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high",
            isBlocked: false,
          });
        }
        
        // Down edge
        if (row < gridSize - 1) {
          const downId = String.fromCharCode(65 + (row + 1) * gridSize + col);
          edges.push({
            from: currentId,
            to: downId,
            weight: Math.floor(Math.random() * 10) + 3,
            traffic: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high",
            isBlocked: false,
          });
        }
      }
    }

    onLoadTemplate(nodes, edges);
    toast.success("Grid topology loaded");
  };

  const generateTree = () => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const levels = 4;
    const baseSpacing = 200;

    let nodeIndex = 0;
    
    // Generate tree nodes level by level
    for (let level = 0; level < levels; level++) {
      const nodesInLevel = Math.pow(2, level);
      const levelSpacing = baseSpacing / Math.pow(2, level);
      const startX = 400 - (levelSpacing * (nodesInLevel - 1)) / 2;

      for (let i = 0; i < nodesInLevel && nodeIndex < 15; i++) {
        const id = String.fromCharCode(65 + nodeIndex);
        nodes.push({
          id,
          x: startX + i * levelSpacing,
          y: 50 + level * 100,
          label: `Node ${id}`,
        });

        // Connect to parent
        if (level > 0) {
          const parentIndex = Math.floor((nodeIndex - Math.pow(2, level) + 1) / 2) + Math.pow(2, level - 1) - 1;
          if (parentIndex >= 0 && parentIndex < nodeIndex) {
            const parentId = String.fromCharCode(65 + parentIndex);
            edges.push({
              from: parentId,
              to: id,
              weight: Math.floor(Math.random() * 8) + 2,
              traffic: ["low", "medium"][Math.floor(Math.random() * 2)] as "low" | "medium",
              isBlocked: false,
            });
          }
        }

        nodeIndex++;
      }
    }

    onLoadTemplate(nodes, edges);
    toast.success("Tree topology loaded");
  };

  const generateComplete = () => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const nodeCount = 6;
    const radius = 150;
    const centerX = 400;
    const centerY = 200;

    // Create nodes in a circle
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i * 2 * Math.PI) / nodeCount - Math.PI / 2;
      const id = String.fromCharCode(65 + i);
      nodes.push({
        id,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        label: `Node ${id}`,
      });
    }

    // Connect all nodes to each other
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        edges.push({
          from: String.fromCharCode(65 + i),
          to: String.fromCharCode(65 + j),
          weight: Math.floor(Math.random() * 12) + 2,
          traffic: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high",
          isBlocked: Math.random() < 0.1, // 10% chance of blocked edge
        });
      }
    }

    onLoadTemplate(nodes, edges);
    toast.success("Complete graph loaded");
  };

  const generateBipartite = () => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const setACount = 4;
    const setBCount = 5;
    const spacingY = 80;
    const offsetXA = 150;
    const offsetXB = 550;
    const startY = 80;

    // Create Set A nodes (left)
    for (let i = 0; i < setACount; i++) {
      const id = String.fromCharCode(65 + i);
      nodes.push({
        id,
        x: offsetXA,
        y: startY + i * spacingY,
        label: `Node ${id}`,
      });
    }

    // Create Set B nodes (right)
    for (let i = 0; i < setBCount; i++) {
      const id = String.fromCharCode(65 + setACount + i);
      nodes.push({
        id,
        x: offsetXB,
        y: startY + i * spacingY - 40,
        label: `Node ${id}`,
      });
    }

    // Connect nodes from Set A to Set B
    for (let i = 0; i < setACount; i++) {
      for (let j = 0; j < setBCount; j++) {
        // Not all connections, create some randomly
        if (Math.random() < 0.6) {
          edges.push({
            from: String.fromCharCode(65 + i),
            to: String.fromCharCode(65 + setACount + j),
            weight: Math.floor(Math.random() * 10) + 3,
            traffic: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high",
            isBlocked: false,
          });
        }
      }
    }

    onLoadTemplate(nodes, edges);
    toast.success("Bipartite graph loaded");
  };

  const generateStar = () => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const outerNodes = 8;
    const radius = 180;
    const centerX = 400;
    const centerY = 200;

    // Create center node
    nodes.push({
      id: "A",
      x: centerX,
      y: centerY,
      label: "Node A",
    });

    // Create outer nodes and connect to center
    for (let i = 0; i < outerNodes; i++) {
      const angle = (i * 2 * Math.PI) / outerNodes;
      const id = String.fromCharCode(66 + i);
      nodes.push({
        id,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        label: `Node ${id}`,
      });

      edges.push({
        from: "A",
        to: id,
        weight: Math.floor(Math.random() * 10) + 2,
        traffic: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high",
        isBlocked: false,
      });
    }

    onLoadTemplate(nodes, edges);
    toast.success("Star topology loaded");
  };

  const generatePakistanMap = () => {
    const nodes: Node[] = [
      { id: "KHI", x: 680, y: 420, label: "Karachi" },
      { id: "LHR", x: 480, y: 200, label: "Lahore" },
      { id: "ISB", x: 420, y: 120, label: "Islamabad" },
      { id: "RWP", x: 430, y: 110, label: "Rawalpindi" },
      { id: "FSD", x: 400, y: 220, label: "Faisalabad" },
      { id: "MUL", x: 350, y: 300, label: "Multan" },
      { id: "PSH", x: 300, y: 80, label: "Peshawar" },
      { id: "QTA", x: 180, y: 280, label: "Quetta" },
      { id: "HYD", x: 600, y: 380, label: "Hyderabad" },
      { id: "SKT", x: 460, y: 170, label: "Sialkot" },
      { id: "GUJ", x: 440, y: 180, label: "Gujranwala" },
      { id: "BWP", x: 320, y: 340, label: "Bahawalpur" },
      { id: "SGD", x: 380, y: 210, label: "Sargodha" },
      { id: "SKR", x: 530, y: 320, label: "Sukkur" },
    ];

    const edges: Edge[] = [
      { from: "KHI", to: "HYD", weight: 165, traffic: "high", isBlocked: false },
      { from: "KHI", to: "SKR", weight: 450, traffic: "medium", isBlocked: false },
      { from: "LHR", to: "ISB", weight: 380, traffic: "high", isBlocked: false },
      { from: "LHR", to: "FSD", weight: 130, traffic: "high", isBlocked: false },
      { from: "LHR", to: "MUL", weight: 350, traffic: "medium", isBlocked: false },
      { from: "ISB", to: "RWP", weight: 15, traffic: "high", isBlocked: false },
      { from: "ISB", to: "PSH", weight: 180, traffic: "high", isBlocked: false },
      { from: "FSD", to: "MUL", weight: 240, traffic: "medium", isBlocked: false },
      { from: "FSD", to: "SKT", weight: 220, traffic: "medium", isBlocked: false },
      { from: "MUL", to: "BWP", weight: 90, traffic: "low", isBlocked: false },
      { from: "QTA", to: "MUL", weight: 600, traffic: "low", isBlocked: false },
      { from: "QTA", to: "KHI", weight: 700, traffic: "medium", isBlocked: false },
      { from: "HYD", to: "SKR", weight: 300, traffic: "medium", isBlocked: false },
      { from: "SKT", to: "GUJ", weight: 50, traffic: "medium", isBlocked: false },
      { from: "GUJ", to: "LHR", weight: 70, traffic: "high", isBlocked: false },
      { from: "SKR", to: "MUL", weight: 400, traffic: "medium", isBlocked: false },
      { from: "SGD", to: "FSD", weight: 110, traffic: "medium", isBlocked: false },
      { from: "SGD", to: "LHR", weight: 190, traffic: "medium", isBlocked: false },
    ];

    onLoadTemplate(nodes, edges);
    toast.success("Pakistan road network loaded");
  };

  const templates = [
    {
      name: "Pakistan Map",
      description: "Major cities road network of Pakistan",
      icon: MapPin,
      color: "primary",
      action: generatePakistanMap,
    },
    {
      name: "Grid Network",
      description: "4x4 grid representing city streets",
      icon: Grid3x3,
      color: "secondary",
      action: generateGrid,
    },
    {
      name: "Tree Topology",
      description: "Hierarchical binary tree structure",
      icon: GitBranch,
      color: "accent",
      action: generateTree,
    },
    {
      name: "Complete Graph",
      description: "All nodes connected to each other",
      icon: Circle,
      color: "primary",
      action: generateComplete,
    },
    {
      name: "Bipartite Graph",
      description: "Two distinct sets with cross-connections",
      icon: GitMerge,
      color: "secondary",
      action: generateBipartite,
    },
    {
      name: "Star Topology",
      description: "Central hub with radial connections",
      icon: Layout,
      color: "accent",
      action: generateStar,
    },
  ];

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="font-display">Graph Templates Library</CardTitle>
        <CardDescription>
          Quick-load common network topologies and graph structures
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template, index) => (
            <Card 
              key={index}
              className={`border-2 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
              onClick={template.action}
            >
              <CardContent className="pt-6 space-y-4">
                <div className={`w-12 h-12 rounded-lg bg-${template.color}/10 flex items-center justify-center group-hover:bg-${template.color}/20 transition-colors`}>
                  <template.icon className={`w-6 h-6 text-${template.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
                <Button 
                  className={`w-full bg-${template.color} hover:bg-${template.color}/90`}
                  onClick={(e) => {
                    e.stopPropagation();
                    template.action();
                  }}
                >
                  Load Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GraphTemplates;
