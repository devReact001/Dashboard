import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="projects" options={{ title: "Projects" }} />
      <Tabs.Screen name="candidates" options={{ title: "Candidates" }} />
    </Tabs>
  );
}
