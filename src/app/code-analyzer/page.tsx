'use client';

import { useState } from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
}: {
  avatar: React.ReactNode;
  name: string;
  feedback: string;
}) => (
  <Card className="shadow-sm">
    <CardContent className="p-4">
      <div className="flex items-start gap-4">
        {avatar}
        <div className="flex-1">
          <p className="font-semibold text-card-foreground">{name}</p>
          <div className="mt-2 bg-muted text-muted-foreground p-3 rounded-lg text-sm">
            {feedback}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function CodeAnalyzerPage() {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(placeholderCode['python']);
  const [teamLeadFeedback, setTeamLeadFeedback] = useState(
    'Your feedback from the Team Lead will appear here...'
  );
  const [managerFeedback, setManagerFeedback] = useState(
    'Your feedback from the Manager will appear here...'
  );

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(placeholderCode[lang] || '');
  };

  const handleAnalyze = () => {
    // This is where you'd call your Hugging Face backend
    setTeamLeadFeedback('Analyzing code for readability issues...');
    setManagerFeedback('Analyzing code for design patterns...');

    // Simulate API call
    setTimeout(() => {
      setTeamLeadFeedback(
        'The function `two_sum` has a high cyclomatic complexity. Consider breaking it down.'
      );
      setManagerFeedback(
        'Using a hash map is efficient, but this implementation is not thread-safe. Consider concurrency implications.'
      );
    }, 2000);
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
              <Button onClick={handleAnalyze}>Analyze Code</Button>
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
            <div className="p-4 border-t bg-card text-sm">
              <h3 className="font-semibold mb-2">Task: Refactor for Clean Code</h3>
              <p className="text-muted-foreground">
                Given the code snippet, refactor it to improve readability and adhere to SOLID principles. Your goal is to make the code as clean and maintainable as possible.
              </p>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35} minSize={25}>
          <div className="flex h-full flex-col gap-6 p-6 bg-background overflow-y-auto">
            <FeedbackBubble
              avatar={
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://placehold.co/128x128.png" data-ai-hint="man glasses" />
                  <AvatarFallback>TL</AvatarFallback>
                </Avatar>
              }
              name="Team Lead"
              feedback={teamLeadFeedback}
            />
            <FeedbackBubble
              avatar={
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://placehold.co/128x128.png" data-ai-hint="woman professional" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              }
              name="Manager"
              feedback={managerFeedback}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
