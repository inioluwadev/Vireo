"use client";

import { useState } from "react";
import { generateArchitectureConcept } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";

type AIResult = {
  conceptDescription: string;
};

export function AIInspirationForm() {
  const [result, setResult] = useState<AIResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const input = {
      buildingType: formData.get("buildingType") as string,
      style: formData.get("style") as string,
      materials: formData.get("materials") as string,
      additionalFeatures: formData.get("additionalFeatures") as string,
    };
    
    if (!input.buildingType || !input.style || !input.materials) {
        setError("Please fill out all required fields.");
        setLoading(false);
        return;
    }

    const response = await generateArchitectureConcept(input);

    if (response.success) {
      setResult(response.data);
    } else {
      setError(response.error);
    }
    setLoading(false);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Design Parameters</CardTitle>
          <CardDescription>Fill in the details to generate a concept.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="buildingType">Building Type</Label>
              <Select name="buildingType" required>
                <SelectTrigger id="buildingType">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Skyscraper">Skyscraper</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="style">Architectural Style</Label>
              <Select name="style" required>
                <SelectTrigger id="style">
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Modern">Modern</SelectItem>
                  <SelectItem value="Bauhaus">Bauhaus</SelectItem>
                  <SelectItem value="Art Deco">Art Deco</SelectItem>
                  <SelectItem value="Brutalist">Brutalist</SelectItem>
                  <SelectItem value="Biophilic">Biophilic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="materials">Primary Materials</Label>
              <Select name="materials" required>
                <SelectTrigger id="materials">
                  <SelectValue placeholder="Select materials" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Concrete">Concrete</SelectItem>
                  <SelectItem value="Glass and Steel">Glass and Steel</SelectItem>
                  <SelectItem value="Wood">Wood</SelectItem>
                  <SelectItem value="Recycled Materials">Recycled Materials</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalFeatures">Additional Features</Label>
              <Input id="additionalFeatures" name="additionalFeatures" placeholder="e.g., green roof, kinetic facade" />
            </div>
            <Button type="submit" disabled={loading} className="w-full transition-transform duration-300 hover:scale-105">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate Concept
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">Generated Concept</CardTitle>
          <CardDescription>Your AI-powered architectural inspiration.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
            {loading && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
            {error && <p className="text-destructive text-center">{error}</p>}
            {result && (
                <div className="text-sm text-foreground/90 whitespace-pre-wrap font-body">
                    {result.conceptDescription}
                </div>
            )}
            {!loading && !error && !result && (
                <div className="text-center text-muted-foreground">
                    <p>Your generated concept will appear here.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
