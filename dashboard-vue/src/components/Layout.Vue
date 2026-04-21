<template>
  <div class="layout">
    <aside class="sidebar">
      <h3>Dashboard</h3>
      <ul>
        <li>Home</li>
        <li>Charts</li>
        <li>Table</li>
      </ul>
    </aside>

    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
}
.sidebar {
  width: 220px;
  background: #0f172a;
  color: white;
  height: 100vh;
  padding: 20px;
}
.content {
  flex: 1;
  padding: 20px;
  background: #f5f5f5;
}
</style>