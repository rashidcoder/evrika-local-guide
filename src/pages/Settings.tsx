import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, User, Moon, Sun, Globe, Bell, Camera } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Business owner and technology enthusiast.",
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-8">
          <TabsList className="bg-secondary/50 p-1 h-auto">
            <TabsTrigger
              value="general"
              className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-soft"
            >
              <SettingsIcon className="h-4 w-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-soft"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="animate-fade-in">
            <div className="card-premium p-6 md:p-8">
              <h2 className="text-lg font-semibold mb-6">General Settings</h2>

              <div className="space-y-8">
                {/* Language */}
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  <div>
                    <Label className="text-base font-medium flex items-center gap-2 mb-1">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      Language
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred language
                    </p>
                  </div>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="bg-secondary/50 border-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uz">O'zbek</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ru">Русский</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Theme */}
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  <div>
                    <Label className="text-base font-medium flex items-center gap-2 mb-1">
                      {theme === "dark" ? (
                        <Moon className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Sun className="h-4 w-4 text-muted-foreground" />
                      )}
                      Theme
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred appearance
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      className="flex-1 gap-2"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-4 w-4" />
                      Light
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      className="flex-1 gap-2"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-4 w-4" />
                      Dark
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Notifications */}
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  <div>
                    <Label className="text-base font-medium flex items-center gap-2 mb-1">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications for updates
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Switch
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 items-start">
                  <div>
                    <Label className="text-base font-medium mb-1 block">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates and newsletters
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t flex justify-end">
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </div>
            </div>
          </TabsContent>

          {/* Profile Settings */}
          <TabsContent value="profile" className="animate-fade-in">
            <div className="card-premium p-6 md:p-8">
              <h2 className="text-lg font-semibold mb-6">Profile Settings</h2>

              <div className="space-y-8">
                {/* Avatar */}
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  <div>
                    <Label className="text-base font-medium mb-1 block">
                      Profile Picture
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Upload a new avatar image
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-lg bg-primary/10 text-primary">
                        {profile.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Camera className="h-4 w-4" />
                      Change
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Name */}
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  <div>
                    <Label className="text-base font-medium mb-1 block">
                      Display Name
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      This is how others will see you
                    </p>
                  </div>
                  <Input
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="bg-secondary/50 border-0"
                  />
                </div>

                {/* Email */}
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  <div>
                    <Label className="text-base font-medium mb-1 block">
                      Email Address
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Your primary email for notifications
                    </p>
                  </div>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="bg-secondary/50 border-0"
                  />
                </div>

                {/* Bio */}
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  <div>
                    <Label className="text-base font-medium mb-1 block">
                      Bio
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      A brief description about yourself
                    </p>
                  </div>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    className="bg-secondary/50 border-0 min-h-[100px]"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t flex justify-end">
                <Button onClick={handleSaveProfile}>Save Profile</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
