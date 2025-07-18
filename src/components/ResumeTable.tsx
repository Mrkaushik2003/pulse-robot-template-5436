
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar } from '@/components/ui/avatar';
import { MoreHorizontal, Eye, Mail, Download, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Resume {
  id: string;
  name: string;
  email: string;
  position: string;
  experience: string;
  skills: string[];
  location: string;
  matchScore: number;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
  dateReceived: string;
  source: string;
}

interface ResumeTableProps {
  searchTerm: string;
}

const ResumeTable = ({ searchTerm }: ResumeTableProps) => {
  const { toast } = useToast();
  const [selectedResumes, setSelectedResumes] = useState<string[]>([]);

  // Mock data - replace with actual data from your API
  const mockResumes: Resume[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      position: 'Frontend Developer',
      experience: '3 years',
      skills: ['React', 'TypeScript', 'CSS'],
      location: 'New York, NY',
      matchScore: 95,
      status: 'new',
      dateReceived: '2024-01-20',
      source: 'Website'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      position: 'Full Stack Developer',
      experience: '5 years',
      skills: ['Node.js', 'React', 'Python'],
      location: 'San Francisco, CA',
      matchScore: 88,
      status: 'reviewed',
      dateReceived: '2024-01-19',
      source: 'LinkedIn'
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      position: 'UI/UX Designer',
      experience: '4 years',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      location: 'Austin, TX',
      matchScore: 82,
      status: 'shortlisted',
      dateReceived: '2024-01-18',
      source: 'Email'
    }
  ];

  const filteredResumes = mockResumes.filter(resume =>
    resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: Resume['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const handleBulkEmail = () => {
    if (selectedResumes.length === 0) {
      toast({
        title: "No resumes selected",
        description: "Please select at least one resume to send emails.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Emails queued",
      description: `${selectedResumes.length} email(s) have been queued for sending.`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Resume Database</CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            {filteredResumes.length} resumes found
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleBulkEmail}
            disabled={selectedResumes.length === 0}
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Bulk Email ({selectedResumes.length})
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedResumes(filteredResumes.map(r => r.id));
                      } else {
                        setSelectedResumes([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Match Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResumes.map((resume) => (
                <TableRow key={resume.id} className="hover:bg-gray-50">
                  <TableCell>
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300"
                      checked={selectedResumes.includes(resume.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedResumes([...selectedResumes, resume.id]);
                        } else {
                          setSelectedResumes(selectedResumes.filter(id => id !== resume.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-purple-600">
                            {resume.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">{resume.name}</div>
                        <div className="text-sm text-gray-500">{resume.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{resume.position}</TableCell>
                  <TableCell>{resume.experience}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {resume.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {resume.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{resume.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getMatchScoreColor(resume.matchScore)} border-0`}>
                      {resume.matchScore}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(resume.status)}>
                      {resume.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{resume.source}</TableCell>
                  <TableCell className="text-sm text-gray-600">{resume.dateReceived}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeTable;
