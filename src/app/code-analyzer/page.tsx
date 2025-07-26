'use client';

import { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Bot, FlaskConical, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

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

export default function CodeAnalyzerPage() {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(placeholderCode['javascript']);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(placeholderCode[lang] || '');
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col space-y-4">
      <PageHeader
        title="AI Code Analyzer"
        description="Get instant feedback on code quality, efficiency, and potential issues."
      />
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 rounded-lg border"
      >
        <ResizablePanel defaultSize={33}>
          <div className="flex h-full flex-col p-4">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline">Clean Code Scenarios</CardTitle>
                <CardDescription>
                  Select a scenario to analyze your code against.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Your clean code scenarios from the backend will appear here.
                </p>
              </CardContent>
            </Card>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={67}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70}>
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between p-2 border-b">
                  <Select
                    value={language}
                    onValueChange={handleLanguageChange}
                  >
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
                  <Button>
                    <FlaskConical className="mr-2 h-4 w-4" /> Analyze
                  </Button>
                </div>
                <div className="flex-1">
                  <MonacoEditor
                    height="100%"
                    language={language}
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    options={{ minimap: { enabled: false }, fontSize: 14 }}
                  />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="h-full flex flex-col p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Bot />
                  <h3 className="text-lg font-semibold font-headline">AI Assistant</h3>
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto rounded-md bg-muted/50 p-4">
                  <div className="text-sm text-muted-foreground">
                    Ask the assistant for help with the code analysis.
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Input placeholder="Ask a follow-up question..." />
                  <Button variant="ghost" size="icon">
                    <Send />
                  </Button>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}