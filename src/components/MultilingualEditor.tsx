import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Languages, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MultilingualData {
  name_uz: string;
  name_qq: string;
  name_ru: string;
  name_en: string;
  description_uz: string;
  description_qq: string;
  description_ru: string;
  description_en: string;
}

interface MultilingualEditorProps {
  data: MultilingualData;
  onChange: (data: MultilingualData) => void;
}

const languages = [
  { code: "uz", label: "UZ", name: "Uzbek" },
  { code: "qq", label: "QQ", name: "Karakalpak" },
  { code: "ru", label: "RU", name: "Russian" },
  { code: "en", label: "EN", name: "English" },
];

const MultilingualEditor = ({ data, onChange }: MultilingualEditorProps) => {
  const [activeLang, setActiveLang] = useState("uz");
  const [translating, setTranslating] = useState(false);
  const { toast } = useToast();

  const handleFieldChange = (field: string, value: string) => {
    onChange({
      ...data,
      [`${field}_${activeLang}`]: value,
    });
  };

  const handleAutoTranslate = async () => {
    const sourceLang = activeLang;
    const sourceName = data[`name_${sourceLang}` as keyof MultilingualData];
    const sourceDesc = data[`description_${sourceLang}` as keyof MultilingualData];

    if (!sourceName && !sourceDesc) {
      toast({
        title: "No content to translate",
        description: `Please enter content in ${languages.find((l) => l.code === sourceLang)?.name} first.`,
        variant: "destructive",
      });
      return;
    }

    setTranslating(true);
    const targetLangs = languages.filter((l) => l.code !== sourceLang).map((l) => l.code);

    try {
      const newData = { ...data };

      // Translate name
      if (sourceName) {
        const { data: nameResult, error: nameError } = await supabase.functions.invoke("translate", {
          body: {
            text: sourceName,
            sourceLang,
            targetLangs,
          },
        });

        if (nameError) throw nameError;

        for (const lang of targetLangs) {
          newData[`name_${lang}` as keyof MultilingualData] = nameResult.translations[lang] || "";
        }
      }

      // Translate description
      if (sourceDesc) {
        const { data: descResult, error: descError } = await supabase.functions.invoke("translate", {
          body: {
            text: sourceDesc,
            sourceLang,
            targetLangs,
          },
        });

        if (descError) throw descError;

        for (const lang of targetLangs) {
          newData[`description_${lang}` as keyof MultilingualData] = descResult.translations[lang] || "";
        }
      }

      onChange(newData);
      toast({
        title: "Translation Complete",
        description: "Content has been translated to all languages.",
      });
    } catch (err) {
      console.error("Translation error:", err);
      toast({
        title: "Translation Failed",
        description: "Could not translate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTranslating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Multilingual Content</h3>
        <Button onClick={handleAutoTranslate} disabled={translating} variant="outline" size="sm">
          {translating ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Languages className="h-4 w-4 mr-2" />
          )}
          Auto Translate
        </Button>
      </div>

      <Tabs value={activeLang} onValueChange={setActiveLang}>
        <TabsList className="bg-card border border-border">
          {languages.map((lang) => (
            <TabsTrigger key={lang.code} value={lang.code} className="flex-1">
              {lang.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {languages.map((lang) => (
          <TabsContent key={lang.code} value={lang.code} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor={`name-${lang.code}`}>Business Name ({lang.name})</Label>
              <Input
                id={`name-${lang.code}`}
                value={data[`name_${lang.code}` as keyof MultilingualData] || ""}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                placeholder={`Enter business name in ${lang.name}`}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`desc-${lang.code}`}>Description ({lang.name})</Label>
              <Textarea
                id={`desc-${lang.code}`}
                value={data[`description_${lang.code}` as keyof MultilingualData] || ""}
                onChange={(e) => handleFieldChange("description", e.target.value)}
                placeholder={`Enter description in ${lang.name}`}
                className="bg-background min-h-[100px]"
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MultilingualEditor;
