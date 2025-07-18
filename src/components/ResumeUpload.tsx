
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Mail, Cloud, FolderOpen, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ResumeUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload Complete",
            description: `Successfully uploaded ${files.length} resume(s).`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleOutlookSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);

    // Simulate sync progress
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          toast({
            title: "Sync Complete",
            description: "Successfully synced 12 new resumes from Outlook.",
          });
          return 100;
        }
        return prev + 8;
      });
    }, 300);
  };

  const integrationStatus = [
    { name: 'Outlook Email', status: 'connected', lastSync: '2 hours ago', count: 45 },
    { name: 'Google Drive', status: 'connected', lastSync: '1 day ago', count: 23 },
    { name: 'Dropbox', status: 'disconnected', lastSync: 'Never', count: 0 },
    { name: 'OneDrive', status: 'connected', lastSync: '3 hours ago', count: 18 },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Manual Upload</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Manual Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Upload Resumes</span>
              </CardTitle>
              <CardDescription>
                Upload individual resumes or batch upload multiple files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Drop files here or click to upload
                </h3>
                <p className="text-gray-600 mb-4">
                  Supports PDF, DOC, DOCX files up to 10MB each
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button asChild>
                    <span className="cursor-pointer">Choose Files</span>
                  </Button>
                </label>
              </div>

              {isUploading && (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading files...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          {/* Email Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Email Integration</span>
              </CardTitle>
              <CardDescription>
                Automatically sync resumes from your email attachments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Outlook Integration</h3>
                    <p className="text-sm text-gray-600">Sync resumes from HR email inbox</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleOutlookSync}
                    disabled={isSyncing}
                  >
                    {isSyncing ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync Now
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {isSyncing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Syncing from Outlook...</span>
                    <span>{syncProgress}%</span>
                  </div>
                  <Progress value={syncProgress} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cloud Storage Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cloud className="w-5 h-5" />
                <span>Cloud Storage</span>
              </CardTitle>
              <CardDescription>
                Connect to cloud storage services to sync resume folders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {integrationStatus.map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FolderOpen className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{integration.name}</h4>
                        <p className="text-xs text-gray-600">
                          Last sync: {integration.lastSync} • {integration.count} resumes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {integration.status === 'connected' ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Connected
                          </Badge>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <Button variant="outline" size="sm">
                            Connect
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Processing Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Processing Settings</CardTitle>
              <CardDescription>
                Configure how resumes are processed and organized
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="folderPath">Default Storage Folder</Label>
                <Input
                  id="folderPath"
                  placeholder="/HR/Resumes/2024"
                  defaultValue="/HR/Resumes/2024"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="autoTag">Auto-tagging Keywords</Label>
                <Input
                  id="autoTag"
                  placeholder="JavaScript, React, Python, Manager, Senior"
                  defaultValue="JavaScript, React, Python, Manager, Senior"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="autoProcess" defaultChecked />
                <Label htmlFor="autoProcess">Automatically process new resumes</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="duplicateCheck" defaultChecked />
                <Label htmlFor="duplicateCheck">Check for duplicate resumes</Label>
              </div>

              <Button className="w-full">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeUpload;
