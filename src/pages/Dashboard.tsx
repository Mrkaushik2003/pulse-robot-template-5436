
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Users, Mail, Filter, Search, FileText, Briefcase } from 'lucide-react';
import ResumeTable from '@/components/ResumeTable';
import JobMatcher from '@/components/JobMatcher';
import ResumeUpload from '@/components/ResumeUpload';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('resumes');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const stats = [
    { title: 'Total Resumes', value: '1,247', icon: FileText, color: 'text-blue-600' },
    { title: 'Active Jobs', value: '23', icon: Briefcase, color: 'text-green-600' },
    { title: 'Matches Found', value: '89', icon: Users, color: 'text-purple-600' },
    { title: 'Emails Sent', value: '156', icon: Mail, color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">HR AI Assistant</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search resumes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="resumes" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Resume Manager</span>
            </TabsTrigger>
            <TabsTrigger value="matcher" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Job Matcher</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload & Sync</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resumes" className="space-y-6">
            <ResumeTable searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="matcher" className="space-y-6">
            <JobMatcher />
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <ResumeUpload />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
