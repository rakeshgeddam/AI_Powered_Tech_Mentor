'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Play, Upload } from 'lucide-react';

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

export default function CodeEditorPage() {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(placeholderCode['javascript']);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(placeholderCode[lang] || '');
  };

  return (
    <div className="flex h-full flex-col space-y-8">
      <PageHeader
        title="Interactive Code Editor"
        description="Solve challenges and hone your coding skills."
      />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Problem: Two Sum</CardTitle>
            <CardDescription>
              Given an array of integers `nums` and an integer `target`, return
              indices of the two numbers such that they add up to `target`. You
              may assume that each input would have exactly one solution, and you
              may not use the same element twice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-sm bg-muted p-4 rounded-md">
              <strong>Example 1:</strong>
              <br />
              Input: nums = [2,7,11,15], target = 9
              <br />
              Output: [0,1]
              <br />
              Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
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
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Play className="mr-2 h-4 w-4" /> Run Code
              </Button>
              <Button>
                <Upload className="mr-2 h-4 w-4" /> Submit
              </Button>
            </div>
          </div>
          <Card>
            <CardContent className="p-0">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your code here..."
                className="font-mono h-[400px] border-0 rounded-md focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-headline">
                  Output 1
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm text-muted-foreground font-mono">
                  Run your code to see output.
                </pre>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-headline">
                  Output 2
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm text-muted-foreground font-mono">
                  Run your code to see output.
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
