
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Search, Zap, Mail, Users, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const JobMatcher = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [emailTemplate, setEmailTemplate] = useState('');
  const { toast } = useToast();

  const handleMatch = async () => {
    if (!jobTitle || !jobDescription) {
      toast({
        title: "Missing Information",
        description: "Please provide both job title and description.",
        variant: "destructive",
      });
      return;
    }

    setIsMatching(true);
    
    // Simulate AI matching process
    setTimeout(() => {
      const mockMatches = [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          matchScore: 95,
          matchedSkills: ['React', 'TypeScript', 'CSS'],
          experience: '3 years',
          summary: 'Excellent match with strong frontend skills and relevant experience.'
        },
        {
          id: '2',
          name: 'Michael Chen',
          email: 'michael.chen@email.com',
          matchScore: 88,
          matchedSkills: ['React', 'Node.js'],
          experience: '5 years',
          summary: 'Good match with full-stack experience and leadership skills.'
        },
        {
          id: '3',
          name: 'Emily Davis',
          email: 'emily.davis@email.com',
          matchScore: 82,
          matchedSkills: ['UI/UX', 'Figma'],
          experience: '4 years',
          summary: 'Strong design background with some technical overlap.'
        }
      ];

      setMatches(mockMatches);
      setEmailTemplate(`Subject: Exciting ${jobTitle} Opportunity at [Company Name]

Dear [Candidate Name],

I hope this email finds you well. I came across your resume and was impressed by your background in [relevant skills/experience].

We currently have an exciting ${jobTitle} position available that I believe would be a great fit for your skills and experience. Here's a brief overview:

${jobDescription.substring(0, 200)}...

I'd love to discuss this opportunity with you further. Would you be available for a brief call this week?

Best regards,
[Your Name]
[Company Name]`);
      
      setIsMatching(false);
      toast({
        title: "Matching Complete",
        description: `Found ${mockMatches.length} potential candidates.`,
      });
    }, 2000);
  };

  const handleSendEmails = () => {
    const selectedCandidates = matches.filter(match => match.selected);
    if (selectedCandidates.length === 0) {
      toast({
        title: "No candidates selected",
        description: "Please select at least one candidate to send emails.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Emails Sent",
      description: `Successfully sent ${selectedCandidates.length} personalized emails.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Job Description Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Job Requirements</span>
          </CardTitle>
          <CardDescription>
            Provide job details to find the best matching candidates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                placeholder="e.g., Senior Frontend Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Required Experience</Label>
              <Input
                id="experience"
                placeholder="e.g., 3-5 years"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skills">Required Skills (comma-separated)</Label>
            <Input
              id="skills"
              placeholder="e.g., React, TypeScript, Node.js, AWS"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              placeholder="Paste the full job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
            />
          </div>

          <Button 
            onClick={handleMatch} 
            disabled={isMatching}
            className="w-full"
          >
            {isMatching ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-spin" />
                AI Matching in Progress...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Find Matching Candidates
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Matching Results */}
      {matches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Matching Results</span>
              </div>
              <Badge variant="secondary">{matches.length} candidates found</Badge>
            </CardTitle>
            <CardDescription>
              AI-powered candidate matching based on job requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {matches.map((match) => (
                <div key={match.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        className="mt-1 rounded border-gray-300"
                        checked={match.selected || false}
                        onChange={(e) => {
                          const updatedMatches = matches.map(m => 
                            m.id === match.id ? { ...m, selected: e.target.checked } : m
                          );
                          setMatches(updatedMatches);
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium text-gray-900">{match.name}</h3>
                          <Badge className={`${match.matchScore >= 90 ? 'bg-green-100 text-green-800' : 
                            match.matchScore >= 80 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                            {match.matchScore}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{match.email}</p>
                        <p className="text-sm text-gray-700 mb-2">{match.summary}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Skills:</span>
                          {match.matchedSkills.map((skill: string) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {match.experience} exp.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Email Template */}
      {matches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Email Template</span>
            </CardTitle>
            <CardDescription>
              Customize the email template that will be sent to selected candidates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={emailTemplate}
              onChange={(e) => setEmailTemplate(e.target.value)}
              rows={12}
              placeholder="Email template will be generated automatically..."
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Selected candidates: {matches.filter(m => m.selected).length}
              </p>
              <Button onClick={handleSendEmails}>
                <Mail className="w-4 h-4 mr-2" />
                Send Personalized Emails
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobMatcher;
