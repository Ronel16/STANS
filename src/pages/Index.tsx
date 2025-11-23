import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Hero from "@/components/Hero";
import GraphVisualization from "@/components/GraphVisualization";
import ProjectInfo from "@/components/ProjectInfo";
import RouteCalculator from "@/components/RouteCalculator";
import { MapPin, Route, AlertTriangle } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Background mesh gradient */}
      <div className="fixed inset-0 pointer-events-none opacity-40" 
           style={{ background: 'var(--gradient-mesh)' }} />
      
      <div className="relative">
        <Hero />
        
        <div className="container mx-auto px-4 py-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="visualization" className="flex items-center gap-2">
                <Route className="w-4 h-4" />
                Visualization
              </TabsTrigger>
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Route Calculator
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <ProjectInfo />
            </TabsContent>

            <TabsContent value="visualization">
              <GraphVisualization />
            </TabsContent>

            <TabsContent value="calculator">
              <RouteCalculator />
            </TabsContent>
          </Tabs>
        </div>

        <footer className="border-t border-border/50 mt-20 py-8">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p className="text-sm">
              STANS © 2025 | Bahria University Karachi | Data Structures & Algorithms Project
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
