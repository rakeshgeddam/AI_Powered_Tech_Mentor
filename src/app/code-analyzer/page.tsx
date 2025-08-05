'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import MonacoEditor from '@monaco-editor/react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'c++', label: 'C++' },
  { value: 'go', label: 'Go' },
];

const placeholderCode: Record<string, string> = {
  javascript: `// JavaScript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}`,
  python: `# Python
def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i`,
  java: `// Java
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }
}`,
  'c++': `// C++
#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (map.count(complement)) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};`,
  go: `// Go
package main

func twoSum(nums []int, target int) []int {
    m := make(map[int]int)
    for i, num := range nums {
        complement := target - num
        if j, ok := m[complement]; ok {
            return []int{j, i}
        }
        m[num] = i
    }
    return nil
}`,
};

const FeedbackBubble = ({
  avatar,
  name,
  feedback,
  isLoading,
}: {
  avatar: React.ReactNode;
  name: string;
  feedback: string;
  isLoading: boolean;
}) => (
  <Card className="shadow-sm">
    <CardContent className="p-4">
      <div className="flex items-start gap-4">
        {avatar}
        <div className="flex-1">
          <p className="font-semibold text-card-foreground">{name}</p>
          <div className={`mt-2 bg-muted text-muted-foreground p-3 rounded-lg text-sm min-h-[100px] ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? (
              <div className="flex items-center">
                <div className="h-2 w-2 bg-primary rounded-full mr-2 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-primary rounded-full mr-2 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            ) : feedback}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function CodeAnalyzerPage() {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(placeholderCode['python']);
  const [currentTask, setCurrentTask] = useState({
    id: 1,
    title: "Refactor for Clean Code",
    description: "Refactor this code to improve readability and maintainability. Focus on reducing complexity and improving naming.",
    difficulty: "Beginner"
  });
  const [teamLeadFeedback, setTeamLeadFeedback] = useState(
    'Your feedback from the Team Lead will appear here...'
  );
  const [managerFeedback, setManagerFeedback] = useState(
    'Your feedback from the Manager will appear here...'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(placeholderCode[lang] || '');
    setTeamLeadFeedback('Your feedback from the Team Lead will appear here...');
    setManagerFeedback('Your feedback from the Manager will appear here...');
    setError('');
  };


  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError('Please enter some code to analyze');
      return;
    }

    setIsLoading(true);
    setError('');
    setTeamLeadFeedback('Analyzing code for readability issues...');
    setManagerFeedback('Analyzing code for design patterns...');

    try {
      const response = await fetch('/api/analyze-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          taskDescription: currentTask.description,
          language
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const { teamLeadFeedback, managerFeedback } = await response.json();
      setTeamLeadFeedback(teamLeadFeedback);
      setManagerFeedback(managerFeedback);
    } catch (err) {
      console.error('Analysis error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
      setTeamLeadFeedback('⚠️ Failed to analyze');
      setManagerFeedback('');
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={65}>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-2 border-b bg-card">
              <div className="flex gap-4">
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </div>
              <Button 
                onClick={handleAnalyze} 
                disabled={isLoading}
                className="min-w-[120px]"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="h-2 w-2 bg-background rounded-full mr-2 animate-bounce"></span>
                    <span className="h-2 w-2 bg-background rounded-full mr-2 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="h-2 w-2 bg-background rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </span>
                ) : 'Analyze Code'}
              </Button>
            </div>
            <div className="flex-1">
              <MonacoEditor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{ 
                  minimap: { enabled: false }, 
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true
                }}
              />
            </div>
            <div className="p-4 border-t bg-card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1">Task: {currentTask.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {currentTask.description}
                  </p>
                </div>
                <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                  {currentTask.difficulty}
                </span>
              </div>
              {error && (
                <div className="mt-2 text-red-500 text-sm">
                  Error: {error}
                </div>
              )}
            </div>
          </div>
        </ResizablePanel>

        <ResizablePanel defaultSize={35} minSize={25}>
          <div className="flex h-full flex-col gap-6 p-6 bg-background overflow-y-auto">
            <FeedbackBubble
              avatar={
                <Avatar className="w-16 h-16">
                  <Image
                    src="https://placehold.co/128x128/3b82f6/white?text=TL"
                    alt="Team Lead Avatar"
                    priority
                    width={128}
                    height={128}
                  />
                  <AvatarFallback>TL</AvatarFallback>
                </Avatar>
              }
              name="Team Lead"
              feedback={teamLeadFeedback}
              isLoading={isLoading}
            />
            <FeedbackBubble
              avatar={
                <Avatar className="w-16 h-16">
                  <Image
                    src="https://placehold.co/128x128/8b5cf6/white?text=M"
                    alt="Manager Avatar"
                    priority
                    width={128}
                    height={128}
                  />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              }
              name="Manager"
              feedback={managerFeedback}
              isLoading={isLoading}
            />
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  How to use
                </h4>
                <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
                  <li>Select a programming language and task</li>
                  <li>Write or modify code in the editor</li>
                  <li>Click "Analyze Code" to get feedback</li>
                  <li>Iterate based on suggestions from both roles</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />

      </ResizablePanelGroup>
    </div>
  );
}