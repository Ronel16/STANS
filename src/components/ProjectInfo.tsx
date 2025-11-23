import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Target, Code } from "lucide-react";

const ProjectInfo = () => {
  const teamMembers = [
    { name: "Muhammad Waleed Ahmed", role: "Team Leader", id: "02-131242-119" },
    { name: "Muhammad Sameer", role: "Member", id: "02-131242-043" },
    { name: "Muhammad Umer", role: "Member", id: "02-131242-109" },
    { name: "Dahir Abdinasir", role: "Member", id: "02-131242-111" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      <Card className="border-2 hover:border-primary/50 transition-colors duration-300">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="font-display">Project Scope</CardTitle>
          </div>
          <CardDescription>System Overview & Objectives</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            The map guidance system helps individuals and businesses navigate efficiently, 
            positively impacting operations and daily lives. By calculating the fastest path 
            based on factors like blockades, traffic conditions, and distance, the system provides 
            users with optimal routes they wouldn't know about ahead of time.
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-secondary/50 transition-colors duration-300">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Code className="w-5 h-5 text-secondary" />
            </div>
            <CardTitle className="font-display">Technical Abstract</CardTitle>
          </div>
          <CardDescription>Algorithm & Implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            This system develops a map guidance platform utilizing <strong>Kruskal's algorithm</strong> to 
            compute the minimum spanning tree of a weighted directed graph. Graph weights are determined 
            by distance, traffic intensity, and blockades, integrated with Google Maps API for efficient 
            navigation considering both geographical and dynamic traffic conditions.
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 border-2 hover:border-accent/50 transition-colors duration-300">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <CardTitle className="font-display">Team Members</CardTitle>
          </div>
          <CardDescription>BSE-3(B) | Data Structures and Algorithms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border/50 hover:bg-accent/5 hover:border-accent/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.id}</p>
                  {member.role === "Team Leader" && (
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      Team Leader
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 border-2 hover:border-primary/50 transition-colors duration-300">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="font-display">Course Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Course Details</h4>
            <ul className="space-y-2 text-foreground">
              <li><strong>Course:</strong> Data Structures and Algorithms</li>
              <li><strong>Class:</strong> BSE-3(B)</li>
              <li><strong>University:</strong> Bahria University, Karachi Campus</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Instructors</h4>
            <ul className="space-y-2 text-foreground">
              <li><strong>Course Instructor:</strong> Engr. Majid Kalim</li>
              <li><strong>Lab Instructor:</strong> Engr. Saniya Sarim</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectInfo;
