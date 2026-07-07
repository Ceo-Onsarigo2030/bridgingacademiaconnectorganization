self.addEventListener("push", (event) => {
  let data = { title: "B.A Connect", body: "You have a new update.", url: "/" };
  try {
    data = { ...data, ...event.data.json() };
  } catch {
    // fall back to defaults if payload isn't JSON
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/logo.png",
      badge: "/logo.png",
      data: { url: data.url || "/" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(clients.openWindow(url));
});
